"use strict";
const Helpers = use("Helpers");
const Project = use('App/Models/Project');
var fs = require('fs');

/**
 * Controller to create and get files
 */

class DocumentController {

   async createDocument({ request }) {
    var document ={} ;
    var projectId = request.input("project");
    var project  = await Project.query().where({_id: projectId}).first();
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

    const path = Helpers.publicPath(projectId + "/" + process );
    await file.move(path, {
      name: "mandate.pdf",
      overwrite: true
    });
    if (!file.moved()) {
      return file.error();
    }
    return "document created";
  }

  getDocument({ request , response }) {
    const fullPath = request.all().path;
    response.attachment(fullPath);
  }
  getMandate({params, response}) {
    const id = params.id;
    const path = Helpers.publicPath(id+'/mandate.pdf');
    response.attachment(path);
  }

}
module.exports = DocumentController;
