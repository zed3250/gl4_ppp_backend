'use strict';

const Hash = use('Hash');
const Model = use('Model');

/**
 * The user model
 */
class User extends Model {
  /**
   * Hides the created_at and updated_at and the password fields
   */
  static get hidden() {
    return ['created_at', 'updated_at', 'password'];
  }
  /**
   * Boot method
   */
  static boot() {
    super.boot();

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
