'use strict';

/* dependencies */
const faker = require('@benmaruchu/faker');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('@codetanzania/emis-role');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = include(__dirname, '..', '..');

describe('Party Upsert', () => {
  let role = Role.fake();
  let location = Feature.fake();
  let party = Party.fake();

  before(done => clear(done));

  before(done => {
    role.post((error, created) => {
      role = created;
      party.role = created;
      done(error, created);
    });
  });

  before(done => {
    location.post((error, created) => {
      location = created;
      party.location = created;
      done(error, created);
    });
  });

  before(done => {
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  it('should be able upsert non existing', done => {
    Party.upsert(party, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(party._id);
      expect(upserted.name).to.be.eql(party.name);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by _id', done => {
    const updates = {
      _id: party._id,
      name: faker.name.findName(),
    };
    Party.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(party._id);
      expect(upserted.name).to.be.eql(party.name);
      expect(upserted.createdAt).to.be.eql(party.createdAt);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by fields', done => {
    const updates = {
      email: party.email,
      website: faker.internet.url(),
    };
    Party.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(party._id);
      expect(upserted.website).to.be.eql(party.website);
      expect(upserted.createdAt).to.be.eql(party.createdAt);
      done(error, upserted);
    });
  });

  after(done => clear(done));
});
