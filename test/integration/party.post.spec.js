'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Party } = require(path.join(__dirname, '..', '..'));


describe('Party Static Post', () => {

  before((done) => {
    Party.deleteMany(done);
  });

  let party = Party.fake();

  it('should be able to post', (done) => {
    Party.post(party, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(party._id);
      expect(created.name).to.eql(party.name);
      done(error, created);
    });
  });

  after((done) => {
    Party.deleteMany(done);
  });

});

describe('Party Instance Post', () => {

  before((done) => {
    Party.deleteMany(done);
  });

  let party = Party.fake();

  it('should be able to post', (done) => {
    party.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(party._id);
      expect(created.name).to.eql(party.name);
      done(error, created);
    });
  });

  after((done) => {
    Party.deleteMany(done);
  });

});
