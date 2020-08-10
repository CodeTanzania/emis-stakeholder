import _ from 'lodash';
import { assign } from '@lykmapipo/common';
import { expect } from '@lykmapipo/test-helpers';
import { clear } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { Party } from '../../src';

describe('Party Get', () => {
  let role = Predefine.fakePartyRole();
  let area = Predefine.fakeAdministrativeArea();
  let parties = Party.fake(32);

  before((done) => clear(done));

  before((done) => {
    role.post((error, created) => {
      role = created;
      parties = _.map(parties, (party) => {
        assign(party, { role: created });
        return party;
      });
      done(error, created);
    });
  });

  before((done) => {
    area.post((error, created) => {
      area = created;
      parties = _.map(parties, (party) => {
        assign(party, { role: created });
        return party;
      });
      done(error, created);
    });
  });

  before((done) => {
    Party.insertMany(parties, (error, created) => {
      parties = created;
      done(error, created);
    });
  });

  it('should be able to get without options', (done) => {
    Party.get((error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length(10);
      expect(results.total).to.exist;
      expect(results.total).to.be.equal(32);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(4);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should be able to get with options', (done) => {
    const options = { page: 1, limit: 20 };
    Party.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length(20);
      expect(results.total).to.exist;
      expect(results.total).to.be.equal(32);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(20);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(2);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should be able to search with options', (done) => {
    const options = { filter: { q: parties[0].name } };
    Party.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length.of.at.least(1);
      expect(results.total).to.exist;
      expect(results.total).to.be.at.least(1);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  it('should parse filter options', (done) => {
    const options = { filter: { name: parties[0].name } };
    Party.get(options, (error, results) => {
      expect(error).to.not.exist;
      expect(results).to.exist;
      expect(results.data).to.exist;
      expect(results.data).to.have.length.of.at.least(1);
      expect(results.total).to.exist;
      expect(results.total).to.be.at.least(1);
      expect(results.limit).to.exist;
      expect(results.limit).to.be.equal(10);
      expect(results.skip).to.exist;
      expect(results.skip).to.be.equal(0);
      expect(results.page).to.exist;
      expect(results.page).to.be.equal(1);
      expect(results.pages).to.exist;
      expect(results.pages).to.be.equal(1);
      expect(results.lastModified).to.exist;
      expect(_.maxBy(results.data, 'updatedAt').updatedAt).to.be.at.most(
        results.lastModified
      );
      done(error, results);
    });
  });

  after((done) => clear(done));
});
