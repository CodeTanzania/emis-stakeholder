'use strict';


/* dependencies */
const request = require('supertest');
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { clear } = require('@lykmapipo/mongoose-test-helpers');
const { Role } = require('@codetanzania/emis-role');
const { Feature } = require('@codetanzania/emis-feature');
const { Party, apiVersion, app } = include(__dirname, '..', '..');

describe('Party Rest API', function () {

  let role = Role.fake();
  let location = Feature.fake();
  let party = Party.fake();

  before(done => clear(done));

  before(done => {
    role.post((error, created) => {
      role = created;
      party.role = created;
      done(error, created);
    });
  });

  before(done => {
    location.post((error, created) => {
      location = created;
      party.location = created;
      done(error, created);
    });
  });

  it('should handle HTTP POST on /parties', done => {
    request(app)
      .post(`/${apiVersion}/parties`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(party)
      .expect(201)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const created = new Party(response.body);

        expect(created._id).to.exist;
        expect(created._id).to.be.eql(party._id);
        expect(created.name).to.exist;

        //set
        party = created;

        done(error, response);
      });
  });

  it('should handle HTTP GET on /parties', done => {
    request(app)
      .get(`/${apiVersion}/parties`)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        //assert payload
        const result = response.body;
        expect(result.data).to.exist;
        expect(result.total).to.exist;
        expect(result.limit).to.exist;
        expect(result.skip).to.exist;
        expect(result.page).to.exist;
        expect(result.pages).to.exist;
        expect(result.lastModified).to.exist;
        done(error, response);
      });
  });

  it('should handle HTTP GET on /parties/id:', done => {
    request(app)
      .get(`/${apiVersion}/parties/${party._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const found = new Party(response.body);

        expect(found._id).to.exist;
        expect(found._id).to.be.eql(party._id);
        expect(found.name).to.be.equal(party.name);

        done(error, response);
      });
  });

  it('should handle HTTP PATCH on /parties/id:', done => {
    const { name } = party.fakeOnly('name');
    request(app)
      .patch(`/${apiVersion}/parties/${party._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const patched = new Party(response.body);

        expect(patched._id).to.exist;
        expect(patched._id).to.be.eql(party._id);
        expect(patched.name).to.be.equal(party.name);

        //set
        party = patched;

        done(error, response);
      });
  });

  it('should handle HTTP PUT on /parties/id:', done => {
    const { name } = party.fakeOnly('name');
    request(app)
      .put(`/${apiVersion}/parties/${party._id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ name })
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const updated = new Party(response.body);

        expect(updated._id).to.exist;
        expect(updated._id).to.be.eql(party._id);
        expect(updated.name).to.be.equal(party.name);

        //set
        party = updated;

        done(error, response);
      });
  });

  it('should handle HTTP DELETE on /parties/:id', done => {
    request(app)
      .delete(`/${apiVersion}/parties/${party._id}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((error, response) => {
        expect(error).to.not.exist;
        expect(response).to.exist;

        const deleted = new Party(response.body);

        expect(deleted._id).to.exist;
        expect(deleted._id).to.be.eql(party._id);
        expect(deleted.name).to.be.equal(party.name);
        done(error, response);
      });
  });

  after(done => clear(done));

});
