'use strict';

/* dependencies */
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Predefine } = require('@lykmapipo/predefine');
const { Party } = require('../..');

describe('Party Static Delete', () => {
  let role = Predefine.fake();
  let area = Predefine.fake();
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
    area.post((error, created) => {
      area = created;
      party.area = created;
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
  let role = Predefine.fake();
  let area = Predefine.fake();
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
    area.post((error, created) => {
      area = created;
      party.area = created;
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
