'use strict';


/* ensure mongo uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-stakeholder');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { waterfall } = require('async');
const { include } = require('@lykmapipo/include');
const { connect } = require('@lykmapipo/mongoose-common');
const { Permission } = require('@lykmapipo/permission');
const { Role } = require('@codetanzania/emis-role');
const { Feature, featureRouter } = require('@codetanzania/emis-feature');
const { Party, apiVersion, info, app } = include(__dirname, '..');


// seeds
const seedPermissions = (next) => Permission.seed(next);
const seedRoles = (permissions, next) => Role.seed(next);
const seedFeatures = (roles, next) => {
  Feature.seed((error, features) => next(error, features, roles));
};
const seedParties = (features, roles, next) => {
  let parties = include(__dirname, 'seeds', 'parties');
  parties = _.map(parties, (party, index) => {
    party.location = features[index];
    party.role = roles[index];
    return party;
  });
  Party.seed(parties, next);
}


// establish mongodb connection
connect((error) => {

  // seed
  waterfall([
    seedPermissions, seedRoles,
    seedFeatures, seedParties
  ], (error, results) => {

    // expose module info
    app.get('/', (request, response) => {
      response.status(200);
      response.json(info);
    });

    app.mount(featureRouter);

    // fire the app
    app.start((error, env) => {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

});
