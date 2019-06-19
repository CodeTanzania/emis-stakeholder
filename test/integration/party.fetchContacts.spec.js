'use strict';

/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { clear, create } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('@codetanzania/emis-role');
const { Feature } = require('@codetanzania/emis-feature');
const { Party, fetchContacts } = require('../..');

describe('Fetch Contacts', () => {
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
    expect(Party.fetchContacts).to.exist;
    Party.fetchContacts((error, contacts) => {
      expect(error).to.not.exist;
      expect(contacts).to.exist.and.have.length(parties.length);
      done(error, contacts);
    });
  });

  it('should fetch contacts with criteria', done => {
    expect(Party.fetchContacts).to.exist;
    const ids = _.map(_.sampleSize(parties, 2), '_id');
    const criteria = { _id: { $in: ids } };
    Party.fetchContacts(criteria, (error, contacts) => {
      expect(error).to.not.exist;
      expect(contacts).to.exist.and.have.length(ids.length);
      done(error, contacts);
    });
  });

  it('should use exposed fetch contacts without criteria', done => {
    expect(fetchContacts).to.exist;
    fetchContacts((error, contacts) => {
      expect(error).to.not.exist;
      expect(contacts).to.exist.and.have.length(parties.length);
      done(error, contacts);
    });
  });

  it('should use exposed fetch contacts with criteria', done => {
    expect(fetchContacts).to.exist;
    const ids = _.map(_.sampleSize(parties, 2), '_id');
    const criteria = { _id: { $in: ids } };
    fetchContacts(criteria, (error, contacts) => {
      expect(error).to.not.exist;
      expect(contacts).to.exist.and.have.length(ids.length);
      done(error, contacts);
    });
  });

  after(done => clear(done));
});
