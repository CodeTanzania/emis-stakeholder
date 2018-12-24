'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Party } = include(__dirname, '..', '..');


describe('Party Static Post', () => {

  before((done) => clear(done));

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

  after((done) => clear(done));

});

describe('Party Instance Post', () => {

  before((done) => clear(done));

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

  after((done) => clear(done));

});
