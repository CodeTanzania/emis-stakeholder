'use strict';

/* dependencies */
const path = require('path');
const _ = require('lodash');
const { waterfall, parallel } = require('async');
const { connect, clear } = require('@lykmapipo/mongoose-common');
const { Predefine } = require('@lykmapipo/predefine');
const { Permission } = require('@lykmapipo/permission');
const { Party } = require('../');

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
let permissions;
let predefines;
let parties;

/* clear database before seeding data */
const clearAll = next => {
  clear(next);
};

// seed permissions
const seedPermissions = next => {
  let permissions = Permission.prepareResourcesPermissions();
  Permission.seed(permissions, (error, seeded) => {
    log('permissions', error, seeded);
    permissions = seeded;
    next(error);
  });
};

// seed party areas, roles & groups
const seedPredefines = next => {
  Predefine.seed((error, seeded) => {
    log('predefines', error, seeded);
    predefines = seeded;
    next(error);
  });
};

// seed parties
const seedParties = next => {
  parties = require('./seeds/parties');
  _.map(parties, party => {
    party.confirmedAt = new Date();
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
    if (error) {
      return done(error);
    }
    const seeds = [clearAll, seedPermissions, seedPredefines, seedParties];
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
