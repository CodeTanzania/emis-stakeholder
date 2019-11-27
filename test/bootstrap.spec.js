'use strict';

process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';
process.env.DEFAULT_COUNTRY_CODE = 'TZ';
process.env.PREDEFINE_NAMESPACES = 'PartyRole,PartyGroup,AdministrativeArea';

/* setup */
require('@lykmapipo/mongoose-test-helpers');
