'use strict'

/**
 * @param {Object} db
 * @returns {attach}
 */
function attachErrorToDb( db ) {
  /**
   * @param {Error} err
   * @returns {undefined}
   */
  function attach( err ) {
    db.error = err
  }

  return attach
}

module.exports = attachErrorToDb
