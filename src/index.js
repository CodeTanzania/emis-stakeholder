/**
 * @module Party
 * @namespace Party
 * @name Party
 * @description A representation of an entity (e.g municipal, individual,
 * agency, organization etc) consisting of contact information (e.g. name,
 * e-mail addresses, phone numbers) and other descriptive information of
 * interest in emergency(or disaster) management.
 *
 * It may be a self managed entity or division within another
 * entity(party) in case there is hierarchy.
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @license MIT
 * @example
 *
 * import { Party, start } from '@codetanzania/emis-stakeholder';
 *
 * // create stakeholder
 * Party.create({ ... }, (error, party) => { ... });
 *
 * // find stakeholders
 * Party.find({ ... }, (error, parties) => { ... });
 *
 * // start http server
 * start(error => { ... });
 */
// import '@codetanzania/ewea-internals';
import { pkg } from '@lykmapipo/common';
import { apiVersion as httpApiVersion } from '@lykmapipo/env';
import { connect } from '@lykmapipo/mongoose-common';
import { mount } from '@lykmapipo/express-common';
import { jwtAuth as httpJwtAuth } from '@lykmapipo/jwt-common';
import { start as startHttp } from '@lykmapipo/express-rest-actions';
import { createModels } from '@lykmapipo/file';
import { Permission, permissionRouter } from '@lykmapipo/permission';
import { Predefine, predefineRouter } from '@lykmapipo/predefine';
import Party from './party.model';
import partyRouter from './party.http.router';
import authenticationRouter from './auth.http.router';

/**
 * @name info
 * @description package information
 * @type {object}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
export const info = pkg(
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
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { Permission };

/**
 * @name Predefine
 * @description Predefine model
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { Predefine };

/**
 * @name Party
 * @description Party model
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { Party };

/**
 * @name permissionRouter
 * @description Permission http router
 * @type {object}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { permissionRouter };

/**
 * @name predefineRouter
 * @description Predefine http router
 * @type {object}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { predefineRouter };

/**
 * @name partyRouter
 * @description Party http router
 * @type {object}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export { partyRouter };

/**
 * @name authenticationRouter
 * @description Authentication http router
 * @type {object}
 * @author Benson Maruchu <benmaruchu@gmail.com>
 * @since 1.6.0
 * @version 0.1.0
 */
export { authenticationRouter };

/**
 * @name apiVersion
 * @description http router api version
 * @type {string}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const apiVersion = httpApiVersion();

/**
 * @function fetchContacts
 * @name fetchContacts
 * @description fetch parties contact
 * @param {object} criteria valid fetch criteria
 * @param {Function} done callback to invoke on success or error
 * @returns {object[]} list of parties or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const fetchContacts = (criteria, done) => {
  return Party.fetchContacts(criteria, done);
};

/**
 * @name jwtAuth
 * @description middleware stack to check authenticity using jwt tokens
 * @param {object} request valid express http request
 * @param {object} response valid express http response
 * @param {Function} next next http middleware to be invoked
 * @returns {Function} next http middleware
 * @author lally elias <lallyelias87@gmail.com>
 * @since 2.2.0
 * @version 0.1.0
 */
export const jwtAuth = [
  httpJwtAuth({ user: (jwt, done) => Party.findByJwt(jwt, done) }),
  (request, response, next) => {
    if (request.user) {
      request.party = request.user;
    }
    return next();
  },
];

/**
 * @function start
 * @name start
 * @description start http server
 * @param {Function} done callback to invoke on success or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
export const start = (done) => {
  // connect mongodb
  connect((error) => {
    // back-off on connect error
    if (error) {
      return done(error);
    }

    // ensure file models
    createModels();

    // mount http routers
    mount(authenticationRouter);
    mount(permissionRouter);
    mount(predefineRouter);
    mount(partyRouter);

    // start http server
    return startHttp(done);
  });
};
