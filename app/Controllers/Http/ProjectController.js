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
  async index({request}) {
    const queryParams = request.get();

    return await Project.query().where(queryParams).fetch();
  }

  /**
 * GET: /projects/:id
 * Returns a single project
 */
  async show({params}) {
    return await Project.query().where({_id: params.id}).first();
  }

  /**
   * Returns projects of the user
   * @param {*} param0
   */
  async getUserProjects({auth}) {
    const Database = use('Database');
    const db = await Database.connect('prince2');
    const user = await auth.getUser();
    const projects = await db.collection('projects').find({
      collaborators: {$elemMatch: {collaboratorId: user._id.toString()}},
    }).toArray();
    return projects;
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


