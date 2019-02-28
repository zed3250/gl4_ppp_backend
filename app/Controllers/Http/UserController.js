'use strict';

const User = use('App/Models/User');

/**
 * Controller to manage users
 */
class UserController {
  /**
   * GET: /users
   * Returns all users
   */
  async index() {
    return await User.query().fetch();
  }

  /**
 * GET: /users/:id
 * Returns a single user
 */
  async show({params}) {
    return await User.query().where({_id: params.id}).first();
  }

  /**
 * POST: /users
 * Creates a user
 */
  async store({request}) {
    const user = new User(request.all());
    return await user.save();
  }


  /**
 * PUT: /users/:id
 * Updates a user
 */
  update() {
  }

  /**
 * DELETE: /users
 * Deletes a user
 */
  destroy() {
  }

  /**
 * POST: /login
 * If email and password are correct, the user is authenticated
 * a JWT is generated and returned to the client
 */
  async login({request, auth}) {
    const {email, password} = request.all();
    return await auth.attempt(email, password);
  }
}

module.exports = UserController;


