'use strict';

/* dependencies */
const _ = require('lodash');
const { clear, create, expect } = require('@lykmapipo/mongoose-test-helpers');
const { Predefine } = require('@lykmapipo/predefine');
const { Party } = require('../..');

const toStrings = (items) => {
  return _.map([...items], (item) => {
    return item.toString ? item.toString() : item;
  });
};

describe('Party Distincts', () => {
  const areas = Predefine.fake(5);
  const roles = Predefine.fake(5);
  const groups = Predefine.fake(5);
  const parties = _.map(Party.fake(5), (party) => {
    const area = _.sample(areas);
    const role = _.sample(roles);
    const group = _.sample(groups);
    party.set({ area, role, group });
    return party;
  });

  before((done) => clear(done));
  before((done) => create([...areas, ...roles, ...groups], done));
  before((done) => create(...parties, done));

  it('should find distinct areas', (done) => {
    Party.findDistinctAreas((error, distincts) => {
      expect(error).to.not.exist;
      expect(distincts).to.exist;
      expect(toStrings(_.map(areas, '_id'))).to.include.members(
        toStrings(distincts)
      );
      done(error, distincts);
    });
  });

  it('should find distinct roles', (done) => {
    Party.findDistinctRoles((error, distincts) => {
      expect(error).to.not.exist;
      expect(distincts).to.exist;
      expect(toStrings(_.map(roles, '_id'))).to.include.members(
        toStrings(distincts)
      );
      done(error, distincts);
    });
  });

  it('should find distinct groups', (done) => {
    Party.findDistinctGroups((error, distincts) => {
      expect(error).to.not.exist;
      expect(distincts).to.exist;
      expect(toStrings(_.map(groups, '_id'))).to.include.members(
        toStrings(distincts)
      );
      done(error, distincts);
    });
  });

  after((done) => clear(done));
});
