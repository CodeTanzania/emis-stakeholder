'use strict';

/**
 * @apiDefine Party Party
 *
 * @apiDescription A representation of an entity (e.g municipal, individual,
 * agency, organization etc) consisting of contact information (e.g. name,
 * e-mail addresses, phone numbers) and other descriptive information of
 * interest in emergency(or disaster) management.
 *
 * It may be a self managed entity or division within another
 * entity(party) in case there is hierarchy.
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since  0.1.0
 * @version 0.1.0
 * @public
 */

/**
 * @apiDefine Party
 * @apiSuccess {String} _id Unique party identifier
 * @apiSuccess {Party} [party = undefined] Top party(i.e company,
 * organization etc) under which a party is derived(or member, part of etc).
 * @apiSuccess {String} [type=Other] Human readable type of a party.
 * @apiSuccess {String[]} [phases=Mitigation] Participatory phases of a party
 * in disaster management.
 * @apiSuccess {String} name Human readable name of a party.
 * @apiSuccess {String} [nickname] Human readable alternative or well known name
 * of a party.
 * @apiSuccess {String} [abbreviation=undefined] Human readable short form of
 * a party name.
 * @apiSuccess {String} [title=undefined] Human readable profession, occupation
 * or job title of a party.
 * @apiSuccess {String} [about=undefined] A brief summary about a party if
 * available i.e additional details that clarify what a party do.
 * @apiSuccess {String} [locale=en] Defines the party's language, region and any
 * special variant preferences.
 * @apiSuccess {String} [timezone=undefined] Defines timezone of a party.
 * @apiSuccess {String} email Primary email address used to contact a party.
 * @apiSuccess {String} mobile Primary mobile phone number used to contact a party.
 * @apiSuccess {String} [landline=undefined] Primary main-line(or fixed-line)
 * phone number used to contact a party.
 * @apiSuccess {String} [fax=undefined] Primary fax number used to contact
 * a party.
 * @apiSuccess {String} [website=undefined] Primary website url(or link) of a
 * party.
 * @apiSuccess {String} [avatar=undefined] Image(logo, face or emblem) of a party.
 * @apiSuccess {String} [physicalAddress=undefined] Primary physical address of
 * party office.
 * @apiSuccess {String} [postalAddress=undefined] Primary postal address of
 * party office.
 * @apiSuccess {Point} [centre=undefined] A geo-location coordinates of a party
 * main office or area of operation.
 * @apiSuccess {Feature} [location=undefined] Geographical location of a party
 * main office or area of operation.
 * @apiSuccess {Role} [role=undefined] Assignable or given roles that
 * permits(or give access rights) to a party.
 * @apiSuccess {Party[]} [members=undefined] List of parties belongs to
 * this party.
 * @apiSuccess {Date} createdAt Date when party was created
 * @apiSuccess {Date} updatedAt Date when party was last updated
 *
 */

/**
 * @apiDefine Parties
 * @apiSuccess {Object[]} data List of parties
 * @apiSuccess {String} data._id Unique party identifier
 * @apiSuccess {Party} [data.party = undefined] Top party(i.e company,
 * organization etc) under which a party is derived(or member, part of etc).
 * @apiSuccess {String} [data.type=Other] Human readable type of a party.
 * @apiSuccess {String[]} [phases=Mitigation] Participatory phases of a party
 * in disaster management.
 * @apiSuccess {String} data.name Human readable name of a party.
 * @apiSuccess {String} [data.nickname] Human readable alternative or well known
 * name of a party.
 * @apiSuccess {String} [data.abbreviation=undefined] Human readable short form
 * of a party name.
 * @apiSuccess {String} [data.title=undefined] Human readable profession,
 * occupation or job title of a party.
 * @apiSuccess {String} [data.about=undefined] A brief summary about a party if
 * available i.e additional details that clarify what a party do.
 * @apiSuccess {String} [data.locale=en] Defines the party's language, region
 * and any special variant preferences.
 * @apiSuccess {String} [data.timezone=undefined] Defines timezone of a party.
 * @apiSuccess {String} data.email Primary email address used to contact a party.
 * @apiSuccess {String} data.mobile Primary mobile phone number used to contact
 * a party.
 * @apiSuccess {String} [data.landline=undefined] Primary main-line(or fixed-line)
 * phone number used to contact a party.
 * @apiSuccess {String} [data.fax=undefined] Primary fax number used to contact
 * a party.
 * @apiSuccess {String} [data.website=undefined] Primary website url(or link) of a
 * party.
 * @apiSuccess {String} [data.avatar=undefined] Image(logo, face or emblem) of
 * a party.
 * @apiSuccess {String} [physicalAddress=undefined] Primary physical address of
 * party office.
 * @apiSuccess {String} [postalAddress=undefined] Primary postal address of
 * party office.
 * @apiSuccess {Point} [data.centre=undefined] A geo-location coordinates of a
 * party main office or area of operation.
 * @apiSuccess {Feature} [data.location=undefined] Geographical location of a
 * party main office or area of operation.
 * @apiSuccess {Object} [data.role=undefined] Assignable or given roles that
 * permits(or give access rights) to a party.
 * @apiSuccess {Party[]} [data.members=undefined] List of parties belongs to
 * this party.
 * @apiSuccess {Date} data.createdAt Date when party was created
 * @apiSuccess {Date} data.updatedAt Date when party was last updated
 * @apiSuccess {Number} total Total number of parties
 * @apiSuccess {Number} size Number of parties returned
 * @apiSuccess {Number} limit Query limit used
 * @apiSuccess {Number} skip Query skip/offset used
 * @apiSuccess {Number} page Page number
 * @apiSuccess {Number} pages Total number of pages
 * @apiSuccess {Date} lastModified Date and time at which latest party
 * was last modified
 *
 */

/**
 * @apiDefine PartySuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "_id": "5b5d92da476363251e13e0f4",
 *   "type": "Agency",
 *   "name": "Bedfordshire",
 *   "mobile": "(943) 902-6124",
 *   "landline": "661-575-8596",
 *   "fax": "945.952.6154 x857",
 *   "email": "arely.kuvalis@gmail.com",
 *   "website": "julian.name",
 *   "about": "Labore aut corrupti et. Doloribus animi quidem ratione.",
 *   "phases": [
 *     "Mitigation",
 *     "Response"
 *   ],
 *   "updatedAt": "2018-07-29T10:11:38.110Z",
 *   "createdAt": "2018-07-29T10:11:38.110Z"
 * }
 *
 */

/**
 * @apiDefine PartiesSuccessResponse
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "data": [
 *     {
 *       "_id": "5b5d92da476363251e13e0f4",
 *       "type": "Agency",
 *       "name": "Bedfordshire",
 *       "phone": "(943) 902-6124",
 *       "landline": "661-575-8596",
 *       "fax": "945.952.6154 x857",
 *       "email": "arely.kuvalis@gmail.com",
 *       "website": "julian.name",
 *       "about": "Labore aut corrupti et. Doloribus animi quidem ratione.",
 *       "phases": [
 *         "Mitigation",
 *         "Response"
 *       ],
 *       "updatedAt": "2018-07-29T10:11:38.110Z",
 *       "createdAt": "2018-07-29T10:11:38.110Z"
 *     }
 *   ],
 *   "total": 20,
 *   "size": 10,
 *   "limit": 10,
 *   "skip": 0,
 *   "page": 1,
 *   "pages": 2,
 *   "lastModified": "2018-07-29T10:11:38.111Z"
 * }
 */

/* dependencies */
const _ = require('lodash');
const { waterfall } = require('async');
const { getString } = require('@lykmapipo/env');
const { include } = require('@lykmapipo/include');
const Router = require('@lykmapipo/express-common').Router;
const irinaUtils = require('irina/lib/utils.js');

/* local constants */
const API_VERSION = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/parties/:id';
const PATH_LIST = '/parties';
const PATH_CHILDREN = '/parties/:party/parties';
const PATH_SCHEMA = '/parties/schema';
const PATH_EXPORT = '/parties/export';
const PATH_NOTIFICATION = '/notifications';

/* declarations */
const Party = include(__dirname, 'party.model');
const router = new Router({
  version: API_VERSION,
});

/**
 * @api {get} /parties List Parties
 * @apiVersion 1.0.0
 * @apiName GetParties
 * @apiGroup Party
 * @apiDescription Returns a list of parties
 * @apiUse RequestHeaders
 * @apiUse Parties
 *
 * @apiUse RequestHeadersExample
 * @apiUse PartiesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_LIST, function getParties(request, response, next) {
  //obtain request options
  const options = _.merge({}, request.mquery);

  Party.get(options, function onGetParties(error, results) {
    //forward error
    if (error) {
      next(error);
    }

    //handle response
    else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @api {get} /parties/schema Get Party Schema
 * @apiVersion 1.0.0
 * @apiName GetPartySchema
 * @apiGroup Party
 * @apiDescription Returns party json schema definition
 * @apiUse RequestHeaders
 */
router.get(PATH_SCHEMA, function getSchema(request, response) {
  const schema = Party.jsonSchema();
  response.status(200);
  response.json(schema);
});

/**
 * @api {get} /parties/export Export Parties
 * @apiVersion 1.0.0
 * @apiName ExportParties
 * @apiGroup Party
 * @apiDescription Export parties as csv
 * @apiUse RequestHeaders
 */
router.get(PATH_EXPORT, function getExport(request, response) {
  //obtain request options
  const options = _.merge({}, request.mquery);

  // reply with csv export
  response.attachment(`parties_exports_${Date.now()}.csv`);
  response.status(200);
  Party.exportCsv(options).pipe(response);
});

/**
 * @api {post} /parties Create New Party
 * @apiVersion 1.0.0
 * @apiName PostParty
 * @apiGroup Party
 * @apiDescription Create new party
 * @apiUse RequestHeaders
 * @apiUse Party
 *
 * @apiUse RequestHeadersExample
 * @apiUse PartySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_LIST, function postParty(request, response, next) {
  // obtain request body
  const body = _.merge({}, request.body);

  // extend party with default password
  if (request.body && _.isEmpty(request.body.password)) {
    body.password = getString('DEFAULT_PASSWORD', '123456789');
  }

  Party.register(body, function onPostParty(error, created) {
    // forward error
    if (error) {
      next(error);
    }

    // handle response
    else {
      response.status(201);
      response.json(created);
    }
  });
});

/**
 * @api {get} /parties/:id Get Existing Party
 * @apiVersion 1.0.0
 * @apiName GetParty
 * @apiGroup Party
 * @apiDescription Get existing party
 * @apiUse RequestHeaders
 * @apiUse Party
 *
 * @apiUse RequestHeadersExample
 * @apiUse PartySuccessResponse
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_SINGLE, function getParty(request, response, next) {
  //obtain request options
  const options = _.merge({}, request.mquery);

  //obtain party id
  options._id = request.params.id;

  Party.getById(options, function onGetParty(error, found) {
    //forward error
    if (error) {
      next(error);
    }

    //handle response
    else {
      response.status(200);
      response.json(found);
    }
  });
});

/**
 * @api {patch} /parties/:id Patch Existing Party
 * @apiVersion 1.0.0
 * @apiName PatchParty
 * @apiGroup Party
 * @apiDescription Patch existing party
 * @apiUse RequestHeaders
 * @apiUse Party
 *
 * @apiUse RequestHeadersExample
 * @apiUse PartySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.patch(PATH_SINGLE, function patchParty(request, response, next) {
  // obtain party id
  const _id = request.params.id;

  // obtain request body
  const patches = _.merge({}, request.body);

  waterfall(
    [
      function encryptPassword(after) {
        if (patches.password) {
          irinaUtils.hash(patches.password, 10, function(error, hash) {
            patches.password = hash;
            after(error, patches);
          });
        } else {
          after(null, patches);
        }
      },

      function updateParty(patches, after) {
        Party.patch(_id, patches, after);
      },
    ],
    function done(error, patched) {
      if (error) {
        next(error);
      } else {
        response.status(200);
        response.json(patched);
      }
    }
  );
});

/**
 * @api {put} /parties/:id Put Existing Party
 * @apiVersion 1.0.0
 * @apiName PutParty
 * @apiGroup Party
 * @apiDescription Put existing party
 * @apiUse RequestHeaders
 * @apiUse Party
 *
 * @apiUse RequestHeadersExample
 * @apiUse PartySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.put(PATH_SINGLE, function putParty(request, response, next) {
  // obtain party id
  const _id = request.params.id;

  // obtain request body
  const updates = _.merge({}, request.body);

  waterfall(
    [
      function encryptPassword(after) {
        if (updates.password) {
          irinaUtils.hash(updates.password, 10, function(error, hash) {
            updates.password = hash;
            after(error, updates);
          });
        } else {
          after(null, updates);
        }
      },

      function updateParty(patches, after) {
        Party.patch(_id, patches, after);
      },
    ],
    function done(error, patched) {
      if (error) {
        next(error);
      } else {
        response.status(200);
        response.json(patched);
      }
    }
  );
});

/**
 * @api {delete} /parties/:id Delete Existing Party
 * @apiVersion 1.0.0
 * @apiName DeleteParty
 * @apiGroup Party
 * @apiDescription Delete existing party
 * @apiUse RequestHeaders
 * @apiUse Party
 *
 * @apiUse RequestHeadersExample
 * @apiUse PartySuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.delete(PATH_SINGLE, function deleteParty(request, response, next) {
  // obtain party id
  const _id = request.params.id;

  // obtain request body
  const patches = _.merge({}, { deletedAt: new Date() });

  Party.patch(_id, patches, function onDeleteParty(error, deleted) {
    //forward error
    if (error) {
      next(error);
    }

    //handle response
    else {
      response.status(200);
      response.json(deleted);
    }
  });
});

/**
 * @api {get} /parties/:party/parties List Sub-Parties
 * @apiVersion 1.0.0
 * @apiName GetSubParties
 * @apiGroup Party
 * @apiDescription Returns a list of sub-parties
 * @apiUse RequestHeaders
 * @apiUse Parties
 *
 * @apiUse RequestHeadersExample
 * @apiUse PartiesSuccessResponse
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.get(PATH_CHILDREN, function getSubParties(request, response, next) {
  //obtain request options
  const { party } = request.params;
  const filter = party ? { filter: { party: party } } : {};
  const options = _.merge({}, filter, request.mquery);

  Party.get(options, function onGetSubParties(error, results) {
    //forward error
    if (error) {
      next(error);
    }

    //handle response
    else {
      response.status(200);
      response.json(results);
    }
  });
});

/**
 * @api {post} /notifications Create New Notification
 * @apiVersion 1.0.0
 * @apiName PostNotification
 * @apiGroup Party
 * @apiDescription Send new notification to parties
 * @apiUse RequestHeaders
 *
 *
 * @apiUse RequestHeadersExample
 * @apiUse JWTError
 * @apiUse JWTErrorExample
 * @apiUse AuthorizationHeaderError
 * @apiUse AuthorizationHeaderErrorExample
 */
router.post(PATH_NOTIFICATION, function postNotification(
  request,
  response,
  next
) {
  //obtain request body
  const body = _.merge({}, request.body);

  Party.notify(body, function onPostNotification(error, results) {
    //forward error
    if (error) {
      next(error);
    }

    //handle response
    else {
      response.status(201);
      response.json(results);
    }
  });
});

/* expose party router */
module.exports = exports = router;
