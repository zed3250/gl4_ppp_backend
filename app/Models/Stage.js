'use strict';

const Model = use('Model');

/**
 * The stage model
 */
class Stage extends Model {
  /**
   * Hides the created_at and updated_at fields
   */
  static get hidden() {
    return ['created_at', 'updated_at'];
  }
}

module.exports = Stage;
