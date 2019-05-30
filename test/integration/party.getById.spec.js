'use strict';

/* dependencies */
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('@codetanzania/emis-role');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = include(__dirname, '..', '..');

describe('Party getById', () => {
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

  it('should be able to get an instance', done => {
    Party.getById(party._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(party._id);
      done(error, found);
    });
  });

  it('should be able to get with options', done => {
    const options = {
      _id: party._id,
      select: 'name',
    };

    Party.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(party._id);
      expect(found.name).to.exist;

      //...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(4);
      _.map(['phone', 'email', 'createdAt', 'updatedAt'], function(field) {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });
  });

  it('should throw if not exists', done => {
    const party = Party.fake();
    Party.getById(party._id, (error, found) => {
      expect(error).to.exist;
      expect(error.status).to.exist;
      expect(error.message).to.be.equal('Not Found');
      expect(found).to.not.exist;
      done();
    });
  });

  after(done => clear(done));
});
