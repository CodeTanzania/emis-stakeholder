import {
  clear as clearHttp,
  testRouter,
} from '@lykmapipo/express-test-helpers';
import {
  create,
  clear as clearDb,
  expect,
} from '@lykmapipo/mongoose-test-helpers';
import { Predefine } from '@lykmapipo/predefine';
import { createModels } from '@lykmapipo/file';
import { Party, partyRouter } from '../../src';

describe('Party Rest API', () => {
  const area = Predefine.fakeAdministrativeArea();
  const role = Predefine.fakePartyRole();

  const party = Party.fake();
  party.set({ role, area });

  const options = {
    pathSingle: '/parties/:id',
    pathList: '/parties',
    pathSchema: '/parties/schema/',
    pathExport: '/parties/export/',
  };

  before((done) => clearDb(Party, done));

  before(() => clearHttp());

  beforeEach(() => createModels());

  before((done) => create(role, area, done));

  it('should handle HTTP POST on /parties', (done) => {
    const { testPost } = testRouter(options, partyRouter);
    testPost({ ...party.toObject() })
      .expect(201)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const created = new Party(body);
        expect(created._id).to.exist.and.be.eql(party._id);
        expect(created.name).to.exist;
        expect(created.role).to.exist;
        expect(created.area).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP GET on /parties', (done) => {
    const { testGet } = testRouter(options, partyRouter);
    testGet()
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        expect(body.data).to.exist;
        expect(body.total).to.exist;
        expect(body.limit).to.exist;
        expect(body.skip).to.exist;
        expect(body.page).to.exist;
        expect(body.pages).to.exist;
        expect(body.lastModified).to.exist;
        done(error, body);
      });
  });

  it('should handle GET /parties/schema', (done) => {
    const { testGetSchema } = testRouter(options, partyRouter);
    testGetSchema().expect(200, done);
  });

  it('should handle GET /parties/export', (done) => {
    const { testGetExport } = testRouter(options, partyRouter);
    testGetExport()
      .expect('Content-Type', 'text/csv; charset=utf-8')
      .expect(({ headers }) => {
        expect(headers['content-disposition']).to.exist;
      })
      .expect(200, done);
  });

  it('should handle HTTP GET on /parties/:id', (done) => {
    const { testGet } = testRouter(options, partyRouter);
    const params = { id: party._id.toString() };
    testGet(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const found = new Party(body);
        expect(found._id).to.exist.and.be.eql(party._id);
        expect(found.name).to.exist;
        expect(found.role).to.exist;
        expect(found.area).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP PATCH on /parties/:id', (done) => {
    const { testPatch } = testRouter(options, partyRouter);
    const { name } = party.fakeOnly('name');
    const params = { id: party._id.toString() };
    testPatch(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Party(body);
        expect(patched._id).to.exist.and.be.eql(party._id);
        expect(patched.name).to.exist;
        expect(patched.name).to.exist.and.be.eql(name);
        expect(patched.role).to.exist;
        expect(patched.area).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP PUT on /parties/:id', (done) => {
    const { testPut } = testRouter(options, partyRouter);
    const { name } = party.fakeOnly('name');
    const params = { id: party._id.toString() };
    testPut(params, { name })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const patched = new Party(body);
        expect(patched._id).to.exist.and.be.eql(party._id);
        expect(patched.name).to.exist;
        expect(patched.name).to.exist.and.be.eql(name);
        expect(patched.role).to.exist;
        expect(patched.area).to.exist;
        done(error, body);
      });
  });

  it('should handle HTTP DELETE on /parties/:id', (done) => {
    const { testDelete } = testRouter(options, partyRouter);
    const params = { id: party._id.toString() };
    testDelete(params)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((error, { body }) => {
        expect(error).to.not.exist;
        expect(body).to.exist;
        const deleted = new Party(body);
        expect(deleted._id).to.exist.and.be.eql(party._id);
        expect(deleted.name).to.exist;
        expect(deleted.role).to.exist;
        expect(deleted.area).to.exist;
        expect(deleted.deletedAt).to.exist;
        done(error, body);
      });
  });

  after(() => clearHttp());

  after((done) => clearDb(Party, done));
});
