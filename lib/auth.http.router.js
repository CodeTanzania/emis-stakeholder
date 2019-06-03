'use strict';

/**
 * Application authentication router
 *
 * @version 0.1.0
 * @since 1.5.0
 */

/* dependencies */
const { waterfall } = require('async');
const _ = require('lodash');
const { encode } = require('@lykmapipo/jwt-common');
const { include } = require('@lykmapipo/include');
const { Router } = require('@lykmapipo/express-common');
const { getString } = require('@lykmapipo/env');

/* local constants */
const API_VERSION = getString('API_VERSION', '1.0.0');

/* declarations */
const Party = include(__dirname, 'party.model');
const router = new Router({
  version: API_VERSION,
});

/**
 * @description A route to handle authentication/signin to the application
 *
 * @version 0.1.0
 * @since 1.5.0
 */
router.post('/signin', (request, response, next) => {
  /* prevent invalid sign in credentials */
  if (
    _.isEmpty(request.body) ||
    _.isEmpty(request.body.email) ||
    _.isEmpty(request.body.password)
  ) {
    next(new Error('Invalid signin details'));
  }

  // continue with signin
  else {
    // normalize email
    request.body.email = request.body.email.toLowerCase();

    waterfall(
      [
        function authenticateParty(then) {
          //authenticate active party only
          request.body = _.merge(request.body, {
            deletedAt: {
              $eq: null,
            },
          });

          Party.authenticate(request.body, then);
        },

        // ensure roles & permissions
        function populate(party, then) {
          party.populate('role', then);
        },

        function encodePartyToJWT(party, then) {
          encode({ _id: party._id }, function afterEncode(error, jwtToken) {
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
          error.status = 403;

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

/* expose authentication router */
module.exports = exports = router;
