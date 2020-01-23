'use strict';

process.env.JWT_SECRET = 'test';
process.env.JWT_AUDIENCE = 'test';
process.env.JWT_ISSUER = 'test';
process.env.JWT_SUBJECT = 'test';
process.env.PREDEFINE_NAMESPACES = 'PartyRole,PartyGroup,AdministrativeArea';

/* dependencies */
const { connect, clear, drop } = require('@lykmapipo/mongoose-test-helpers');

/* setup database */
before(done => connect(done));

/* clear database */
before(done => clear(done));

/* drop database */
after(done => drop(done));
