'use strict';

/* dependencies */
const { expect } = require('chai');
const { Predefine } = require('@lykmapipo/predefine');
const { Party } = require('../..');

describe('Party Instance', () => {
  it('`preValidate` should be a function', () => {
    const party = Party.fake();
    expect(party.preValidate).to.exist;
    expect(party.preValidate).to.be.a('function');
    expect(party.preValidate.length).to.be.equal(1);
    expect(party.preValidate.name).to.be.equal('preValidate');
  });

  it('should convert party to contact', () => {
    const party = Party.fake();
    const contact = party.asContact();
    expect(contact).to.exist;
    expect(contact.name).to.exist.and.be.equal(party.name);
    expect(contact.mobile).to.exist.and.be.equal(party.mobile);
    expect(contact.email).to.exist.and.be.equal(party.email);
  });

  it('should generate api token', (done) => {
    const party = Party.fake();
    party.generateToken(() => {
      expect(party.token).to.exist;
      done();
    });
  });

  it('should generate api token on `preValidate`', (done) => {
    const party = Party.fake();
    party.preValidate(() => {
      expect(party.token).to.exist;
      done();
    });
  });

  it.skip('should set centre from feature', (done) => {
    const area = Predefine.fake();
    const party = Party.fake();
    party.centre = undefined;
    party.area = area;
    party.preValidate(() => {
      expect(party.centre).to.exist;
      expect(party.centre).to.eql(area.geos.point);
      done();
    });
  });
});

describe('Party Statics', () => {
  it('should expose model name as constant', () => {
    expect(Party.MODEL_NAME).to.exist;
    expect(Party.MODEL_NAME).to.be.equal('Party');
  });

  it('should expose collection name as constant', () => {
    expect(Party.COLLECTION_NAME).to.exist;
    expect(Party.COLLECTION_NAME).to.be.equal('parties');
  });

  it('should expose population options as constant', () => {
    expect(Party.OPTION_AUTOPOPULATE).to.exist;
    expect(Party.OPTION_AUTOPOPULATE).to.be.eql({
      select: {
        name: 1,
        email: 1,
        mobile: 1,
        abbreviation: 1,
      },
      maxDepth: 1,
    });
  });

  it('should expose default locale as constant', () => {
    expect(Party.DEFAULT_LOCALE).to.exist;
    expect(Party.DEFAULT_LOCALE).to.be.a('string');
    expect(Party.DEFAULT_LOCALE).to.not.be.empty;
  });

  it('should expose acceptable locales as constant', () => {
    expect(Party.LOCALES).to.exist;
    expect(Party.LOCALES).to.be.an('array');
    expect(Party.LOCALES).to.have.length.at.least(1);
  });

  it('should expose default party type as constant', () => {
    expect(Party.DEFAULT_PARTY_TYPE).to.exist;
    expect(Party.DEFAULT_PARTY_TYPE).to.be.a('string');
    expect(Party.DEFAULT_PARTY_TYPE).to.not.be.empty;
  });

  it('should expose acceptable party types as constant', () => {
    expect(Party.PARTY_TYPES).to.exist;
    expect(Party.PARTY_TYPES).to.be.an('array');
    expect(Party.PARTY_TYPES).to.have.length.at.least(1);
  });
});
