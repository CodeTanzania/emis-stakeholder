'use strict';


/* dependencies */
const regions = require('./regions');
const districts = require('./districts');
const wards = require('./wards');

module.exports = exports = [...regions, ...districts, ...wards];
