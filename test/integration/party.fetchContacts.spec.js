'use strict';

/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { clear, create } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('@codetanzania/emis-role');
const { Feature } = require('@codetanzania/emis-feature');
const { Party, fetchContacts } = require('../..');

describe.only('Fetch Contacts', () => {
  let role = Role.fake();
  let location = Feature.fake();
  let parties = Party.fake(5);

  before(done => clear(done));

  before(done =>
    create(role, location, (error, created) => {
      _.forEach(parties, party => {
        party.role = created[0];
        party.location = created[1];
      });
      done(error, created);
    })
  );

  before(done => create(...parties, done));

  it('should fetch contacts without criteria', done => {
    expect(Party.fetchContacts).to.not.exist;
    done();
  });

  it('should fetch contacts with criteria', done => {
    expect(Party.fetchContacts).to.not.exist;
    done();
  });

  it('should expose fetch contacts', done => {
    expect(fetchContacts).to.not.exist;
    done();
  });

  after(done => clear(done));
});
