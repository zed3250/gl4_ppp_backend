'use strict';
const Project = use('App/Models/Project');
var ObjectID = require('mongodb').ObjectID;

/**
 * Controller to manage Processes
 */
class ProcessController {

    /**
   * POST: /process
   * Creates a Process and pushes it in the project
   */
    async createProcess({params, request}) {
        var projectId = params.id;
        var project  = await Project.query().where({_id: projectId}).first();
        var process = request.all();
        process._id = new ObjectID();
        process.isActive = true;
        project.processes.forEach(element => {
            element.isActive = false;
        });
        project.processes.push(process);
        await project.save();
        return project;
    }

}

module.exports = ProcessController;