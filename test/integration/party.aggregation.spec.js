import { idOf } from '@lykmapipo/common';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Party } from '../../src';

describe('Party Aggregation', () => {
  const grand = Party.fake();

  const parent = Party.fake();
  parent.set({ party: grand });

  const kid = Party.fake();
  kid.set({ party: parent });

  before((done) => clear(done));
  before((done) => create(grand, done));
  before((done) => create(parent, done));
  before((done) => create(kid, done));

  it('should lookup and unwind without criteria', (done) => {
    Party.lookup().exec((error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      done(error, found);
    });
  });

  it('should lookup and unwind with criteria', (done) => {
    Party.lookup({ _id: { $nin: [idOf(kid)] } }).exec((error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(2);
      done(error, found);
    });
  });

  after((done) => clear(done));
});
