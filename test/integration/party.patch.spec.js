'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const { Party } = require(path.join(__dirname, '..', '..'));


describe('Party Static Patch', () => {

  before((done) => {
    Party.deleteMany(done);
  });

  let party = Party.fake();

  before((done) => {
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  it('should be able to patch', (done) => {
    party = party.fakeOnly('name');
    Party.patch(party._id, party, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(party._id);
      expect(updated.name).to.eql(party.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Party.fake();
    Party.patch(fake._id, fake, (error, updated) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(updated).to.not.exist;
      done();
    });
  });

  after((done) => {
    Party.deleteMany(done);
  });

});


describe('Party Instance Patch', () => {

  before((done) => {
    Party.deleteMany(done);
  });

  let party = Party.fake();

  before((done) => {
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  it('should be able to patch', (done) => {
    party = party.fakeOnly('name');
    party.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(party._id);
      expect(updated.name).to.eql(party.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    party.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(party._id);
      done();
    });
  });

  after((done) => {
    Party.deleteMany(done);
  });

});
