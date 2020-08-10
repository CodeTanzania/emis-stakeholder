import { idOf } from '@lykmapipo/common';
import { expect, clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Party } from '../../src';

describe('Party findRecursive', () => {
  const grand = Party.fake();

  const parent = Party.fake();
  parent.set({ party: grand });

  const kid = Party.fake();
  kid.set({ party: parent });

  before((done) => clear(done));
  before((done) => create(grand, done));
  before((done) => create(parent, done));
  before((done) => create(kid, done));

  it('should find children 1-level recursively', (done) => {
    Party.findChildren({ _id: idOf(kid) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      expect(idOf(found[0])).to.be.eql(idOf(kid));
      done(error, found);
    });
  });

  it('should find children 2-level recursively', (done) => {
    Party.findChildren({ _id: idOf(parent) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(2);
      expect(idOf(found[0])).to.be.eql(idOf(parent));
      expect(idOf(found[1])).to.be.eql(idOf(kid));
      done(error, found);
    });
  });

  it('should find children 3-level recursively', (done) => {
    Party.findChildren({ _id: idOf(grand) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      expect(idOf(found[0])).to.be.eql(idOf(grand));
      expect(idOf(found[1])).to.be.eql(idOf(parent));
      expect(idOf(found[2])).to.be.eql(idOf(kid));
      done(error, found);
    });
  });

  it('should find children nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand)] } };
    Party.findChildren(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      done(error, found);
    });
  });

  it('should find children nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand), idOf(parent)] } };
    Party.findChildren(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      done(error, found);
    });
  });

  it('should find children nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand), idOf(parent), idOf(kid)] } };
    Party.findChildren(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      done(error, found);
    });
  });

  it('should find parent 1-level recursively', (done) => {
    Party.findParents({ _id: idOf(grand) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      expect(idOf(found[0])).to.be.eql(idOf(grand));
      done(error, found);
    });
  });

  it('should find parent 2-level recursively', (done) => {
    Party.findParents({ _id: idOf(parent) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(2);
      expect(idOf(found[0])).to.be.eql(idOf(parent));
      expect(idOf(found[1])).to.be.eql(idOf(grand));
      done(error, found);
    });
  });

  it('should find parent 3-level recursively', (done) => {
    Party.findParents({ _id: idOf(kid) }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      expect(idOf(found[0])).to.be.eql(idOf(kid));
      expect(idOf(found[1])).to.be.eql(idOf(parent));
      expect(idOf(found[2])).to.be.eql(idOf(grand));
      done(error, found);
    });
  });

  it('should find parent nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand)] } };
    Party.findParents(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(1);
      done(error, found);
    });
  });

  it('should find parent nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand), idOf(parent)] } };
    Party.findParents(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(2);
      done(error, found);
    });
  });

  it('should find parent nth-level recursively', (done) => {
    const criteria = { _id: { $in: [idOf(grand), idOf(parent), idOf(kid)] } };
    Party.findParents(criteria, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist.and.to.have.length(3);
      done(error, found);
    });
  });

  after((done) => clear(done));
});
