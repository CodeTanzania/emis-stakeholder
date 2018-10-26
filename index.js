'use strict';


/**
 * @module Party
 * @name Party
 * @description A representation of an entity (e.g municipal, individual,
 * agency, organization etc) consisting of contact information (e.g. name,
 * e-mail addresses, phone numbers) and other descriptive information of
 * interest in emergency(or disaster) management.
 *
 * It may be a self managed entity or division within another
 * entity(party) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @licence MIT
 * @since  0.1.0
 * @version 0.1.0
 * @example
 *
 * const { app } = require('@lykmapipo/party');
 * app.start();
 *
 */


/* dependencies */
const path = require('path');
const _ = require('lodash');
const app = require('@lykmapipo/express-common');
const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);
const { Permission, permissionRouter } = require('@lykmapipo/permission');
const { Role, roleRouter } = require('@codetanzania/emis-role');


/* declarations */
const pkg = require(path.join(__dirname, 'package.json'));
const fields = [
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
];


/* extract information from package.json */
const info = _.merge({}, _.pick(pkg, fields));


/* export package(module) info */
exports.info = info;


/* import models */
const Party = require(path.join(__dirname, 'lib', 'party.model'));


/* export models */
exports.Party = Party;
exports.Role = Role;
exports.Permission = Permission;


/* import routers*/
const partyRouter =
  require(path.join(__dirname, 'lib', 'party.http.router'));


/* export party router */
exports.apiVersion = partyRouter.apiVersion;
exports.partyRouter = partyRouter;
exports.roleRouter = roleRouter;
exports.permissionRouter = permissionRouter;


/* export app */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    app.mount(permissionRouter);
    app.mount(roleRouter);
    app.mount(partyRouter);
    return app;
  }
});
