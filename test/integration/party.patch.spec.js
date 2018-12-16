'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Party } = include(__dirname, '..', '..');


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

  let member = Party.fake();
  let party = Party.fake();

  before((done) => {
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  before((done) => {
    member.post((error, created) => {
      member = created;
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

  it('should be able to add member', (done) => {
    party.members = [member];
    party.patch((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(party._id);
      expect(updated.name).to.eql(party.name);
      expect(updated.members).to.exist;
      expect(updated.members).to.have.length.at.least(1);
      done(error, updated);
    });
  });

  it('should not add member if not exists', (done) => {
    party.members = [Party.fake()];
    party.patch((error) => {
      expect(error).to.exist;
      done();
    });
  });

  after((done) => {
    Party.deleteMany(done);
  });

});
