'use strict';

const Project = use('App/Models/Project');
const Stage = use('App/Models/Stage');


/**
 * Controller to manage projects
 */
class ProjectController {
  /**
   * GET: /projects
   * Returns all projects
   */
  async index() {
    return await Project.query().fetch();
  }

  /**
 * GET: /projects/:id
 * Returns a single project
 */
  async show({params}) {
    return await Project.query().where({_id: params.id}).first();
  }

  /**
 * POST: /projects
 * Creates a project
 */
  async store({request}) {
    const project = new Project(request.all());
    return await project.save();
  }


  /**
 * PUT: /projects/:id
 * Updates a project
 */
  update() {
  }

  /**
 * DELETE: /projects
 * Deletes a project
 */
  destroy() {
  }
}

module.exports = ProjectController;


