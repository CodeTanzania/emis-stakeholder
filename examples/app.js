'use strict';


/* ensure mongodb uri */
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-stakeholder');


/* dependencies */
const path = require('path');
const _ = require('lodash');
const async = require('async');
const mongoose = require('mongoose');
const faker = require('@benmaruchu/faker');
const {
  Party,
  Role,
  Permission,
  info,
  app
} = require(path.join(__dirname, '..'));


/* establish mongodb connection */
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });


function boot() {

  async.waterfall([

    function clearParties(next) {
      Party.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearRoles(next) {
      Role.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function clearPermissions(next) {
      Permission.deleteMany(function ( /*error, results*/ ) {
        next();
      });
    },

    function seedPermission(next) {
      Permission.seed(next);
    },

    function seedRoles(permissions, next) {
      let roles = [
        'Region Disaster Committee',
        'District Disaster Committee',
        'Ward Disaster Committee',
        'Village Disaster Committee',
        'Ward Executive Officer',
        'Village Executive Officer'
      ];
      roles = _.map(roles, function (role) {
        return {
          name: role,
          responsibilities: faker.lorem.sentences(4, ';').split(';'),
          permissions: [].concat(permissions)
        };
      });
      Role.seed(roles, next);
    },

    function seedMembers(roles, next) {
      const members = Party.fake(5);
      _.forEach(members, function (member, index) {
        member.role = roles[index % roles.length];
      });
      Party.insertMany(members, function (error, _members) {
        next(error, roles, _members);
      })
    },

    function seedParties(roles, members, next) {
      const parties = Party.fake(20);
      _.forEach(parties, function (party, index) {
        party.role = roles[index % roles.length];
        party.members = [].concat(members);
      });
      Party.insertMany(parties, next);
    }

  ], function (error, results) {

    /* expose module info */
    app.get('/', function (request, response) {
      response.status(200);
      response.json(info);
    });

    /* fire the app */
    app.start(function (error, env) {
      console.log(`visit http://0.0.0.0:${env.PORT}`);
    });

  });

}

boot();
