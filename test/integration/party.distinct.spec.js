'use strict';

/* dependencies */
const _ = require('lodash');
const {
  clear,
  create,
  expect,
  // enableDebug,
} = require('@lykmapipo/mongoose-test-helpers');
const { Predefine } = require('@lykmapipo/predefine');
const { Party } = require('../..');

const toStrings = (items) => {
  return _.map([...items], (item) => {
    return item.toString ? item.toString() : item;
  });
};

describe.only('Party Distincts', () => {
  const areas = Predefine.fake(5);
  const parties = _.map(Party.fake(5), (party) => {
    const area = _.sample(areas);
    party.set({ area });
    return party;
  });

  before((done) => clear(done));
  before((done) => create(...areas, done));
  before((done) => create(...parties, done));

  it('should find distinct areas', (done) => {
    Party.findDistinctAreas((error, distictAreas) => {
      expect(error).to.not.exist;
      expect(distictAreas).to.exist;
      expect(toStrings(_.map(areas, '_id'))).to.include.members(
        toStrings(distictAreas)
      );
      done(error, distictAreas);
    });
  });

  after((done) => clear(done));
});
