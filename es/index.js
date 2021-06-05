import { compact, abbreviate, idOf, normalizeError, mergeObjects, firstValue, areNotEmpty, pkg } from '@lykmapipo/common';
import { getString, getStrings, getStringSet, apiVersion as apiVersion$1 } from '@lykmapipo/env';
import { model, Schema, ObjectId, SCHEMA_OPTIONS, copyInstance, toObjectIds, areSameInstance, connect } from '@lykmapipo/mongoose-common';
import { Router as Router$1, mount } from '@lykmapipo/express-common';
import { refresh, encode, jwtAuth as jwtAuth$1 } from '@lykmapipo/jwt-common';
import { Router, getFor, schemaFor, downloadFor, postFor, getByIdFor, patchFor, putFor, deleteFor, start as start$1 } from '@lykmapipo/express-rest-actions';
import { createModels } from '@lykmapipo/file';
import { permissionRouter } from '@lykmapipo/permission';
export { Permission, permissionRouter } from '@lykmapipo/permission';
import { Predefine, predefineRouter } from '@lykmapipo/predefine';
export { Predefine, predefineRouter } from '@lykmapipo/predefine';
import _, { isEmpty } from 'lodash';
import { parallel, waterfall } from 'async';
import irina from 'irina';
import actions from 'mongoose-rest-actions';
import exportable from '@lykmapipo/mongoose-exportable';
import { plugin } from 'mongoose-kue';
import { Email } from '@lykmapipo/postman';
import { Point } from 'mongoose-geojson-schemas';
import irinaUtils from 'irina/lib/utils';
import { parsePhoneNumber } from '@lykmapipo/phone';

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
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 0.1.0
 * @public
 */

/* constants */
const POPULATION_MAX_DEPTH = 1;
const PARTY_MODEL_NAME = getString('PARTY_MODEL_NAME', 'Party');
const PARTY_COLLECTION_NAME = getString('PARTY_COLLECTION_NAME', 'parties');
const DEFAULT_LOCALE = getString('DEFAULT_LOCALE', 'en');
const LOCALES = getStrings('LOCALES', DEFAULT_LOCALE);
const DEFAULT_PARTY_TYPE = getString('DEFAULT_PARTY_TYPE', 'Focal');
const PARTY_TYPES = getStringSet('PARTY_TYPES', ['Focal', 'Agency']);
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
const OPTION_AUTOPOPULATE_OWNERSHIP = {
  select: {
    'strings.name': 1,
    'strings.abbreviation': 1,
    'strings.description': 1,
  },
  maxDepth: POPULATION_MAX_DEPTH,
};
const OPTION_AUTOPOPULATE_GENDER = {
  select: {
    'strings.name': 1,
    'strings.abbreviation': 1,
    'strings.description': 1,
  },
  maxDepth: POPULATION_MAX_DEPTH,
};
const OPTION_AUTOPOPULATE_AREA_LEVEL = {
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
    'strings.color': 1,
    'strings.code': 1,
    'strings.abbreviation': 1,
    'strings.description': 1,
    'relations.level': 1,
  },
  maxDepth: 2,
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
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
      aggregatable: { unwind: true },
      autopopulate: OPTION_AUTOPOPULATE,
      taggable: true,
    },

    /**
     * @name type
     * @description Human readable type of a party.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
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
      aggregatable: { unwind: true },
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} uppercase - force upper-casing
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
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
     * @see {@link https://en.wikipedia.org/wiki/Locale_(computer_software)}
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} enum - list of acceptable values
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @property {object} fake - fake data generator options
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} required - mark required
     * @property {boolean} index - ensure database index
     * @property {boolean} unique - ensure database unique index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
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
     * @name radio
     * @description Human readable radio call sign used to contact a party.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} uppercase - force upper-casing
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
     * @since 0.1.0
     * @version 0.1.0
     * @instance
     * @example
     * ACME.
     */
    radio: {
      type: String,
      trim: true,
      uppercase: true,
      index: true,
      searchable: true,
      taggable: true,
      exportable: { header: 'Call Sign', order: 4 },
      fake: {
        generator: 'commerce',
        type: 'color',
      },
    },

    /**
     * @name landline
     * @description Primary main-line(or fixed-line) phone number
     * used to contact a party.
     *
     * Used when another party want to direct call the other party.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} lowercase - force lower-casing
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
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
     * @name physicalAddress
     * @description Primary physical address of party office.
     *
     * Used when another party what to physical go or visit the other
     * party office.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {boolean} index - ensure database index
     * @property {boolean} searchable - allow for searching
     * @property {boolean} taggable - allow field use for tagging
     * @property {object} fake - fake data generator options
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
     * @type {object}
     * @property {object} location - geo json point
     * @property {string} location.type - Point
     * @property {number[]} location.coordinates - longitude, latitude pair of
     * the geo point
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
     * @name level
     * @description Administrative level of area of operation.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced model(or collection)
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
     * @since 2.4.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "name": {"en": "Region"}
     * }
     */
    level: {
      type: ObjectId,
      ref: Predefine.MODEL_NAME,
      // required: true,
      index: true,
      exists: true,
      aggregatable: { unwind: true },
      autopopulate: OPTION_AUTOPOPULATE_AREA_LEVEL,
      taggable: true,
      exportable: {
        header: 'Level',
        format: (v) => {
          return v && v.strings && compact([v.strings.name.en]).join(' - ');
        },
        order: 3,
        default: 'NA',
      },
    },

    /**
     * @name area
     * @description Geographical location of a party main office or area of
     * operation.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced model(or collection)
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - auto population(eager loading) options
     * @property {boolean} taggable - allow field use for tagging
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
      aggregatable: { unwind: true },
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
     * @name ownership
     * @description Assignable or given ownership to a party.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - population options
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @since 2.6.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "name": {"en": "Government"}
     * }
     */
    ownership: {
      type: ObjectId,
      ref: Predefine.MODEL_NAME,
      index: true,
      // required: true,
      exists: true,
      aggregatable: { unwind: true },
      autopopulate: OPTION_AUTOPOPULATE_OWNERSHIP,
      taggable: true,
      exportable: {
        header: 'Ownership',
        format: (v) => {
          return v && v.strings && compact([v.strings.name.en]).join(' - ');
        },
        order: 2,
        default: 'NA',
      },
      default: undefined,
    },

    /**
     * @name role
     * @description Assignable or given role to a party.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - population options
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
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
      aggregatable: { unwind: true },
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
     * @name gender
     * @description Assignable or given gender to a party.
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {string} ref - referenced collection
     * @property {boolean} index - ensure database index
     * @property {boolean} exists - ensure ref exists before save
     * @property {object} autopopulate - population options
     * @property {boolean} taggable - allow field use for tagging
     * @property {boolean} default - default value set when none provided
     * @since 2.6.0
     * @version 0.1.0
     * @instance
     * @example
     * {
     *   "name": {"en": "Female"}
     * }
     */
    gender: {
      type: ObjectId,
      ref: Predefine.MODEL_NAME,
      index: true,
      // required: true,
      exists: true,
      aggregatable: { unwind: true },
      autopopulate: OPTION_AUTOPOPULATE_GENDER,
      taggable: true,
      exportable: {
        header: 'Gender',
        format: (v) => {
          return v && v.strings && compact([v.strings.name.en]).join(' - ');
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
     * @type {object}
     * @property {object} type - schema(data) type
     * @property {boolean} trim - force trimming
     * @property {object} fake - fake data generator options
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
 * @function validate
 * @description Party schema pre validation hook
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @private
 */
PartySchema.pre('validate', function onPreValidate(done) {
  return this.preValidate(done);
});

/*
 *------------------------------------------------------------------------------
 *  Instance
 *------------------------------------------------------------------------------
 */

/**
 * @name preValidate
 * @function preValidate
 * @description Party schema pre validation hook logic
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PartySchema.methods.preValidate = function preValidate(done) {
  // ensure party abbreviation
  this.abbreviation = _.trim(this.abbreviation) || abbreviate(this.name);

  // extend party with default password
  // TODO: use hashed password
  if (_.isEmpty(this.password)) {
    this.password = DEFAULT_PASSWORD;
  }

  // ensure area level
  const level = _.get(this, 'area.relations.level');
  if (!this.level && level) {
    this.level = level;
  }

  // ensure ownership
  const ownership = _.get(this, 'party.ownership');
  if (!this.ownership && ownership) {
    this.ownership = ownership;
  }

  // ensure centre
  if (!this.centre && this.area && this.area.geos) {
    this.centre = this.area.geos.point;
  }

  // generate api token
  return this.generateToken(done);

  // TODO: set default group
  // TODO: set default level
  // TODO: set default area
  // TODO: set default ownership
  // TODO: set default role
  // TODO: set default gender
  // TODO: extract relations from parent if its (agency)
};

/**
 * @name generateToken
 * @function generateToken
 * @description Generate party api token
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} valid instance or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PartySchema.methods.generateToken = function generateToken(done) {
  // refs
  const party = this;

  const expiresIn = getString('JWT_API_TOKEN_EXPIRES_IN', '1000y');
  const payload = { id: idOf(party) };
  const { token } = party;

  return refresh(token, payload, { expiresIn }, (error, jwtToken) => {
    if (error || !jwtToken) {
      const failed = normalizeError(
        error || new Error('Fail To Generate API Token'),
        { status: 500 }
      );
      return done(failed);
    }
    party.token = jwtToken;
    return done(null, party);
  });
};

/**
 * @name asContact
 * @function asContact
 * @description Convert party to contact
 * @returns {object|Error} valid instance or error
 * @author lally elias <lallyelias87@gmail.com>
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
 * @description Prepare party seeding upsert criteria
 * @param {object} seed plain object party seed
 * @returns {object} criteria used to upsert party
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.5.0
 * @version 0.1.0
 * @public
 */
PartySchema.statics.prepareSeedCriteria = (seed) => {
  const copyOfSeed = copyInstance(seed);

  const criteria = idOf(copyOfSeed)
    ? _.pick(copyOfSeed, '_id')
    : _.pick(copyOfSeed, 'name', 'email', 'mobile');

  return criteria;
};

/**
 * @name fetchContacts
 * @function fetchContacts
 * @description Obtain parties contacts based on specified criteria
 * @param {object} [criteria] valid query criteria
 * @param {Function} done a callback to invoke on success or error
 * @returns {object[] | Error} distinct contacts or error
 * @since 1.9.0
 * @version 1.0.0
 * @static
 */
PartySchema.statics.fetchContacts = function fetchContacts(criteria, done) {
  // refs
  const Party = this;

  // normalize arguments
  let conditions = _.isFunction(criteria) ? {} : _.merge({}, criteria);
  const cb = _.isFunction(criteria) ? criteria : done;

  // cast conditions
  conditions = Party.where(conditions).cast(Party);

  // execute fetch query
  return Party.find(conditions)
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
 * @param {object} [criteria] valid query criteria
 * @param {Function} done a callback to invoke on success or error
 * @returns {object[] | Error} distinct phones or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
PartySchema.statics.getPhones = function getPhones(criteria, done) {
  // refs
  const Party = this;

  // normalize arguments
  const copyOfcriteria = _.isFunction(criteria) ? {} : _.merge({}, criteria);
  const cb = _.isFunction(criteria) ? criteria : done;

  return Party.find(copyOfcriteria)
    .distinct('mobile')
    .exec(function onGetPhones(error, phones) {
      if (error) {
        return cb(error);
      }
      const copyOfPhones = _.uniq(_.compact([].concat(phones)));
      return cb(null, copyOfPhones);
    });
};

/**
 * @name getEmails
 * @function getEmails
 * @description pull distinct party emails
 * @param {object} [criteria] valid query criteria
 * @param {Function} done a callback to invoke on success or error
 * @returns {object[] | Error} distinct emails or error
 * @since 0.1.0
 * @version 1.0.0
 * @static
 */
PartySchema.statics.getEmails = function getEmails(criteria, done) {
  // refs
  const Party = this;

  // normalize arguments
  const copyOfcriteria = _.isFunction(criteria) ? {} : _.merge({}, criteria);
  const cb = _.isFunction(criteria) ? criteria : done;

  return Party.find(copyOfcriteria)
    .distinct('email')
    .exec(function onGetEmails(error, emails) {
      if (error) {
        return cb(error);
      }
      const copyOfEmails = _.uniq(_.compact([].concat(emails)));
      return cb(null, copyOfEmails);
    });
};

/**
 * @name notify
 * @function notify
 * @description send provide notification to parties
 * @param {object} notification valid notification payload
 * @param {Party} notification.to valid criteria to find party to notify
 * @param {string} notification.subject valid title for notification
 * @param {string} notification.body valid title for notification
 * @param {Function} done a callback to invoke on success or failure
 * @returns {object | Error} valid emails and phones or error
 * @since 0.1.0
 * @version 0.1.0
 * @instance
 */
PartySchema.statics.notify = function notify(notification, done) {
  // ref
  const Party = this;

  // ensure callback
  const cb = done || function noop() {};

  // ensure notification
  const copyOfNotification = _.merge({ to: {} }, notification);

  // ensure valid notification payload
  const { to, subject, body } = copyOfNotification;
  const isValidNotification = !_.isEmpty(subject) || !_.isEmpty(body);
  if (!isValidNotification) {
    const error = new Error('Invalid Notification Payload');
    error.status = 400;
    return cb(error);
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
  return parallel(works, function onGetContacts(error, results) {
    // back off on error
    if (error) {
      return cb(error);
    }

    // collect email addresses
    let { emails } = results;
    emails = _.uniq(_.compact([].concat(emails)));

    // notify
    _.forEach(emails, function queueNotification(_to) {
      // prepare email payload
      const SMTP_FROM = getString('SMTP_FROM');
      const mail = { sender: SMTP_FROM, to: _to, subject, body };

      // queue emails
      const email = new Email(mail);
      email.queue();
    });

    // return
    return cb(null, results);
  });
};

/**
 * @name findByJwt
 * @function findByJwt
 * @description find existing party from jwt payload
 * @param {object} jwt valid jwt payload
 * @param {string} [jwt.id] valid party id
 * @param {Function} done a callback to invoke on success or error
 * @returns {object | Error} valid party
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

/**
 * @name findDistinctAreas
 * @function findDistinctAreas
 * @description find distict areas from parties areas
 * @param {Function} done a callback to invoke on success or error
 * @returns {object[] | Error} distinct areas or error
 * @since 2.3.0
 * @version 0.1.0
 * @static
 */
PartySchema.statics.findDistinctAreas = function findDistinctAreas(done) {
  // refs
  const Party = this;

  // find distinct areas
  return Party.find()
    .setOptions({ autopopulate: false })
    .select({ area: 1 })
    .distinct('area')
    .lean()
    .exec(function onFindAreas(error, areas) {
      return done(error, areas);
    });
};

/**
 * @name findDistinctRoles
 * @function findDistinctRoles
 * @description find distict roles from parties roles
 * @param {Function} done a callback to invoke on success or error
 * @returns {object[] | Error} distinct roles or error
 * @since 2.3.0
 * @version 0.1.0
 * @static
 */
PartySchema.statics.findDistinctRoles = function findDistinctRoles(done) {
  // refs
  const Party = this;

  // find distinct roles
  return Party.find()
    .setOptions({ autopopulate: false })
    .select({ role: 1 })
    .distinct('role')
    .lean()
    .exec(function onFindRoles(error, roles) {
      return done(error, roles);
    });
};

/**
 * @name findDistinctGroups
 * @function findDistinctGroups
 * @description find distict groups from parties groups
 * @param {Function} done a callback to invoke on success or error
 * @returns {object[] | Error} distinct groups or error
 * @since 2.3.0
 * @version 0.1.0
 * @static
 */
PartySchema.statics.findDistinctGroups = function findDistinctGroups(done) {
  // refs
  const Party = this;

  // find distinct groups
  return Party.find()
    .setOptions({ autopopulate: false })
    .select({ group: 1 })
    .distinct('group')
    .lean()
    .exec(function onFindGroups(error, groups) {
      return done(error, groups);
    });
};

/**
 * @name findDistincts
 * @function findDistincts
 * @description find distict areas, roles and groups from parties
 * @param {Function} done a callback to invoke on success or error
 * @returns {object | Error} distict distict areas, roles and groups or error
 * @since 2.3.0
 * @version 0.1.0
 * @static
 */
PartySchema.statics.findDistincts = function findDistincts(done) {
  // refs
  const Party = this;

  // find distinct areas, roles & groups
  return parallel(
    {
      areas: (next) => Party.findDistinctAreas(next),
      roles: (next) => Party.findDistinctRoles(next),
      groups: (next) => Party.findDistinctGroups(next),
    },
    done
  );
};

/**
 * @name findChildren
 * @function findChildren
 * @description Find party children recursively using given criteria
 * @param {object} criteria valid parent query options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found parties or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 2.5.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const criteria = { _id: ... };
 * Party.findChildren(criteria, (error, results) => { ... });
 * // => [ Party{ ... }, ... ]
 */
PartySchema.statics.findChildren = function findChildren(criteria, done) {
  // TODO: use $graphLookUp

  // ref
  const Party = this;
  let results = [];

  // collect results
  const collectResults = (...updates) => {
    let collected = _.uniq([...results, ...updates]);
    collected = _.uniqWith(collected, areSameInstance);
    return collected;
  };

  // find children by their parents
  const findKids = (conditions, next) => {
    // prepare query
    const query = Party.find(conditions).setOptions({
      autopopulate: false,
    });

    // execute query
    return query.exec((error, children) => {
      // back-off on error
      if (error) {
        return next(error);
      }

      // continue find children
      if (!_.isEmpty(children)) {
        results = collectResults(...children);
        const parentIds = _.uniq(toObjectIds(...children));
        if (_.isEmpty(parentIds)) {
          return next(null, results);
        }
        return findKids({ party: { $in: parentIds } }, next);
      }

      // continue
      return next(null, results);
    });
  };

  // do find recursively
  return findKids(criteria, done);
};

/**
 * @name findParents
 * @function findParents
 * @description Find party parent recursively using given criteria
 * @param {object} criteria valid child query options
 * @param {Function} done callback to invoke on success or error
 * @returns {object|Error} found parties or error
 * @author lally elias <lallyelias87@gmail.com>
 * @since 2.5.0
 * @version 0.1.0
 * @static
 * @example
 *
 * const criteria = { _id: ... };
 * Party.findParents(criteria, (error, results) => { ... });
 * // => [ Party{ ... }, ... ]
 */
PartySchema.statics.findParents = function findParents(criteria, done) {
  // TODO: use $graphLookUp

  // ref
  const Party = this;
  let results = [];

  // collect results
  const collectResults = (...updates) => {
    let collected = _.uniq([...results, ...updates]);
    collected = _.uniqWith(collected, areSameInstance);
    return collected;
  };

  // find parent by her children
  const findAncestors = (conditions, next) => {
    // prepare query
    const query = Party.find(conditions).setOptions({
      autopopulate: false,
    });

    // execute query
    return query.exec((error, ancestors) => {
      // back-off on error
      if (error) {
        return next(error);
      }

      // continue find parent
      if (!_.isEmpty(ancestors)) {
        results = collectResults(...ancestors);
        const ancestorIds = _.uniq(_.map(ancestors, 'party'));
        const parentIds = _.uniq(toObjectIds(...ancestorIds));
        if (_.isEmpty(parentIds)) {
          return next(null, results);
        }
        return findAncestors({ _id: { $in: parentIds } }, next);
      }

      // continue
      return next(null, results);
    });
  };

  // do find recursively
  return findAncestors(criteria, done);
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
PartySchema.plugin(plugin);

/* export party model */
var Party = model(PARTY_MODEL_NAME, PartySchema);

/**
 * @name ensurePassword
 * @description Set plain password on party details
 * @param {object} party valid party details
 * @returns {object} party with plain password
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 3.0.0
 * @version 1.0.0
 * @public
 */

const ensurePassword$1 = (party = {}) => {
  const defaultPassword = getString('DEFAULT_PASSWORD', '123456789');
  const password = firstValue(defaultPassword, party.password);
  const partyWithPassword = mergeObjects(party, { password });
  return partyWithPassword;
};

/**
 * @name encryptPassword
 * @description Encrypt party plain password
 * @param {object} party valid party details
 * @param {Function} done callback to invoke on success or failure
 * @returns {object} party with hashed password
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 3.0.0
 * @version 1.0.0
 * @public
 */
const encryptPassword$1 = (party = {}, done) => {
  const localParty = mergeObjects(party);
  if (!isEmpty(localParty.password)) {
    return irinaUtils.hash(localParty.password, 10, (error, hash) => {
      localParty.password = hash;
      return done(error, localParty);
    });
  }
  return done(null, localParty);
};

/**
 * @name ensurePassword
 * @description Ensure party password
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const ensurePassword = (request, response, next) => {
  if (!isEmpty(request.body)) {
    request.body = ensurePassword$1(request.body);
    return next();
  }
  return next();
};

/**
 * @name encryptPassword
 * @description Encrypt party plain password
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const encryptPassword = (request, response, next) => {
  if (areNotEmpty(request.body, request.password)) {
    return encryptPassword$1(request.body, (error, party) => {
      if (error) {
        return next(error);
      }
      request.body = party;
      return next();
    });
  }
  return next();
};

/* constants */
const API_VERSION$1 = getString('API_VERSION', '1.0.0');
const PATH_SINGLE = '/parties/:id';
const PATH_LIST = '/parties';
const PATH_CHILDREN = '/parties/:party/parties';
const PATH_SCHEMA = '/parties/schema';
const PATH_EXPORT = '/parties/export';
const PATH_NOTIFICATION = '/notifications';

/**
 * @name PartyHttpRouter
 * @namespace PartyHttpRouter
 * @description A representation of an entity (e.g municipal, individual,
 * agency, organization etc) consisting of contact information (e.g. name,
 * e-mail addresses, phone numbers) and other descriptive information of
 * interest in emergency(or disaster) management.
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
const router$1 = new Router({
  version: API_VERSION$1,
});

/**
 * @name GetParties
 * @memberof PartyHttpRouter
 * @description Returns a list of parties
 */
router$1.get(
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
router$1.get(
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
router$1.get(
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
router$1.post(
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
router$1.get(
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
router$1.patch(
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
router$1.put(
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
router$1.delete(
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
router$1.get(
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
 * @example
 *
 * POST /notifications
 */
router$1.post(
  PATH_NOTIFICATION,
  postFor({
    post: (body, done) => Party.notify(body, done),
  })
);

/* constants */
const API_VERSION = getString('API_VERSION', '1.0.0');

const router = new Router$1({
  version: API_VERSION,
});

/**
 * @description A route to handle authentication/signin to the application
 * @version 0.2.0
 * @since 1.5.0
 */
router.post('/signin', (request, response, next) => {
  /* prevent invalid sign in credentials */
  if (
    _.isEmpty(request.body) ||
    _.isEmpty(request.body.username) ||
    _.isEmpty(request.body.password)
  ) {
    next(new Error('Invalid signin details'));
  }

  // continue with signin
  else {
    // normalize credentials
    const { username } = _.merge({}, request.body);
    const email = username.toLowerCase();
    const parsedPhoneNumber = parsePhoneNumber(username);
    let phone;

    // check if phone number was parsed
    if (parsedPhoneNumber) {
      phone = parsedPhoneNumber.e164NoPlus;
    }

    const credentials = {
      $or: [{ email }, { mobile: phone || username }],
      deletedAt: {
        $eq: null,
      },
      password: request.body.password,
    };

    waterfall(
      [
        function authenticateParty(then) {
          // authenticate active party only
          Party.authenticate(credentials, then);
        },

        // ensure roles & permissions
        function populate(party, then) {
          party.populate('role', then);
        },

        function encodePartyToJWT(party, then) {
          encode({ id: idOf(party) }, function afterEncode(error, jwtToken) {
            if (error) {
              then(error);
            } else {
              then(null, {
                party: _.merge(party.toJSON()),
                token: jwtToken,
              });
            }
          });
        },
      ],
      function done(error, result) {
        // fail to authenticate party
        // return error message
        if (error) {
          // Set forbidden status code
          normalizeError({ status: 403 });
          next(error);
        }

        // party authenticated successfully
        // token generated successfully
        else {
          response.ok({
            success: true,
            party: result.party,
            token: result.token,
          });
        }
      }
    );
  }
});

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

/**
 * @name info
 * @description package information
 * @type {object}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 1.0.0
 * @version 0.1.0
 */
const info = pkg(
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
 * @name apiVersion
 * @description http router api version
 * @type {string}
 * @author lally elias <lallyelias87@gmail.com>
 * @since 0.1.0
 * @version 0.1.0
 */
const apiVersion = apiVersion$1();

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
const fetchContacts = (criteria, done) => {
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
const jwtAuth = [
  jwtAuth$1({ user: (jwt, done) => Party.findByJwt(jwt, done) }),
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
const start = (done) => {
  // connect mongodb
  connect((error) => {
    // back-off on connect error
    if (error) {
      return done(error);
    }

    // ensure file models
    createModels();

    // mount http routers
    mount(router);
    mount(permissionRouter);
    mount(predefineRouter);
    mount(router$1);

    // start http server
    return start$1(done);
  });
};

export { Party, apiVersion, router as authenticationRouter, fetchContacts, info, jwtAuth, router$1 as partyRouter, start };
