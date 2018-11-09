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
const path = require('path');
const _ = require('lodash');
const async = require('async');
const moment = require('moment-timezone');
const mongoose = require('mongoose-valid8');
const actions = require('mongoose-rest-actions');
const { plugin: runInBackground } = require('mongoose-kue');
const { Email } = require('@lykmapipo/postman');
const { Point } = require('mongoose-geojson-schemas');
const { getString, getStrings } = require('@lykmapipo/env');
const { Role } = require('@codetanzania/emis-role');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;


/* constants */
const POPULATION_MAX_DEPTH = 1;
const PARTY_MODEL_NAME = getString('PARTY_MODEL_NAME', 'Party');
const PARTY_COLLECTION_NAME = getString('PARTY_COLLECTION_NAME', 'parties');
const DEFAULT_TIMEZONE = getString('DEFAULT_TIMEZONE', moment.tz.guess());
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const DEFAULT_PARTY_TYPE = getString('DEFAULT_PARTY_TYPE', 'Other');
const LOCALES = getStrings('LOCALES', DEFAULT_LOCALE);
const TIMEZONES = getStrings('TIMEZONES', moment.tz.names());
const PARTY_TYPES = getStrings('PARTY_TYPES', DEFAULT_PARTY_TYPE);
const DEFAULT_DISASTER_PHASE = getString('DEFAULT_DISASTER_PHASE', 'Mitigation');
const DISASTER_PHASES = getStrings('DISASTER_PHASES', DEFAULT_DISASTER_PHASE);
const PARTY_SEED = getString('PARTY_SEED', 'parties');
const SMTP_FROM = getString('SMTP_FROM');
const SCHEMA_OPTIONS = ({
  timestamps: true,
  emitIndexErrors: true,
  collection: PARTY_COLLECTION_NAME
});
const OPTION_ROLE_AUTOPOPULATE = ({
  select: { name: 1, description: 1 },
  maxDepth: POPULATION_MAX_DEPTH
});
const OPTION_AUTOPOPULATE = ({
  select: {
    type: 1,
    name: 1,
    title: 1,
    email: 1,
    mobile: 1,
    locale: 1,
    timezone: 1
  },
  maxDepth: POPULATION_MAX_DEPTH
});


/**
 * @name PartySchema
 * @type {Schema}
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
const PartySchema = new Schema({
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
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - auto population(eager loading) options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * {
   *   _id: "5bcda2c073dd0700048fb846",
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
    exists: true,
    autopopulate: OPTION_AUTOPOPULATE,
    index: true
  },


  /**
   * @name type
   * @description Human readable type of a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Sector, Agency, Individual etc.
   */
  type: {
    type: String,
    trim: true,
    enum: PARTY_TYPES,
    searchable: true,
    fake: true,
    index: true
  },


  /**
   * @name phases
   * @description Participatory phases of a party in disaster management.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} enum - list of acceptable values
   * @property {object} default - default value if non provided
   * @property {boolean} searchable - allow for searching
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  phases: {
    type: [String],
    enum: DISASTER_PHASES,
    default: undefined,
    searchable: true,
    fake: true,
    index: true
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
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
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
    searchable: true,
    fake: {
      generator: 'name',
      type: 'findName'
    },
    index: true
  },


  /**
   * @name nickname
   * @description Human readable alternative or well known name of a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * ACME.
   */
  nickname: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'name',
      type: 'firstName'
    },
    index: true
  },


  /**
   * @name abbreviation
   * @description Human readable short form of a party name.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} uppercase - force upper-casing
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
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
    searchable: true,
    fake: {
      generator: 'hacker',
      type: 'abbreviation'
    },
    index: true
  },


  /**
   * @name title
   * @description Human readable profession, occupation or job title of a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * ACME.
   */
  title: {
    type: String,
    trim: true,
    startcase: true,
    searchable: true,
    fake: {
      generator: 'name',
      type: 'jobTitle'
    },
    index: true
  },


  /**
   * @name about
   * @description A brief summary about a party if available i.e
   * additional details that clarify what a party do.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Et est molestias vero dignissimos quod rerum.
   */
  about: {
    type: String,
    trim: true,
    searchable: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph'
    },
    index: true
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
   * @property {boolean} searchable - allow for searching
   * @property {boolean} index - ensure database index
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * en, sw etc.
   */
  locale: {
    type: String,
    trim: true,
    enum: LOCALES,
    searchable: true,
    index: true,
    fake: true
  },


  /**
   * @name timezone
   * @description Defines timezone of a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} enum - list of acceptable values
   * @property {boolean} searchable - allow for searching
   * @property {boolean} index - ensure database index
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * Africa/Dar_es_Salaam
   */
  timezone: {
    type: String,
    trim: true,
    enum: TIMEZONES,
    searchable: true,
    index: true,
    fake: true
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
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure database unique index
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
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'email'
    },
    index: true,
    unique: true
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
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
   * @property {boolean} unique - ensure database unique index
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
    // mobile: true,
    // e164: true,
    searchable: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    },
    index: true,
    unique: true
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
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
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
    searchable: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    },
    index: true
  },


  /**
   * @name fax
   * @description Primary fax number used to contact a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
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
    searchable: true,
    fake: {
      generator: 'phone',
      type: 'phoneNumber'
    },
    index: true
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
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
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
    searchable: true,
    fake: {
      generator: 'internet',
      type: 'url'
    },
    index: true
  },


  /**
   * @name avatar
   * @description Image(logo, face or emblem) of a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {boolean} trim - force trimming
   * @property {object} fake - fake data generator options
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * https://s3.amazonaws.com/uifaces/faces/twitter/agustincruiz/128.jpg
   */
  avatar: {
    type: String,
    trim: true,
    // url: true,
    fake: {
      generator: 'image',
      type: 'avatar'
    }
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
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
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
    searchable: true,
    fake: {
      generator: 'address',
      type: 'streetAddress'
    },
    index: true
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
   * @property {boolean} searchable - allow for searching
   * @property {object} fake - fake data generator options
   * @property {boolean} index - ensure database index
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
    searchable: true,
    fake: {
      generator: 'address',
      type: 'streetAddress'
    },
    index: true
  },


  /**
   * @name location
   * @description A geo-location coordinates of a party main office.
   *
   * Its a coordinates(longitude and latidude) pair of office reachable by
   * other party.
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
  location: Point,


  /**
   * @name role
   * @description Assignable or given role to a party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {object} default - default value if non provided
   * @property {boolean} exists - ensure ref exists before save
   * @property {object} autopopulate - population options
   * @property {boolean} index - ensure database index
   *
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   */
  role: {
    type: ObjectId,
    ref: Role.MODEL_NAME,
    default: undefined,
    // required: true,
    index: true,
    exists: true,
    autopopulate: OPTION_ROLE_AUTOPOPULATE
  },


  /**
   * @name members
   * @description List of parties belongs to this party.
   *
   * @type {object}
   * @property {object} type - schema(data) type
   * @property {string} ref - referenced collection
   * @property {object} default - default value if non provided
   * @property {boolean} exists - ensure ref exists before save
   * @property {boolean} index - ensure database index
   * @property {object} autopopulate - members population options
   * select when populating
   *
   * @author lally elias <lallyelias87@gmail.com>
   * @since 0.1.0
   * @version 0.1.0
   * @instance
   * @example
   * [{
   *   _id: "5bcda2c073dd0700048fb846",
   *   name: "Bedfordshire",
   *   phone: "+255715463739",
   *   landline: "(886) 804-4219",
   *   fax: "1-807-746-5438",
   *   email: "zj.aj@ojwj.com",
   * }]
   */
  members: {
    type: [ObjectId],
    ref: PARTY_MODEL_NAME,
    default: undefined,
    index: true,
    exists: true,
    autopopulate: OPTION_AUTOPOPULATE
  }

}, SCHEMA_OPTIONS);


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

  //ensure party type
  if (_.isEmpty(this.type) && !_.isEmpty(DEFAULT_PARTY_TYPE)) {
    this.type = DEFAULT_PARTY_TYPE;
  }

  //ensure party locale
  if (_.isEmpty(this.locale) && !_.isEmpty(DEFAULT_LOCALE)) {
    this.locale = DEFAULT_LOCALE;
  }

  //ensure party timezone
  if (_.isEmpty(this.timezone) && !_.isEmpty(DEFAULT_TIMEZONE)) {
    this.timezone = DEFAULT_TIMEZONE;
  }

  //ensure default phases
  if (_.isEmpty(this.phases)) {
    this.phases = [].concat(DEFAULT_DISASTER_PHASE);
  }

  //continue
  done();

};


/*
 *------------------------------------------------------------------------------
 * Statics
 *------------------------------------------------------------------------------
 */


/* static constants */
PartySchema.statics.MODEL_NAME = PARTY_MODEL_NAME;
PartySchema.statics.COLLECTION_NAME = PARTY_COLLECTION_NAME;

PartySchema.statics.DEFAULT_LOCALE = DEFAULT_LOCALE;
PartySchema.statics.LOCALES = LOCALES;

PartySchema.statics.DEFAULT_PARTY_TYPE = DEFAULT_PARTY_TYPE;
PartySchema.statics.PARTY_TYPES = PARTY_TYPES;

PartySchema.statics.DEFAULT_TIMEZONE = DEFAULT_TIMEZONE;
PartySchema.statics.TIMEZONES = TIMEZONES;

PartySchema.statics.DEFAULT_DISASTER_PHASE = DEFAULT_DISASTER_PHASE;
PartySchema.statics.DISASTER_PHASES = DISASTER_PHASES;


/**
 * @name upsert
 * @function upsert
 * @description create or update existing party
 * @param {Object} party valid party details
 * @param {Function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.2
 * @version 0.1.0
 * @public
 */
PartySchema.statics.upsert = function upsert(party, done) {

  //normalize arguments
  let _party = (
    _.isFunction(party.toObject) ?
    party.toObject() :
    party
  );

  //refs
  const Party = this;

  // prepare upsert
  async.waterfall([

    function findExistingParty(next) {
      // prepare criteria by _id or fields
      let criteria = _.merge({}, _party);
      criteria = (
        criteria._id ?
        _.pick(criteria, '_id') :
        _.pick(criteria, 'name', 'email', 'mobile')
      );
      Party.findOne(criteria, next);
    },

    function upsertParty(found, next) {
      // instantiate if not found
      if (!found) {
        found = new Party(_party);
      }

      // prepare updates
      _party = _.merge({}, _party, found.toObject());

      // do upsert
      found.updatedAt = new Date();
      found.put(_party, next);
    }
  ], done);
};


/**
 * @name seed
 * @function seed
 * @description seed parties into database, on duplicate existing wins
 * on merging.
 * @param {Party[]} [parties] set of party(s) to seed
 * @param {Function} done callback to invoke on success or error
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.2
 * @version 0.1.0
 * @public
 */
PartySchema.statics.seed = function seed(seeds, done) {

  // normalize arguments
  let _seeds = _.isFunction(seeds) ? [] : [].concat(seeds);
  const _done = _.isFunction(seeds) ? seeds : done;

  // refs
  const Party = this;

  // init parties collection
  let parties = [];

  // try load seeds from environment
  const BASE_PATH = getString('BASE_PATH', process.cwd());
  const SEEDS_PATH = getString('SEEDS_PATH', path.join(BASE_PATH, 'seeds'));
  const SEED_PATH = path.join(SEEDS_PATH, PARTY_SEED);
  try {
    const seed = require(SEED_PATH);
    _seeds = [].concat(_seeds).concat(seed);
  } catch (e) { /* ignore */ }

  // collect unique incident type from seeds
  _seeds = _.compact(_seeds);
  _seeds = _.uniqWith(_seeds, _.isEqual);

  // upsert parties
  parties = _.map([].concat(_seeds), function (party) {
    return function upsertParties(next) {
      Party.upsert(party, next);
    };
  });

  // seed parties
  async.parallel(parties, _done);

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

  Party
    .find(_criteria)
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

  Party
    .find(_criteria)
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
  const isValidNotification =
    (!_.isEmpty(subject) || !_.isEmpty(body));
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
  async.parallel(works, function onGetContacts(error, results) {

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
      const mail =
        ({ sender: SMTP_FROM, to: _to, subject: subject, body: body });

      // queue emails
      const email = new Email(mail);
      email.queue();

    });

    // return
    _done(null, results);

  });

};



/*
 *------------------------------------------------------------------------------
 * Plugins
 *------------------------------------------------------------------------------
 */


/* use mongoose rest actions*/
PartySchema.plugin(actions);
PartySchema.plugin(runInBackground);


/* export party model */
module.exports = mongoose.model(PARTY_MODEL_NAME, PartySchema);
