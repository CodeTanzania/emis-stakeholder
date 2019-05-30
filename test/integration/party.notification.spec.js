'use strict';

/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('@codetanzania/emis-role');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = include(__dirname, '..', '..');

describe('Party Notification', () => {
  let role = Role.fake();
  let location = Feature.fake();
  let parties = Party.fake(10);

  before(done => clear(done));

  before(done => {
    role.post((error, created) => {
      role = created;
      parties = _.map(parties, party => {
        party.role = created;
        return party;
      });
      done(error, created);
    });
  });

  before(done => {
    location.post((error, created) => {
      location = created;
      parties = _.map(parties, party => {
        party.location = created;
        return party;
      });
      done(error, created);
    });
  });

  before(done => {
    Party.seed(parties, (error, created) => {
      parties = created;
      done(error, created);
    });
  });

  it('should be able get distinct phones', done => {
    Party.getPhones((error, phones) => {
      expect(error).to.not.exist;
      expect(phones).to.exist;
      expect(phones).to.be.have.length.at.least(1);
      done(error, phones);
    });
  });

  it('should be able get distinct phones by criteria', done => {
    const ids = _.map(_.take(parties, 2), '_id');
    const criteria = { _id: { $in: ids } };
    Party.getPhones(criteria, (error, phones) => {
      expect(error).to.not.exist;
      expect(phones).to.exist;
      expect(phones).to.be.have.length(2);
      done(error, phones);
    });
  });

  it('should be able get distinct emails', done => {
    Party.getPhones((error, emails) => {
      expect(error).to.not.exist;
      expect(emails).to.exist;
      expect(emails).to.be.have.length.at.least(1);
      done(error, emails);
    });
  });

  it('should be able get distinct emails by criteria', done => {
    const ids = _.map(_.take(parties, 2), '_id');
    const criteria = { _id: { $in: ids } };
    Party.getPhones(criteria, (error, emails) => {
      expect(error).to.not.exist;
      expect(emails).to.exist;
      expect(emails).to.be.have.length(2);
      done(error, emails);
    });
  });

  after(done => clear(done));
});
