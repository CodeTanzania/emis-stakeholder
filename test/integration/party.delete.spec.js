'use strict';

/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('@codetanzania/emis-role');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = include(__dirname, '..', '..');

describe('Party Static Delete', () => {
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

  it('should be able to delete', done => {
    Party.del(party._id, (error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(party._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    Party.del(party._id, (error, deleted) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(deleted).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});

describe('Party Instance Delete', () => {
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

  it('should be able to delete', done => {
    party.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(party._id);
      done(error, deleted);
    });
  });

  it('should throw if not exists', done => {
    party.del((error, deleted) => {
      expect(error).to.not.exist;
      expect(deleted).to.exist;
      expect(deleted._id).to.eql(party._id);
      done();
    });
  });

  after(done => clear(done));
});
