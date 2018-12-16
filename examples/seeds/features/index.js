'use strict';


/* dependencies */
const zones = require('./zones');
const regions = require('./regions');

let features = [].concat(zones).concat(regions);
module.exports = exports = features;
