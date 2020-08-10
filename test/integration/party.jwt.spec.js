import { expect } from '@lykmapipo/test-helpers';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { Party } from '../../src';

describe('Party JWT', () => {
  const role = Predefine.fakePartyRole();
  const area = Predefine.fakeAdministrativeArea();
  let party = Party.fake();

  before((done) => clear(done));
  before((done) => create([role, area], done));

  before((done) => {
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  it('should be able to generate party api token', (done) => {
    party.generateToken((error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(party._id);
      expect(found.token).to.exist;
      done(error, found);
    });
  });

  it('should be able to get by decoded jwt', (done) => {
    Party.findByJwt({ id: party._id }, (error, found) => {
      expect(error).to.not.exist;
      expect(found).to.exist;
      expect(found._id).to.eql(party._id);
      done(error, found);
    });
  });

  it('should throw if no jwt options', (done) => {
    Party.findByJwt({}, (error, found) => {
      expect(error).to.exist;
      expect(error.status).to.exist.and.be.equal(403);
      expect(error.code).to.exist.and.be.equal(403);
      expect(error.message).to.be.equal('Invalid Authorization Token');
      expect(found).to.not.exist;
      done();
    });
  });

  it('should throw if party not exists', (done) => {
    const notExist = Party.fake();
    Party.findByJwt({ id: notExist._id }, (error, found) => {
      expect(error).to.exist;
      expect(error.status).to.exist.and.be.equal(403);
      expect(error.code).to.exist.and.be.equal(403);
      expect(error.message).to.be.equal('Invalid Authorization Token');
      expect(found).to.not.exist;
      done();
    });
  });

  after((done) => clear(done));
});
