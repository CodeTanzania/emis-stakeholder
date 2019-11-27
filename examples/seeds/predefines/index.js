'use strict';

/* dependencies */
const areas = require('./administrativeareas');
const groups = require('./partygroups');
const roles = require('./partyroles');

module.exports = exports = [...areas, ...groups, ...roles];
