'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { waterfall, parallel } = require('async');
const { include } = require('@lykmapipo/include');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { Feature } = require('@codetanzania/emis-feature');
const { Permission } = require('@lykmapipo/permission');
const { Role } = require('@codetanzania/emis-role');
const { Party } = include(__dirname, '..');


// naive logger
const log = (stage, error, result) => {
  if (error) {
    console.error(`${stage} seed error`, error);
  }
  if (result) {
    const val = _.isArray(result) ? result.length : result;
    console.info(`${stage} seed result`, val);
  }
};


/* refs */
let seedStart;
let seedEnd;
let features;
let wards;
let permissions;
let roles;
let parties;


// seed permissions
const seedPermissions = next => {
  Permission.seed((error, seeded) => {
    log('permissions', error, seeded);
    permissions = seeded;
    next(error);
  });
};

// seed features
const seedFeatures = next => {
  Feature.seed((error, seeded) => {
    log('features', error, seeded);
    features = seeded;
    wards = _.filter(features, feature => feature.type === 'Ward');
    next(error);
  });
};

// seed roles
const seedRoles = next => {
  Role.seed((error, seeded) => {
    log('roles', error, seeded);
    roles = seeded;
    next(error);
  });
};

// seed parties
const seedParties = next => {
  parties = include(__dirname, 'seeds', 'parties');
  parties = _.map(parties, party => {
    party.location = _.sample(wards);
    party.role = _.sample(roles);
    return party;
  });
  Party.seed(parties, (error, seeded) => {
    log('parties', error, seeded);
    parties = seeded;
    next(error);
  });
};

// seed work
const seed = done => {
  seedStart = Date.now();
  connect(error => {
    if (error) { return done(error); }
    waterfall([
      seedPermissions, seedFeatures,
      seedRoles, seedParties
    ], done);
  });
};

// do seeding
seed((error, results = [true]) => {
  seedEnd = Date.now();
  log('time', null, seedEnd - seedStart);
  log('final', error, results);
  process.exit(0);
});
