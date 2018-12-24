'use strict';


/* dependencies */
const path = require('path');
const _ = require('lodash');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Party } = include(__dirname, '..', '..');

describe('Party Seed', () => {

  const SEEDS_PATH = process.env.SEEDS_PATH;

  before((done) => clear(done));

  before(() => {
    process.env.SEEDS_PATH = path.join(__dirname, '..', 'fixtures');
  });

  it('should be able to seed from environment', (done) => {
    Party.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { name: 'John Doe' })).to.exist;
      done(error, seeded);
    });
  });

  it('should not throw if seed from environment exist', (done) => {
    Party.seed((error, seeded) => {
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { name: 'John Doe' })).to.exist;
      done(error, seeded);
    });
  });

  after((done) => clear(done));

  after(() => {
    process.env.SEEDS_PATH = SEEDS_PATH;
  });

});
