import path from 'path';
import _ from 'lodash';
import { expect } from '@lykmapipo/test-helpers';
import { clear } from '@lykmapipo/mongoose-test-helpers';
import { Party } from '../../src';

describe('Party Seed', () => {
  const { SEED_PATH } = process.env;

  before((done) => clear(done));

  before(() => {
    process.env.SEED_PATH = path.join(__dirname, '..', 'fixtures');
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

  it.skip('should not throw if seed from environment exist', (done) => {
    Party.seed((error, seeded) => {
      console.log(error);
      expect(error).to.not.exist;
      expect(seeded).to.exist;
      expect(seeded).to.length.at.least(1);
      expect(_.find(seeded, { name: 'John Doe' })).to.exist;
      done(error, seeded);
    });
  });

  after((done) => clear(done));

  after(() => {
    process.env.SEED_PATH = SEED_PATH;
  });
});
