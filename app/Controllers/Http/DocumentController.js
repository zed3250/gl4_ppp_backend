"use strict";
const Env = use("Env");
const fs = require("fs");
const Helpers = use("Helpers");

/**
 * Controller to create and get files from the minio server
 */

class DocumentController {

   async createDocument({ request }) {
    var document ;
    var project = Project.query().where({_id: input("project")}).first();
    var process = input('process');


    document.docName = request.input("docName");
    document.docType = request.input('docType');
    const path = Helpers.publicPath(params.project + "/" + params.process + "/" + params.document);
    document.docPath = path;
    document.permittedRoles = request.input('roles');
    
    project.processes.forEach(element => {
      if (element._id == process) {
        element.docs.push(document);
      }
    });

    await project.save();

    const file = request.file("file");
    const name = request.input("docName");

    await file.move(path, {
      name: name,
      overwrite: true
    });
    if (!file.moved()) {
      return file.error();
    }
    return "document created";
  }

  getDocument({ params , response }) {
    const fullPath = params.input('path');
    response.header('Content-Type', 'application/pdf');
    response.download(fullPath, name);
  }
  

}
module.exports = DocumentController;
