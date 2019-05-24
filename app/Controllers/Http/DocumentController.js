"use strict";
const Helpers = use("Helpers");
const Project = use('App/Models/Project');
var fs = require('fs');
const replace = require('replace-in-file');
const latex = require('node-latex');
var ObjectID = require('mongodb').ObjectID;

/**
 * Controller to create and get files
 */

class DocumentController {

  async createDocument({ request }) {
    var document = {};
    var projectId = request.input("project");
    var project = await Project.query().where({ _id: projectId }).first();
    var process = request.input('process');


    document.docName = request.input("docName");
    document.docType = request.input('docType');
    const fullPath = Helpers.publicPath(projectId + "/" + process + "/" + request.input("docName"));
    document.docPath = fullPath;
    document.permittedRoles = request.input('roles');

    project.processes.forEach(element => {
      if (element._id == process) {
        element.docs.push(document);
      }
    });

    await project.save();

    const file = request.file("file");

    const path = Helpers.publicPath(projectId + "/" + process);
    await file.move(path, {
      name: "mandate.pdf",
      overwrite: true
    });
    if (!file.moved()) {
      return file.error();
    }
    return "document created";
  }

  async createPid({ request, params }) {
    //create a copy of the template
    await fs.copyFileSync(Helpers.resourcesPath('docs/pid-template.tex'), Helpers.resourcesPath('docs/tmp/pid.tex'));
    //background
    var background = request.all().background;
    var options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@Background',
      to: background,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }
    //ProjectName
    var projectName = request.all().projectName;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@ProjectName',
      to: projectName,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }
    //Author
    var author = request.all().author;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@Author',
      to: author,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }
    //Version
    var version = request.all().version;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@Version',
      to: version,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //generate pdf
    const input = fs.createReadStream(Helpers.resourcesPath('docs/tmp/pid.tex'))
    const output = fs.createWriteStream(Helpers.resourcesPath('docs/tmp/generated.pdf'))
    const pdf = latex(input)
    pdf.pipe(output)
    pdf.on('error', err => console.error(err))
    pdf.on('finish', () => {
      //create document
      var document = {};
      document._id = new ObjectID();
      document.docName = "Project Initiation Documentation.pdf";
      document.docType = "Project Initiation Documentation";

      var projectId = params.idProject;
      var processId = params.idProcess;

      var path = Helpers.publicPath(projectId + '/' + processId + '/' + document.docName);
      document.docPath = path;

      //move pdf
      if (!fs.existsSync(Helpers.publicPath(projectId + '/' + processId + '/'))) {
        fs.mkdirSync(Helpers.publicPath(projectId + '/' + processId), true);
      }
      fs.renameSync(Helpers.resourcesPath('docs/tmp/generated.pdf'), path);

      //delete tmp
      fs.unlinkSync(Helpers.resourcesPath('docs/tmp/pid.tex'));

      //update project
      var project = await Project.query().where({ _id: projectId }).first();
      project.processes.forEach(element => {
        if (element._id == process) {
          element.docs.push(document);
        }
      });
    })
    await project.save();

    //return
    return project;
  }

  getDocument({ request, response }) {
    //get attributes
    const fullPath = request.all().path;
    //return file
    response.attachment(fullPath);
  }
  getMandate({ params, response }) {
    //get attributes
    const id = params.id;
    //create path
    const path = Helpers.publicPath(id + '/mandate.pdf');
    //return file
    response.attachment(path);
  }

  downloadDocument({params, response}) {
    //get attributes
    var projectId = params.idProject;
    var processId = params.idProcess;
    var docName = params.name;
    //create path
    var path = Helpers.publicPath(projectId + '/' + processId + '/' + docName);
    //return file
    response.attachment(path);
  }
}
module.exports = DocumentController;
