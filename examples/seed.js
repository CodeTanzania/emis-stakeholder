'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { waterfall, parallel } = require('async');
const { include } = require('@lykmapipo/include');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { Predefine } = require('@lykmapipo/predefine');
const { Permission } = require('@lykmapipo/permission');
const { Feature } = require('@codetanzania/emis-feature');
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
let groups;
let parties;

/* clear database before seeding data */
const clearAll = next => {
  clear(next);
};

// seed permissions
const seedPermissions = next => {
  Permission.seed(permissions, (error, seeded) => {
    log('permissions', error, seeded);
    permissions = seeded;
    next(error);
  });
};

// seed features
const seedFeatures = next => {
  features = include(__dirname, 'seeds', 'features');
  Feature.seed(features, (error, seeded) => {
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

// seed party groups
const seedPartyGroups = next => {
  Predefine.seed((error, seeded) => {
    log('groups', error, seeded);
    groups = seeded;
    next(error);
  });
};

// seed parties
const seedParties = next => {
  parties = include(__dirname, 'seeds', 'parties');
  _.map(parties, party => {
    party.location = _.sample(wards).toObject();
    party.role = _.sample(roles).toObject();
    party.password =
      '$2a$10$rwpL/BhU8xY4fkf8SG7fHugF4PCioTJqy8BLU7BZ8N0YV.8Y1dXem';
    party.confirmedAt = new Date();
    return party;
  });

  Party.seed((error, seeded) => {
    log('parties', error, seeded);
    parties = seeded;
    next(error);
  });
};

// seed work
const seed = done => {
  seedStart = Date.now();
  connect(error => {
    if (error) {
      return done(error);
    }
    const seeds = [
      clearAll,
      seedPermissions,
      seedFeatures,
      seedPartyGroups,
      seedRoles,
      seedParties,
    ];
    waterfall(seeds, done);
  });
};

// do seeding
seed((error, results = [true]) => {
  seedEnd = Date.now();
  log('time', null, seedEnd - seedStart);
  log('final', error, results);
  process.exit(0);
});
