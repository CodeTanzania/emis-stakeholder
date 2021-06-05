process.env.JWT_SECRET = 'test';
process.env.JWT_AUDIENCE = 'test';
process.env.JWT_ISSUER = 'test';
process.env.JWT_SUBJECT = 'test';
process.env.PREDEFINE_NAMESPACES =
  'PartyRole,PartyGroup,PartyGender,PartyOwnership,AdministrativeLevel,AdministrativeArea';
process.env.JWT_SECRET = '978+4fsw6_1n63.hs~ns*ma?4!2#@!4';
process.env.JWT_ALGORITHM = 'HS256';
process.env.JWT_AUDIENCE = 'ewea';
process.env.JWT_ISSUER = 'ewea';
process.env.JWT_SUBJECT = 'ewea';
process.env.JWT_EXPIRES_IN = '7 days';
process.env.JWT_API_TOKEN_EXPIRES_IN = '1000y';

/* dependencies */
const { connect, clear, drop } = require('@lykmapipo/mongoose-test-helpers');

/* setup database */
before((done) => connect(done));

/* clear database */
before((done) => clear(done));

/* drop database */
after((done) => drop(done));
