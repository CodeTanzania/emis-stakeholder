import async from 'async';
import { expect } from '@lykmapipo/test-helpers';
import kue from 'kue';
import { worker } from 'mongoose-kue';
import { Message } from '@lykmapipo/postman';
import { Party } from '../../src';

// TODO refactor
const redis = kue.redis.createClientFactory({
  redis: {},
});
const cleanup = (callback) => {
  redis.keys('q*', (error, rows) => {
    if (error) {
      callback(error);
    } else {
      async.each(
        rows,
        (row, next) => {
          redis.del(row, next);
        },
        callback
      );
    }
  });
};

describe.skip('Live Email Notification', () => {
  let party = Party.fake();

  before(() => {
    process.env.DEBUG = false;
  });

  before((done) => {
    cleanup(done);
  });

  before((done) => {
    Message.deleteMany(done);
  });

  before((done) => {
    Party.deleteMany(done);
  });

  before((done) => {
    party.email = process.env.SMTP_TEST_RECEIVER || party.email;
    party.post((error, created) => {
      party = created;
      done(error, created);
    });
  });

  before((done) => {
    worker.reset(done);
  });

  before(() => {
    worker.start({ types: 'EMAIL' });
  });

  if (process.env.SMTP_TEST_RECEIVER) {
    it('should be able to queue live message', (done) => {
      const notification = {
        to: {},
        subject: 'EMIS Test Email',
        body: 'EMIS Test Email',
      };

      // listen queue events
      worker.queue
        .on('job complete', (id, result) => {
          expect(id).to.exist;
          expect(result).to.exist;
          expect(result.to).to.exist;
          expect(result.to).to.exist;
          expect(result._id).to.exist;
          // expect(result.transport).to.be.equal('smtp');
          expect(result.sentAt).to.exist;
          expect(result.deliveredAt).to.exist;
          expect(result.failedAt).to.not.exist;
          expect(result.result).to.exist;
          expect(result.result.success).to.exist;
          expect(result.result.success).to.be.true;
          done();
        })
        .on('job queued', (queued) => {
          expect(queued).to.exist;
          expect(queued.type).to.be.eql('EMAIL');
          expect(queued.to).to.exist;
          expect(queued.subject).to.be.eql(notification.subject);
          expect(queued.body).to.be.eql(notification.body);
          expect(queued.sentAt).to.not.exist;
          expect(queued.deliveredAt).to.not.exist;
          expect(queued.result).to.not.exist;
        })
        .on('job error', (error) => {
          done(error);
        });

      Party.notify(notification);
    });
  }

  after((done) => {
    worker.stop(done);
  });

  after((done) => {
    Message.deleteMany(done);
  });

  after((done) => {
    Party.deleteMany(done);
  });

  before((done) => {
    cleanup(done);
  });

  after(() => {
    delete process.env.DEBUG;
  });
});
