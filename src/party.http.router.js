import { getString } from '@lykmapipo/env';
import {
  getFor,
  schemaFor,
  downloadFor,
  getByIdFor,
  postFor,
  patchFor,
  putFor,
  deleteFor,
  Router,
} from '@lykmapipo/express-rest-actions';

import Party from './party.model';
import { ensurePassword, encryptPassword } from './http.middlewares';

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/parties/:id';
const PATH_LIST = '/parties';
const PATH_CHILDREN = '/parties/:party/parties';
const PATH_SCHEMA = '/parties/schema';
const PATH_EXPORT = '/parties/export';
const PATH_NOTIFICATION = '/notifications';

/**
 * @name PartyHttpRouter
 * @namespace PartyHttpRouter
 *
 * @description A representation of an entity (e.g municipal, individual,
 * agency, organization etc) consisting of contact information (e.g. name,
 * e-mail addresses, phone numbers) and other descriptive information of
 * interest in emergency(or disaster) management.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const router = new Router({
  version: API_VERSION,
});

/**
 * @name GetParties
 * @memberof PartyHttpRouter
 * @description Returns a list of parties
 */
router.get(
  PATH_LIST,
  getFor({
    get: (options, done) => Party.get(options, done),
  })
);

/**
 * @name GetPartySchema
 * @memberof PartyHttpRouter
 * @description Returns party json schema definition
 */
router.get(
  PATH_SCHEMA,
  schemaFor({
    getSchema: (query, done) => {
      const jsonSchema = Party.jsonSchema();
      return done(null, jsonSchema);
    },
  })
);

/**
 * @name ExportParties
 * @memberof PartyHttpRouter
 * @description Export parties as csv
 */
router.get(
  PATH_EXPORT,
  downloadFor({
    download: (options, done) => {
      const fileName = `parties_exports_${Date.now()}.csv`;
      const readStream = Party.exportCsv(options);
      return done(null, { fileName, readStream });
    },
  })
);

/**
 * @name PostParty
 * @memberof PartyHttpRouter
 * @description Create new party
 */
router.post(
  PATH_LIST,
  ensurePassword,
  postFor({
    post: (body, done) => Party.register(body, done),
  })
);

/**
 * @name GetParty
 * @memberof PartyHttpRouter
 * @description Get existing party
 */
router.get(
  PATH_SINGLE,
  getByIdFor({
    getById: (options, done) => Party.getById(options, done),
  })
);

/**
 * @name PatchParty
 * @memberof PartyHttpRouter
 * @description Patch existing party
 */
router.patch(
  PATH_SINGLE,
  encryptPassword,
  patchFor({
    patch: (options, done) => Party.patch(options, done),
  })
);

/**
 * @name PutParty
 * @memberof PartyHttpRouter
 * @description Put existing party
 */
router.put(
  PATH_SINGLE,
  encryptPassword,
  putFor({
    put: (options, done) => Party.put(options, done),
  })
);

/**
 * @name DeleteParty
 * @memberof PartyHttpRouter
 * @description Delete existing party
 */
router.delete(
  PATH_SINGLE,
  deleteFor({
    del: (options, done) => Party.del(options, done),
    soft: true,
  })
);

/**
 * @name GetSubParties
 * @memberof PartyHttpRouter
 * @description Returns a list of sub-parties
 */
router.get(
  PATH_CHILDREN,
  getFor({
    get: (options, done) => Party.get(options, done),
  })
);

/**
 * @name PostNotification
 * @name GetSubParties
 * @memberof PartyHttpRouter
 * @description Send new notification to parties
 *
 * @example
 *
 * POST /notifications
 *
 */
router.post(
  PATH_NOTIFICATION,
  postFor({
    post: (body, done) => Party.notify(body, done),
  })
);

/* expose router */
export default router;
