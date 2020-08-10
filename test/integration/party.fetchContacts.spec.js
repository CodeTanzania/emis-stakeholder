import _ from 'lodash';
import { assign } from '@lykmapipo/common';
import { expect } from '@lykmapipo/test-helpers';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { Party, fetchContacts } from '../../src';

describe('Fetch Contacts', () => {
  const role = Predefine.fakePartyRole();
  const area = Predefine.fakeAdministrativeArea();
  const parties = Party.fake(5);

  before((done) => clear(done));

  before((done) =>
    create(role, area, (error, [createdRole, createdArea]) => {
      _.forEach(parties, (party) =>
        assign(party, { role: createdRole, area: createdArea })
      );
      done(error, [role, area]);
    })
  );

  before((done) => create(...parties, done));

  it('should fetch contacts without criteria', (done) => {
    expect(Party.fetchContacts).to.exist;
    Party.fetchContacts((error, contacts) => {
      expect(error).to.not.exist;
      expect(contacts).to.exist.and.have.length(parties.length);
      done(error, contacts);
    });
  });

  it('should fetch contacts with criteria', (done) => {
    expect(Party.fetchContacts).to.exist;
    const ids = _.map(_.sampleSize(parties, 2), '_id');
    const criteria = { _id: { $in: ids } };
    Party.fetchContacts(criteria, (error, contacts) => {
      expect(error).to.not.exist;
      expect(contacts).to.exist.and.have.length(ids.length);
      done(error, contacts);
    });
  });

  it('should use exposed fetch contacts without criteria', (done) => {
    expect(fetchContacts).to.exist;
    fetchContacts((error, contacts) => {
      expect(error).to.not.exist;
      expect(contacts).to.exist.and.have.length(parties.length);
      done(error, contacts);
    });
  });

  it('should use exposed fetch contacts with criteria', (done) => {
    expect(fetchContacts).to.exist;
    const ids = _.map(_.sampleSize(parties, 2), '_id');
    const criteria = { _id: { $in: ids } };
    fetchContacts(criteria, (error, contacts) => {
      expect(error).to.not.exist;
      expect(contacts).to.exist.and.have.length(ids.length);
      done(error, contacts);
    });
  });

  after((done) => clear(done));
});
