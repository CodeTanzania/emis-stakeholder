import { expect } from '@lykmapipo/test-helpers';
import { clear } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { Party } from '../../src';

describe('Party Static Post', () => {
  let role = Predefine.fake();
  let area = Predefine.fake();
  const party = Party.fake();

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

  it('should be able to post', (done) => {
    Party.post(party, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(party._id);
      expect(created.name).to.eql(party.name);
      done(error, created);
    });
  });

  it('should format mobile number on post', (done) => {
    party.mobile = '0714555555';

    Party.post(party, (error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(party._id);
      expect(created.name).to.eql(party.name);
      expect(created.mobile).to.equal('255714555555');
      done(error, created);
    });
  });

  after((done) => clear(done));
});

describe('Party Instance Post', () => {
  let role = Predefine.fake();
  let area = Predefine.fake();
  const party = Party.fake();

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

  it('should be able to post', (done) => {
    party.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(party._id);
      expect(created.name).to.eql(party.name);
      done(error, created);
    });
  });

  it('should format phone number on post', (done) => {
    party.mobile = '0714555555';

    party.post((error, created) => {
      expect(error).to.not.exist;
      expect(created).to.exist;
      expect(created._id).to.eql(party._id);
      expect(created.name).to.eql(party.name);
      expect(created.mobile).to.equal('255714555555');
      done(error, created);
    });
  });

  after((done) => clear(done));
});
