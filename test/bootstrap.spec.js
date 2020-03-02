'use strict';

process.env.NODE_ENV = 'test';
process.env.DEFAULT_LOCALE = 'en';
process.env.DEFAULT_COUNTRY_CODE = 'TZ';
process.env.PREDEFINE_NAMESPACES = 'PartyRole,PartyGroup,AdministrativeArea';
process.env.JWT_SECRET = '978+4fsw6_1n63.hs~ns*ma?4!2#@!4';
process.env.JWT_ALGORITHM = 'HS256';
process.env.JWT_AUDIENCE = 'ewea';
process.env.JWT_ISSUER = 'ewea';
process.env.JWT_SUBJECT = 'ewea';
process.env.JWT_EXPIRES_IN = '7 days';
process.env.JWT_API_TOKEN_EXPIRES_IN = '1000y';

/* setup */
require('@lykmapipo/mongoose-test-helpers');
