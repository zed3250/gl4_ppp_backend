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

    //get project
    var projectId = params.idProject;
    var processId = params.idProcess;
    var project = await Project.query().where({ _id: projectId }).first();

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
    
    //MainGoal
    var mainGoal = request.all().mainGoal;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@MainGoal',
      to: mainGoal,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }
    
    //DesiredOutcomes
    var desiredOutcomes = request.all().desiredOutcomes;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@DesiredOutcomes',
      to: desiredOutcomes,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //Interfaces
    var interfaces = request.all().interfaces;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@Interfaces',
      to: interfaces,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //ProjectApproach
    var projectApproach = request.all().projectApproach;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@ProjectApproach',
      to: projectApproach,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //AcceptanceResponsibilities
    var acceptanceResponsibilities = request.all().acceptanceResponsibilities;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@AcceptanceResponsibilities',
      to: acceptanceResponsibilities,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //ProjectProductDescription
    var projectProductDescription = request.all().projectProductDescription;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@ProjectProductDescription',
      to: projectProductDescription,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //BusinessCase
    var businessCase = request.all().businessCase;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@BusinessCase',
      to: businessCase,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //StakeholderList
    var stakeholderList = request.all().stakeholderList;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@StakeholderList',
      to: stakeholderList,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //QualityManagementApproach
    var qualityManagementApproach = request.all().qualityManagementApproach;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@QualityManagementApproach',
      to: qualityManagementApproach,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //ChangeControlApproach
    var changeControlApproach = request.all().changeControlApproach;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@ChangeControlApproach',
      to: changeControlApproach,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //RiskManagementApproach
    var riskManagementApproach = request.all().riskManagementApproach;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@RiskManagementApproach',
      to: riskManagementApproach,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //CommunicationManagementApproach
    var communicationManagementApproach = request.all().communicationManagementApproach;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@CommunicationManagementApproach',
      to: communicationManagementApproach,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //ProjectPlan
    var projectPlan = request.all().projectPlan;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@ProjectPlan',
      to: projectPlan,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //ProjectManagementTeam
    var projectManagementTeam = request.all().projectManagementTeam;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@ProjectManagementTeam',
      to: projectManagementTeam,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //ProjectControls
    var projectControls = request.all().projectControls;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@ProjectControls',
      to: projectControls,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //Tailoring
    var tailoring = request.all().tailoring;
    options = {
      files: Helpers.resourcesPath('docs/tmp/pid.tex'),
      from: '@Tailoring',
      to: tailoring,
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
      project.processes.forEach(element => {
        if (element._id == process) {
          element.docs.push(document);
        }
      });
    })
    await project.save();

    //return
    return true;
  }

  async createBusinessCase({ request, params }) {

    //get project
    var projectId = params.idProject;
    var processId = params.idProcess;
    var project = await Project.query().where({ _id: projectId }).first();

    //create a copy of the template
    await fs.copyFileSync(Helpers.resourcesPath('docs/business-case-template.tex'), Helpers.resourcesPath('docs/tmp/business-case.tex'));

    //ProjectName
    var projectName = request.all().projectName;
    var options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
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
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
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
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@Version',
      to: version,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //ExecutiveSummary
    var executiveSummary = request.all().executiveSummary;
    options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@ExecutiveSummary',
      to: executiveSummary,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //Reasons
    var reasons = request.all().reasons;
    options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@Reasons',
      to: reasons,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //Options
    var opt = request.all().options;
    options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@Options',
      to: opt,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //ExpectedBenefitsAndDisbenefits
    var expectedBenefitsAndDisbenefits = request.all().expectedBenefitsAndDisbenefits;
    options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@ExpectedBenefitsAndDisbenefits',
      to: expectedBenefitsAndDisbenefits,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //Risks
    var risks = request.all().risks;
    options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@Risks',
      to: risks,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //Cost
    var cost = request.all().cost;
    options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@Cost',
      to: cost,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //Timescales
    var timescales = request.all().timescales;
    options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@Timescales',
      to: timescales,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //InvestmentAppraisal
    var investmentAppraisal = request.all().investmentAppraisal;
    options = {
      files: Helpers.resourcesPath('docs/tmp/business-case.tex'),
      from: '@InvestmentAppraisal',
      to: investmentAppraisal,
    };
    try {
      await replace(options);
    }
    catch (error) {
      console.error('Error occurred:', error);
    }

    //generate pdf
    const input = fs.createReadStream(Helpers.resourcesPath('docs/tmp/business-case.tex'))
    const output = fs.createWriteStream(Helpers.resourcesPath('docs/tmp/generated.pdf'))
    const pdf = latex(input)
    pdf.pipe(output)
    pdf.on('error', err => console.error(err))
    pdf.on('finish', () => {
      //create document
      var document = {};
      document._id = new ObjectID();
      document.docName = "Business Case.pdf";
      document.docType = "Business Case";

      var path = Helpers.publicPath(projectId + '/' + processId + '/' + document.docName);
      document.docPath = path;

      //move pdf
      if (!fs.existsSync(Helpers.publicPath(projectId + '/' + processId + '/'))) {
        fs.mkdirSync(Helpers.publicPath(projectId + '/' + processId), true);
      }
      fs.renameSync(Helpers.resourcesPath('docs/tmp/generated.pdf'), path);

      //delete tmp
      fs.unlinkSync(Helpers.resourcesPath('docs/tmp/business-case.tex'));

      //update project
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
