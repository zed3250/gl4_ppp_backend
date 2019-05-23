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
      notif.sender = request.all().sender;
      notif.receiver = request.all().receiver;
      notif.object = request.all().object;
      notif.description = request.all().description;
      notif.lien = request.all().lien;

      project.notifs.push(notif);

      await project.save();
      return "Notif added";


    }

}

module.exports = NotificationController;