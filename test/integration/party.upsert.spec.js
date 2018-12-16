'use strict';


/* dependencies */
const faker = require('@benmaruchu/faker');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Party } = include(__dirname, '..', '..');


describe('Party Upsert', () => {

  before((done) => {
    Party.deleteMany(done);
  });

  let party;

  beforeEach((done) => {
    party = Party.fakeExcept('title');
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  it('should be able upsert non existing', (done) => {
    Party.upsert(party, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(party._id);
      expect(upserted.name).to.be.eql(party.name);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by _id', (done) => {
    const updates = {
      _id: party._id,
      title: faker.name.jobTitle()
    };
    Party.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(party._id);
      expect(upserted.name).to.be.eql(party.name);
      expect(upserted.title).to.not.be.eql(party.title);
      expect(upserted.title).to.be.eql(updates.title);
      expect(upserted.createdAt).to.be.eql(party.createdAt);
      done(error, upserted);
    });
  });

  it('should be able upsert existing by fields', (done) => {
    const updates = {
      email: party.email,
      title: faker.name.jobTitle()
    };
    Party.upsert(updates, (error, upserted) => {
      expect(error).to.not.exist;
      expect(upserted).to.exist;
      expect(upserted._id).to.be.eql(party._id);
      expect(upserted.name).to.be.eql(party.name);
      expect(upserted.title).to.not.be.eql(party.title);
      expect(upserted.title).to.be.eql(updates.title);
      expect(upserted.createdAt).to.be.eql(party.createdAt);
      done(error, upserted);
    });
  });

  after((done) => {
    Party.deleteMany(done);
  });

});
