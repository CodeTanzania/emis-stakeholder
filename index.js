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
const { pkg } = require('@lykmapipo/common');
const { apiVersion } = require('@lykmapipo/env');
const { app, mount } = require('@lykmapipo/express-common');
const { jwtAuth } = require('@lykmapipo/jwt-common');
const { Permission, permissionRouter } = require('@lykmapipo/permission');
const { Predefine, predefineRouter } = require('@lykmapipo/predefine');
const Party = require('./lib/party.model');
const partyRouter = require('./lib/party.http.router');
const authRouter = require('./lib/auth.http.router');

/**
 * @name info
 * @description package information
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
exports.info = pkg(
  `${__dirname}/package.json`,
  'name',
  'description',
  'version',
  'license',
  'homepage',
  'repository',
  'bugs',
  'sandbox',
  'contributors'
);

/**
 * @name Permission
 * @description Permission model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.Permission = Permission;

/**
 * @name Predefine
 * @description Predefine model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.Predefine = Predefine;

/**
 * @name Party
 * @description Party model
 * @type {mongoose.Model}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.Party = Party;

/**
 * @name fetchContacts
 * @description export party fetch contacts
 * @type {Function}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.fetchContacts = (criteria, done) => Party.fetchContacts(criteria, done);

/**
 * @name jwtAuth
 * @description middleware stack to check authenticity using jwt tokens
 * @param {Function} next next http middleware to be
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 2.2.0
 * @version 0.1.0
 */
exports.jwtAuth = [
  jwtAuth({ user: (jwt, done) => Party.findByJwt(jwt, done) }),
  (request, response, next) => {
    if (request.user) {
      request.party = request.user;
    }
    return next();
  },
];

/**
 * @name permissionRouter
 * @description permission http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.permissionRouter = permissionRouter;

/**
 * @name predefineRouter
 * @description Predefine http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.predefineRouter = predefineRouter;

/**
 * @name partyRouter
 * @description party http router
 * @type {express.Router}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.partyRouter = partyRouter;

/**
 * @name authenticationRouter
 * @description Authentication http router
 * @type {express.router}
 *
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @since 1.6.0
 * @version 0.1.0
 */
exports.authenticationRouter = authRouter;

/**
 * @name apiVersion
 * @description http router api version
 * @type {String}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
exports.apiVersion = apiVersion();

/**
 * @name app
 * @description express app
 * @type {Object}
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
Object.defineProperty(exports, 'app', {
  get() {
    /* @todo bind oauth middlewares authenticate, token, authorize */
    mount(authRouter);
    mount(permissionRouter);
    mount(predefineRouter);
    mount(partyRouter);
    return app;
  },
});
