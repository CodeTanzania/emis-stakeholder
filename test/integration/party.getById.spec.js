import _ from 'lodash';
import { assign } from '@lykmapipo/common';
import { expect } from '@lykmapipo/test-helpers';
import { create, clear } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { Party } from '../../src';

describe('Party getById', () => {
  // TODO: load ewea-internals
  let role = Predefine.fakePartyRole();
  const level = Predefine.fakeAdministrativeLevel();

  let area = Predefine.fakeAdministrativeArea();
  area.set({ relations: { level } });

  let party = Party.fake();
  party.set({ area });

  before((done) => clear(done));
  before((done) => create(level, done));

  before((done) => {
    role.post((error, created) => {
      role = created;
      assign(party, { role: created });
      done(error, created);
    });
  });

  before((done) => {
    area.post((error, created) => {
      area = created;
      // party.area = created;
      done(error, created);
    });
  });

  before((done) => {
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  it('should be able to get an instance', (done) => {
    Party.getById(party._id, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(party._id);
      done(error, found);
    });
  });

  it('should be able to get with options', (done) => {
    const options = {
      _id: party._id,
      select: 'name',
    };

    Party.getById(options, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(party._id);
      expect(found.name).to.exist;

      // ...assert selection
      const fields = _.keys(found.toObject());
      expect(fields).to.have.length(4);
      _.map(['phone', 'email', 'createdAt', 'updatedAt'], (field) => {
        expect(fields).to.not.include(field);
      });
      done(error, found);
    });
  });

  it('should throw if not exists', (done) => {
    const notExist = Party.fake();
    Party.getById(notExist._id, (error, found) => {
      expect(error).to.exist;
      // expect(error.status).to.exist;
      expect(error.name).to.be.equal('DocumentNotFoundError');
      expect(found).to.not.exist;
      done();
    });
  });

  after((done) => clear(done));
});
