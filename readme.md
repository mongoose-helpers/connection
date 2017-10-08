# mongoose-helpers-connection
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![NSP Status][nsp-image]][nsp-url]

returns a mongoose connection promise.

_note_: you can use [mongoose-helpers-setup-db](https://github.com/mongoose-helpers/setup-db) instead of using this module directly.

## table of contents
* [notes](#notes)
    * [logging](#logging)
    * [errors](#errors)
* [installation](#installation)
* [usage](#usage)
* [license](#license)

## notes
### logging
* error events will be logged to the console
* additional logging - if `options.connection.debug` is set to `true` the following events will also be logged to the console
    * connected
    * connecting
    * disconnected
    * open
    * reconnected

### errors
* if an error occurs, the error will be attached to the db object as `db.error`.

## installation
```javascript
npm install mongoose-helpers-connection
```

## usage
```javascript
var express = require( 'express' )
var connection = require( 'mongoose-helpers-connection' )
var mongoose = require( 'mongoose' )
var app = express()

var User = new mongoose.Schema(
  {
    displayName: String,
    email: String,
    id: String,
    photo: String
  }
)

var options = {
  connection: {
    debug: config.debug,
    uri: {
      database: config.database,
      password: config.password,
      username: config.username
    }
  },
  schemas: [
    {
      'User': User
    }
  ]
}

function setupDb( options ) {
  return connection( options.connection )
   .then(
     function ( db ) {
       try {
         if ( Array.isArray( options.schemas ) ) {
           options.schemas.forEach(
             function ( schema ) {
               var keys = Object.keys( schema )

               db.model( keys[ 0 ], schema[ keys[ 0 ] ] )
             }
           );
         }

         return db;
       } catch ( err ) {
         throw err
       }
     }
   )
   .catch(
     function ( err ) {
       throw err
     }
   )
}

setupDb( options )
  .then(
    function ( db ) {
      app.db = db
    }
  )
  .catch(
    function ( err ) {
      app.db = {
        error: err
      }
    }
  )

// elsewhere in your app
app.db.model( 'User' )
  .findOne(
    { 'id': id },
    function( err, existing_user ) {}
  )
```

## license
[MIT License][mit-license]

[mit-license]: https://raw.githubusercontent.com/mongoose-helpers/connection/master/license.txt
[npm-image]: https://img.shields.io/npm/v/mongoose-helpers/connection.svg
[npm-url]: https://www.npmjs.com/package/mongoose-helpers/connection
[nsp-image]: https://nodesecurity.io/orgs/mongoose-helpers/projects/dc7a44de-aeeb-4b58-95b6-0eb341452f7f/badge
[nsp-url]: https://nodesecurity.io/orgs/mongoose-helpers/projects/dc7a44de-aeeb-4b58-95b6-0eb341452f7f
[travis-image]: https://travis-ci.org/mongoose-helpers/connection.svg?branch=master
[travis-url]: https://travis-ci.org/mongoose-helpers/connection
