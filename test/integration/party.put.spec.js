import _ from 'lodash';
import { expect } from '@lykmapipo/test-helpers';
import { clear } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { Party } from '../../src';

describe('Party Static Put', () => {
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
    Party.put(party._id, party, (error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(party._id);
      expect(updated.name).to.eql(party.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    const fake = Party.fake().toObject();
    Party.put(fake._id, _.omit(fake, '_id'), (error, updated) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(updated).to.not.exist;
      done();
    });
  });

  after((done) => clear(done));
});

describe('Party Instance Put', () => {
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
    party.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(party._id);
      expect(updated.name).to.eql(party.name);
      done(error, updated);
    });
  });

  it('should throw if not exists', (done) => {
    party.put((error, updated) => {
      expect(error).to.not.exist;
      expect(updated).to.exist;
      expect(updated._id).to.eql(party._id);
      done();
    });
  });

  after((done) => clear(done));
});
