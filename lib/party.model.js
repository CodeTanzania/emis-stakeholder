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
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */

/* dependencies */
const _ = require('lodash');
const { parallel, waterfall } = require('async');
const irina = require('irina');
const { abbreviate, compact, mergeObjects } = require('@lykmapipo/common');
const { getString, getStrings } = require('@lykmapipo/env');
const { refresh: jwtRefresh } = require('@lykmapipo/jwt-common');
const {
  Schema,
  ObjectId,
  model,
  SCHEMA_OPTIONS,
  copyInstance,
} = require('@lykmapipo/mongoose-common');
const actions = require('mongoose-rest-actions');
const exportable = require('@lykmapipo/mongoose-exportable');
const { plugin: runInBackground } = require('mongoose-kue');
const { Email } = require('@lykmapipo/postman');
const { Point } = require('mongoose-geojson-schemas');
const { Predefine } = require('@lykmapipo/predefine');

/* constants */
const POPULATION_MAX_DEPTH = 1;
const PARTY_MODEL_NAME = getString('PARTY_MODEL_NAME', 'Party');
const PARTY_COLLECTION_NAME = getString('PARTY_COLLECTION_NAME', 'parties');
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const LOCALES = getStrings('LOCALES', DEFAULT_LOCALE);
const DEFAULT_PARTY_TYPE = getString('DEFAULT_PARTY_TYPE', 'Focal');
const PARTY_TYPES = getStrings('PARTY_TYPES', ['Focal', 'Agency']);
const DEFAULT_PASSWORD = _.trim(getString('DEFAULT_PASSWORD', '123456789'));
const OPTION_AUTOPOPULATE_GROUP = {
  select: {
    'strings.name': 1,
    'strings.abbreviation': 1,
    'strings.description': 1,
  },
  maxDepth: POPULATION_MAX_DEPTH,
};
const OPTION_AUTOPOPULATE_ROLE = {
  select: {
    'strings.name': 1,
    'strings.abbreviation': 1,
    'strings.description': 1,
  },
  maxDepth: POPULATION_MAX_DEPTH,
};
const OPTION_AUTOPOPULATE_AREA = {
  select: {
    'strings.name': 1,
    'strings.abbreviation': 1,
    'strings.description': 1,
  },
  maxDepth: POPULATION_MAX_DEPTH,
};
const OPTION_AUTOPOPULATE = {
  select: { name: 1, email: 1, mobile: 1, abbreviation: 1 },
  maxDepth: POPULATION_MAX_DEPTH,
};

/**
 * @name PartySchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const PartySchema = new Schema(
  {
    /**
     * @name party
     * @description Top party(i.e company, organization etc) under which a party
     * is derived(or member, part of etc).
     *
     * This is applicable where a large party delegates its power to its
     * division(s).
     *
     * If not set the party will be treated as a top party and will be affected
     * by any logics implemented accordingly.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   _id: "5bcda2c073dd0700048fb846",
     *   "type": "Agency",
     *   name: "Bedfordshire",
     *   phone: "+255715463739",
     *   landline: "(886) 804-4219",
     *   fax: "1-807-746-5438",
     *   email: "zj.aj@ojwj.com",
     * }
     */
    party: {
      type: ObjectId,
      ref: PARTY_MODEL_NAME,
      index: true,
      exists: true,
      autopopulate: OPTION_AUTOPOPULATE,
      taggable: true,
    },

    /**
     * @name type
     * @description Human readable type of a party.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * Agency
     */
    type: {
      type: String,
      trim: true,
      enum: PARTY_TYPES,
      index: true,
      searchable: true,
      taggable: true,
      default: DEFAULT_PARTY_TYPE,
      fake: true,
    },

    /**
     * @name group
     * @description Human readable group of a party.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * Hospitals
     */
    group: {
      type: ObjectId,
      ref: Predefine.MODEL_NAME,
      index: true,
      // required: true,
      exists: true,
      autopopulate: OPTION_AUTOPOPULATE_GROUP,
      taggable: true,
      exportable: {
        format: (v) => {
          return (
            v &&
            v.strings &&
            compact([v.strings.name.en, v.strings.abbreviation.en]).join(' - ')
          );
        },
        order: 2,
        default: 'NA',
      },
      default: undefined,
    },

    /**
     * @name name
     * @description Human readable name of a party.
     *
     * It may be organization name e.g ACME Inc., person name e.g Juma John,
     * division withing organization e.g HR Dept etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * ACME Inc.
     */
    name: {
      type: String,
      trim: true,
      required: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: { order: 1 },
      fake: {
        generator: 'name',
        type: 'findName',
      },
    },

    /**
     * @name abbreviation
     * @description Human readable short form of a party name.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} uppercase - force upper-casing
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * ACME.
     */
    abbreviation: {
      type: String,
      trim: true,
      uppercase: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: { order: 1 },
      fake: {
        generator: 'hacker',
        type: 'abbreviation',
      },
    },

    /**
     * @name locale
     * @description Defines the party's language, region and any
     * special variant preferences.
     *
     * @see {@link https://en.wikipedia.org/wiki/Locale_(computer_software)}
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * en, sw
     */
    locale: {
      type: String,
      trim: true,
      enum: LOCALES,
      index: true,
      searchable: true,
      taggable: true,
      default: DEFAULT_LOCALE,
      fake: true,
    },

    /**
     * @name email
     * @description Primary email address used to contact a party.
     *
     * Used when another party want to send direct mail to the other party.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} lowercase - force lower-casing
     * @property {boolean} email - force to be a valid email address
     * @property {boolean} index - ensure database index
     * @property {boolean} unique - ensure database unique index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * jow.joz@jottot.com
     */
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      email: true,
      index: true,
      unique: true,
      searchable: true,
      taggable: true,
      exportable: { header: 'Email Address', order: 5 },
      fake: {
        generator: 'internet',
        type: 'email',
      },
    },

    /**
     * @name mobile
     * @description Primary mobile phone number used to contact a party.
     *
     * Used when another party want to send a direct message or
     * call the other party.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} unique - ensure database unique index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * 255765222333
     */
    mobile: {
      type: String,
      trim: true,
      required: true,
      phone: {
        e164: true,
        mobile: true,
      },
      index: true,
      unique: true,
      searchable: true,
      taggable: true,
      exportable: { header: 'Mobile Number', order: 4 },
      fake: (faker) => faker.helpers.replaceSymbolWithNumber('255714######'),
    },

    /**
     * @name landline
     * @description Primary main-line(or fixed-line) phone number
     * used to contact a party.
     *
     * Used when another party want to direct call the other party.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * 255-242233642
     */
    landline: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      fake: (faker) => faker.helpers.replaceSymbolWithNumber('2552224#####'),
    },

    /**
     * @name fax
     * @description Primary fax number used to contact a party.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * 255-242233642
     */
    fax: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      fake: (faker) => faker.helpers.replaceSymbolWithNumber('2552224#####'),
    },

    /**
     * @name website
     * @description Primary website url(or link) of a party.
     *
     * Used when another party want to obtain specific information about
     * other party.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} lowercase - force lower-casing
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * https://www.acme.com
     */
    website: {
      type: String,
      trim: true,
      lowercase: true,
      index: true,
      searchable: true,
      taggable: true,
      fake: {
        generator: 'internet',
        type: 'url',
      },
    },

    /**
     * @name pysicalAddress
     * @description Primary physical address of party office.
     *
     * Used when another party what to physical go or visit the other
     * party office.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * ACME Inc.
     * 2nd Floor "De Doctor Plaza"
     * Plot 440 Jomo Drive Masaki
     * Dar es Salaam, Tanzania
     */
    physicalAddress: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      fake: {
        generator: 'address',
        type: 'streetAddress',
      },
    },

    /**
     * @name postalAddress
     * @description Primary postal address of party office.
     *
     * Used when another party what to send letter, percerls etc to anther
     * party office.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * ACME Inc.
     * P.O.Box 9683
     * Dar es Salaam
     * Tanzania
     */
    postalAddress: {
      type: String,
      trim: true,
      index: true,
      searchable: true,
      taggable: true,
      fake: {
        generator: 'address',
        type: 'streetAddress',
      },
    },

    /**
     * @name centre
     * @description A geo-location coordinates of a party main office or area of
     * operation.
     *
     * Its a coordinates(longitude and latidude) pair of office reachable by
     * other party or boundary of an area.
     *
     * @type {object}
     * @property {object} location - geo json point
     * @property {string} location.type - Point
     * @property {number[]} location.coordinates - longitude, latitude pair of
     * the geo point
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *    type: 'Point',
     *    coordinates: [-76.80207859497996, 55.69469494228919]
     * }
     */
    centre: Point,

    /**
     * @name area
     * @description Geographical location of a party main office or area of
     * operation.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced model(or collection)
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
     *
     * @since 1.1.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "name": {"en": "Dar es Salaam"}
     * }
     */
    area: {
      type: ObjectId,
      ref: Predefine.MODEL_NAME,
      // required: true,
      index: true,
      exists: true,
      autopopulate: OPTION_AUTOPOPULATE_AREA,
      taggable: true,
      exportable: {
        header: 'Area',
        format: (v) => {
          return v && v.strings && compact([v.strings.name.en]).join(' - ');
        },
        order: 3,
        default: 'NA',
      },
    },

    /**
     * @name role
     * @description Assignable or given role to a party.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - population options
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     *
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "name": {"en": "Administrator"}
     * }
     */
    role: {
      type: ObjectId,
      ref: Predefine.MODEL_NAME,
      index: true,
      // required: true,
      exists: true,
      autopopulate: OPTION_AUTOPOPULATE_ROLE,
      taggable: true,
      exportable: {
        format: (v) => {
          return (
            v &&
            v.strings &&
            compact([v.strings.name.en, v.strings.abbreviation.en]).join(' - ')
          );
        },
        order: 2,
        default: 'NA',
      },
      default: undefined,
    },

    /**
     * @name token
     * @description Valid api access token for the party.
     *
     * Mainly used for parties that operate as client i.e mobile apps etc.
     *
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {object} fake - fake data generator options
     *
     * @since 2.2.0
     * @version 0.1.0
     * @instance
     */
    token: {
      type: String,
      trim: true,
    },
  },
  SCHEMA_OPTIONS
);

/*
 *------------------------------------------------------------------------------
 *  Hooks
 *------------------------------------------------------------------------------
 */

/**
 * @name validate
 * @description party schema pre validation hook
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
PartySchema.pre('validate', function (done) {
  this.preValidate(done);
});

/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description party schema pre validation hook logic
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PartySchema.methods.preValidate = function preValidate(done) {
  //ensure party abbreviation
  this.abbreviation = _.trim(this.abbreviation) || abbreviate(this.name);

  // extend party with default password
  if (_.isEmpty(this.password)) {
    this.password = DEFAULT_PASSWORD;
  }

  // ensure centre
  if (!this.centre && this.area && this.area.geos) {
    this.centre = this.area.geos.point;
  }

  // generate api token
  this.generateToken(done);
};

/**
 * @name generateToken
 * @function generateToken
 * @description Generate party api token
 * @param {function} done callback to invoke on success or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PartySchema.methods.generateToken = function generateToken(done) {
  // refs
  const party = this;

  const expiresIn = getString('JWT_API_TOKEN_EXPIRES_IN', '1000y');
  const payload = { id: party._id };
  const token = this.token;

  return jwtRefresh(token, payload, { expiresIn }, (error, jwtToken) => {
    if (error || !jwtToken) {
      error = error ? error : new Error('Fail To Generate API Token');
      error.status = 500;
      return done(error);
    } else {
      party.token = jwtToken;
      return done(null, party);
    }
  });
};

/**
 * @name asContact
 * @function asContact
 * @description convert party to contact
 * @since 2.2.0
 * @version 0.1.0
 * @instance
 */
PartySchema.methods.asContact = function asContact() {
  const contact = mergeObjects({
    name: this.name,
    mobile: this.mobile,
    email: this.email,
    pushToken: this.pushToken,
  });
  return contact;
};

/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */

/* static constants */
PartySchema.statics.MODEL_NAME = PARTY_MODEL_NAME;
PartySchema.statics.COLLECTION_NAME = PARTY_COLLECTION_NAME;
PartySchema.statics.OPTION_AUTOPOPULATE = OPTION_AUTOPOPULATE;

PartySchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;
PartySchema.statics.LOCALES = LOCALES;

PartySchema.statics.DEFAULT_PARTY_TYPE = DEFAULT_PARTY_TYPE;
PartySchema.statics.PARTY_TYPES = PARTY_TYPES;

/**
 * @name prepareSeedCriteria
 * @function prepareSeedCriteria
 * @description prepare party seeding upsert criteria
 * @param {Object} seed plain object party seed
 * @return {Object} criteria used to upsert party
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @public
 */
PartySchema.statics.prepareSeedCriteria = (seed) => {
  // prepare party upsert criteria by _id or fields
  let criteria = copyInstance(seed);
  /* jshint ignore:start */
  criteria = criteria._id
    ? _.pick(criteria, '_id')
    : _.pick(criteria, 'name', 'email', 'mobile');
  /* jshint ignore:end */
  // return party upsert criteria
  return criteria;
};

/**
 * @name fetchContacts
 * @function fetchContacts
 * @description Obtain parties contacts based on specified criteria
 * @param {Object} [criteria] valid query criteria
 * @param {function} done a callback to invoke on success or error
 * @return {String[]|Error}
 * @since 1.9.0
 * @version 1.0.0
 * @static
 */
PartySchema.statics.fetchContacts = function fetchContacts(criteria, done) {
  //refs
  const Party = this;

  //normalize arguments
  let conditions = _.isFunction(criteria) ? {} : _.merge({}, criteria);
  const cb = _.isFunction(criteria) ? criteria : done;

  // cast conditions
  conditions = Party.where(conditions).cast(Party);

  // execute fetch query
  Party.find(conditions)
    .select({ name: 1, email: 1, mobile: 1 })
    .exec(function onGetParties(error, parties) {
      let contacts;
      if (!error) {
        contacts = _.map([].concat(parties), function mapToContact(party) {
          return _.pick(party, 'name', 'email', 'mobile');
        });
        contacts = _.uniqWith(contacts, _.isEqual);
      }
      return cb(error, contacts);
    });
};

/**
 * @name getPhones
 * @function getPhones
 * @description pull distinct party phones
 * @param {Object} [criteria] valid query criteria
 * @param {function} done a callback to invoke on success or error
 * @return {String[]|Error}
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
PartySchema.statics.getPhones = function getPhones(criteria, done) {
  //refs
  const Party = this;

  //normalize arguments
  const _criteria = _.isFunction(criteria) ? {} : _.merge({}, criteria);
  const _done = _.isFunction(criteria) ? criteria : done;

  Party.find(_criteria)
    .distinct('mobile')
    .exec(function onGetPhones(error, phones) {
      if (!error) {
        phones = _.uniq(_.compact([].concat(phones)));
      }
      return _done(error, phones);
    });
};

/**
 * @name getEmails
 * @function getEmails
 * @description pull distinct party emails
 * @param {Object} [criteria] valid query criteria
 * @param {function} done a callback to invoke on success or error
 * @return {String[]|Error}
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
PartySchema.statics.getEmails = function getEmails(criteria, done) {
  //refs
  const Party = this;

  //normalize arguments
  const _criteria = _.isFunction(criteria) ? {} : _.merge({}, criteria);
  const _done = _.isFunction(criteria) ? criteria : done;

  Party.find(_criteria)
    .distinct('email')
    .exec(function onGetEmails(error, emails) {
      if (!error) {
        emails = _.uniq(_.compact([].concat(emails)));
      }
      return _done(error, emails);
    });
};

/**
 * @name notify
 * @function notify
 * @description send provide notification to parties
 * @param {Object} notification valid notification payload
 * @param {Party} notification.to valid criteria to find party to notify
 * @param {Object} notification.to valid criteria to find party to notify
 * @param {String} notification.subject valid title for notification
 * @param {String} notification.body valid title for notification
 * @param {Function} done a callback to invoke on success or failure
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PartySchema.statics.notify = function notify(notification, done) {
  // ref
  const Party = this;

  //ensure callback
  const _done = done || function () {};

  // ensure notification
  const _notification = _.merge({ to: {} }, notification);

  // ensure valid notification payload
  const { to, subject, body } = _notification;
  const isValidNotification = !_.isEmpty(subject) || !_.isEmpty(body);
  if (!isValidNotification) {
    let error = new Error('Invalid Notification Payload');
    error.status = 400;
    return _done(error);
  }

  // prepare receivers distinct emails and phones
  const works = {};

  // query receivers phones
  works.phones = function getPartiesPhones(next) {
    const criteria = _.merge({}, to);
    Party.getPhones(criteria, next);
  };

  // query receiver emails
  works.emails = function getPartiesEmails(next) {
    const criteria = _.merge({}, to);
    Party.getEmails(criteria, next);
  };

  // query receivers
  parallel(works, function onGetContacts(error, results) {
    // back off on error
    if (error) {
      return _done(error);
    }

    // collect email addresses
    let { emails } = results;
    emails = _.uniq(_.compact([].concat(emails)));

    // notify
    _.forEach(emails, function (_to) {
      // prepare email payload
      const SMTP_FROM = getString('SMTP_FROM');
      const mail = { sender: SMTP_FROM, to: _to, subject: subject, body: body };

      // queue emails
      const email = new Email(mail);
      email.queue();
    });

    // return
    _done(null, results);
  });
};

/**
 * @name findByJwt
 * @function findByJwt
 * @description find existing party from jwt payload
 * @param {Object} jwt valid jwt payload
 * @param {string} [jwt.id] valid party id
 * @param {function} done a callback to invoke on success or error
 * @return {String[]|Error}
 * @since 0.2.0
 * @version 0.1.0
 * @static
 */
PartySchema.statics.findByJwt = function findByJwt(jwt, done) {
  // refs
  const Party = this;

  // prepare jwt error
  const jwtError = new Error('Invalid Authorization Token');
  jwtError.status = 403;
  jwtError.code = 403;

  // find existing party
  const findPartyById = (next) => {
    if (_.isEmpty(jwt) || _.isEmpty(jwt.id)) {
      return next(jwtError);
    }
    return Party.findById(jwt.id, next);
  };

  // ensure party exists and not blocked
  const verifyParty = (party, next) => {
    if (!party || party.deletedAt) {
      return next(jwtError);
    }
    return next(null, party);
  };

  // execute
  return waterfall([findPartyById, verifyParty], done);
};

/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */

/* use mongoose rest actions */
PartySchema.plugin(irina, {
  registerable: {
    autoConfirm: true,
  },
});
PartySchema.plugin(actions);
PartySchema.plugin(exportable);
PartySchema.plugin(runInBackground);

/* export party model */
module.exports = exports = model(PARTY_MODEL_NAME, PartySchema);
