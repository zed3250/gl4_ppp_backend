'use strict';
const Helpers = use("Helpers");
var ObjectID = require('mongodb').ObjectID;


const Project = use('App/Models/Project');

/**
 * Controller to manage Notifs
 */
class NotificationController {

  /**
 * POST: /notif
 * Creates a notif
 */
    async createNotif({request}) {
      var notif = {};

      var projectId = request.all().project;
      var project  = await Project.query().where({_id: projectId}).first();

      notif._id = new ObjectID();
      notif.email_sender = request.all().email_sender;
      notif.email_receiver = request.all().email_receiver;
      notif.object = request.all().object;
      notif.description = request.all().description;
      notif.lien = request.all().lien;
      notif.role = request.all().role;

      project.notifs.push(notif);

      await project.save();
      return project;


    }

    /**
 * POST: /process
 * Creates a process
 */

async createProcess({request}) {
  var process = {};

  var projectId = request.all().project;
  var project  = await Project.query().where({_id: projectId}).first();

  process._id = new ObjectID();
  process.name = request.all().name;
  process.description = request.all().description;
  process.startDate = request.all().startDate;
  process.endDate = request.all().endDate;
  process.docs = [];
  process.isActive = true;

  project.processes.push(process);

  await project.save();
  return "Process added";


}

 /**
 * POST: /updateProcess
 * update a process
 */
async updateProcess({request}) {
  

  var projectId = request.all().project;
  var project  = await Project.query().where({_id: projectId}).first();

  for (var index = 0; index < project.processes.length; ++index) {
    project.processes[index].isActive=false ;
}

  await project.save();
  return "Process Updated";


}





}

module.exports = NotificationController;