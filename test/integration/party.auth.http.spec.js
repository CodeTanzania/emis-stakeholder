'use strict';

/* dependencies */
const request = require('supertest');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear, create } = require('@lykmapipo/mongoose-test-helpers');
const { Feature } = require('@codetanzania/emis-feature');
const { Role } = require('@codetanzania/emis-role');
const { Party, apiVersion, app } = include(__dirname, '..', '..');

describe('Authentication API', () => {
  let party = Party.fake();
  const role = Role.fake();
  const location = Feature.fake();

  before(done => clear(done));

  before(done => create([role, location], done));

  describe('Existing User', () => {
    before(done => {
      party.location = location;
      Party.register(party, done);
    });

    it('should handle HTTP POST on /signin', done => {
      request(app)
        .post(`/${apiVersion}/signin`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ email: party.email, password: party.password })
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

    it('should allow user to change password', done => {
      request(app)
        .patch(`/${apiVersion}/parties/${party._id}`)
        .set('Accept', 'appplication/json')
        .set('Content-Type', 'application/json')
        .send({ password: '987654321' })
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

    it('should allow user to signin after changing password', done => {
      request(app)
        .post(`/${apiVersion}/signin`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ email: party.email, password: '987654321' })
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

    after(done => clear('Party', done));
  });

  describe('Default Password', () => {
    before(() => {
      process.env.DEFAULT_PASSWORD = 'test';
    });

    before(done => {
      party.location = location;
      party.password = '';
      Party.register(party, done);
    });

    it('should handle HTTP POST on /signin', done => {
      request(app)
        .post(`/${apiVersion}/signin`)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send({ email: party.email, password: '123456789' })
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

    after(() => {
      process.env.DEFAULT_PASSWORD = '';
    });
  });
});
