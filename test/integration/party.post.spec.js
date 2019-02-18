'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('@codetanzania/emis-role');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = include(__dirname, '..', '..');


describe('Party Static Post', () => {

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

  it('should be able to post', done => {
    Party.post(party, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(party._id);
      expect(created.name).to.eql(party.name);
      done(error, created);
    });
  });

  after(done => clear(done));

});

describe('Party Instance Post', () => {

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

  it('should be able to post', done => {
    party.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(party._id);
      expect(created.name).to.eql(party.name);
      done(error, created);
    });
  });

  after(done => clear(done));

});
