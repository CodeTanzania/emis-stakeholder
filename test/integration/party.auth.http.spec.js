import { mount } from '@lykmapipo/express-common';
import { expect } from '@lykmapipo/test-helpers';
import { testPost, testPatch } from '@lykmapipo/express-test-helpers';
import { clear, create } from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import {
  Party,
  apiVersion,
  authenticationRouter,
  partyRouter,
} from '../../src';

describe('Authentication API', () => {
  let party = Party.fake();
  const role = Predefine.fakePartyRole();
  const area = Predefine.fakeAdministrativeArea();

  before(() => {
    mount(authenticationRouter);
    mount(partyRouter);
  });

  before((done) => clear(done));

  before((done) => create([role, area], done));

  before((done) => {
    party.area = area;
    Party.register(party, done);
  });

  it('should handle HTTP POST on /signin use email as username', (done) => {
    testPost(`/${apiVersion}/signin`, {
      username: party.email,
      password: party.password,
    })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;
        expect(response.body).to.exist;
        expect(response.body.party).to.exist;
        expect(response.body.token).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP POST on /signin use phone number as username', (done) => {
    testPost(`/${apiVersion}/signin`, {
      username: party.mobile,
      password: party.password,
    })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;
        expect(response.body).to.exist;
        expect(response.body.party).to.exist;
        expect(response.body.token).to.exist;
        done(error, response);
      });
  });

  it('should allow user to change password', (done) => {
    testPatch(`/${apiVersion}/parties/${party._id}`, {
      password: '987654321',
    })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Party(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(party._id);
        expect(patched.name).to.be.equal(patched.name);

        party = patched;

        done(error, response);
      });
  });

  it.skip('should allow user to signin after changing password', (done) => {
    testPost(`/${apiVersion}/signin`, {
      username: party.email,
      password: '987654321',
    })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;
        expect(response.body).to.exist;
        expect(response.body.party).to.exist;
        expect(response.body.token).to.exist;
        done(error, response);
        done();
      });
  });

  after((done) => clear('Party', done));
});
