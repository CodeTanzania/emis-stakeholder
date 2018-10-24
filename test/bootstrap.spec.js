'use strict';

/* force environment to be test */
process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';

/* setup mongoose */
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/* setup */
require('chai').use(require('sinon-chai'));
require('sinon');
require('sinon-mongoose');