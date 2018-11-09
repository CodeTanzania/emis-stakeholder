'use strict';


/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-party');


/* dependencies */
const path = require('path');
const async = require('async');
const mongoose = require('mongoose');
const {
  Permission,
  Role,
  Party,
  apiVersion,
  info,
  app
} = require(path.join(__dirname, '..'));


/* connect to mongoose */
mongoose.connect(process.env.MONGODB_URI);

// boot
async.waterfall([
  function seedPermissions(next) {
    Permission.seed(next);
  },
  function seedRole(permissions, next) {
    Role.seed(next);
  },
  function seedParties(roles, next) {
    Party.seed(next);
  }
], (error, results) => {
  console.log(error);
  /* expose module info */
  app.get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  /* fire the app */
  app.start((error, env) => {
    console.log(
      `visit http://0.0.0.0:${env.PORT}/v${apiVersion}/parties`
    );
  });

});
