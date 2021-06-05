import { isEmpty } from 'lodash';
import { firstValue, mergeObjects } from '@lykmapipo/common';
import { getString } from '@lykmapipo/env';
import irinaUtils from 'irina/lib/utils';

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

export const ensurePassword = (party = {}) => {
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
export const encryptPassword = (party = {}, done) => {
  const localParty = mergeObjects(party);
  if (!isEmpty(localParty.password)) {
    return irinaUtils.hash(localParty.password, 10, (error, hash) => {
      localParty.password = hash;
      return done(error, localParty);
    });
  }
  return done(null, localParty);
};
