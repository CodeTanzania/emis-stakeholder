'use strict';


/* dependencies */
const path = require('path');
const async = require('async');
const { include } = require('@lykmapipo/include');
const { connect } = require('@lykmapipo/mongoose-common');
const { app, info } = include(__dirname, '..');


// establish mongodb connection
connect(error => {
  // re-throw if error
  if (error) { throw error; }

  // expose module info
  app.get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  // fire the app
  app.start((error, env) => {
    // re-throw if error
    if (error) { throw error; }

    // start http server
    console.log(`visit http://0.0.0.0:${env.PORT}`);
  });

});
