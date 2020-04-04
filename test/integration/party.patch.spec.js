'use strict';

/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Predefine } = require('@lykmapipo/predefine');
const { Party } = require('../..');

describe('Party Static Patch', () => {
  let role = Predefine.fake();
  let area = Predefine.fake();
  let party = Party.fake();

  before((done) => clear(done));

  before((done) => {
    role.post((error, created) => {
      role = created;
      party.role = created;
      done(error, created);
    });
  });

  before((done) => {
    area.post((error, created) => {
      area = created;
      party.area = created;
      done(error, created);
    });
  });

  before((done) => {
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  it('should be able to put', (done) => {
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
    const fake = Party.fake().toObject();
    Party.patch(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after((done) => clear(done));
});

describe('Party Instance Patch', () => {
  let role = Predefine.fake();
  let area = Predefine.fake();
  let party = Party.fake();

  before((done) => clear(done));

  before((done) => {
    role.post((error, created) => {
      role = created;
      party.role = created;
      done(error, created);
    });
  });

  before((done) => {
    area.post((error, created) => {
      area = created;
      party.area = created;
      done(error, created);
    });
  });

  before((done) => {
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  it('should be able to put', (done) => {
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

  after((done) => clear(done));
});
