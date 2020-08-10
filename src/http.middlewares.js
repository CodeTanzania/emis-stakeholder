import { isEmpty } from 'lodash';
import { areNotEmpty } from '@lykmapipo/common';
import {
  ensurePassword as ensureDefaultPassword,
  encryptPassword as hashPassword,
} from './internals';

/**
 * @name ensurePassword
 * @description Ensure party password
 *
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
export const ensurePassword = (request, response, next) => {
  if (!isEmpty(request.body)) {
    request.body = ensureDefaultPassword(request.body);
    return next();
  }
  return next();
};

/**
 * @name encryptPassword
 * @description Encrypt party plain password
 *
 * @param {object} request valid http request
 * @param {object} response valid http response
 * @param {Function} next next middlware to invoke
 * @returns {Function} next middlware to invoke
 *
 * @author lally elias <lallyelias87@gmail.com>
 * @license MIT
 * @since 0.1.0
 * @version 1.0.0
 * @public
 */
export const encryptPassword = (request, response, next) => {
  if (areNotEmpty(request.body, request.password)) {
    return hashPassword(request.body, (error, party) => {
      if (error) {
        return next(error);
      }
      request.body = party;
      return next();
    });
  }
  return next();
};
