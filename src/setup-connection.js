/* eslint no-process-exit:off */

'use strict'

/**
 * module dependencies
 */
var mongoose = require( 'mongoose' )
var eventLogger = require( 'mongoose-events-event-logger' )
var getUri = require( 'mongoose-helpers-get-uri' )
var attachErrorToDb = require( './attach-error-to-db' )

/**
 * @param {Object} options
 *
 * @returns {*}
 */
function setupConnection( options ) {
  var db

  // force this connect option to exist as true
  // http://mongoosejs.com/docs/connections.html#use-mongo-client
  if ( !options.connect.useMongoClient ) {
    options.connect.useMongoClient = true
  }

  // http://mongoosejs.com/docs/promises.html#plugging-in-your-own-promises-library
  mongoose.Promise = global.Promise
  mongoose.set( 'debug', options.debug === true )

  db = mongoose.connection

  if ( options.debug === true ) {
    db.on( 'connected', eventLogger( 'connected', db ) )
    db.on( 'connecting', eventLogger( 'connecting', db ) )
    db.on( 'disconnected', eventLogger( 'disconnected', db ) )
    db.on( 'open', eventLogger( 'open', db ) )
    db.on( 'reconnected', eventLogger( 'reconnected', db ) )
  }

  db.on( 'error', eventLogger( 'error', db ) )
  db.on( 'error', attachErrorToDb( db ) )

  db.uri = getUri( options.uri )

  process.on( 'SIGINT',
    function () {
      mongoose.connection.close(
        function () {
          console.log( 'mongoose default connection disconnected through app termination' )
          process.exit( 0 )
        }
      );
    }
  )

  return db
}

module.exports = setupConnection
