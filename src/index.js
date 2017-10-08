/* eslint max-len:off */

'use strict';

/**
 * module dependencies
 */
var mongoose = require( 'mongoose' )
var setupConnection = require( './setup-connection' )

/**
 * module variables
 */
var db

/**
 * @link http://mongoosejs.com/docs/api.html#connection_Connection
 * @link https://www.ibm.com/developerworks/community/blogs/c1b14989-1f61-4411-a56c-abcde2481218/entry/How_to_Make_a_resilient_connection_between_Node_js_and_MongoDB_using_Mongoose_in_Bluemix?lang=en
 * @link http://theholmesoffice.com/mongoose-connection-best-practice/
 * @link https://blog.mlab.com/2013/10/do-you-want-a-timeout/?cm_mc_uid=11449404999415022159427&cm_mc_sid_50200000=1506770218
 * @link https://stackoverflow.com/questions/16226472/mongoose-autoreconnect-option/17093472#17093472
 *
 * @param {Object} user_options
 * @param {Object} user_options.connect
 * @param {boolean} user_options.debug
 * @param {Object} user_options.uri
 *
 * @returns {MongooseThenable}
 */
function connection( user_options ) {
  var options = user_options || {}

  if ( typeof db !== 'object' ) {
    options.connect = user_options.connect || { useMongoClient: true }
    db = setupConnection( options )
  }

  try {
    return mongoose.connect( db.uri, options.connect )
  } catch ( err ) {
    throw err
  }
}

module.exports = connection;
