'use strict';


/* dependencies */
const { expect } = require('chai');
const { include } = require('@lykmapipo/include');
const { Feature } = require('@codetanzania/emis-feature');
const { Party } = include(__dirname, '..', '..');


describe('Party Instance', () => {

  it('`preValidate` should be a function', () => {
    const party = Party.fake();
    expect(party.preValidate).to.exist;
    expect(party.preValidate).to.be.a('function');
    expect(party.preValidate.length).to.be.equal(1);
    expect(party.preValidate.name).to.be.equal('preValidate');
  });

  it('should set centre from feature', (done) => {
    const location = Feature.fake();
    const party = Party.fake();
    party.centre = undefined;
    party.location = location;
    party.preValidate(() => {
      expect(party.centre).to.exist;
      expect(party.centre).to.eql(location.centroid);
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
        title: 1,
        email: 1,
        mobile: 1,
        landline: 1,
        role: 1
      },
      maxDepth: 1
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

  it('should expose default timezone as constant', () => {
    expect(Party.DEFAULT_TIMEZONE).to.exist;
    expect(Party.DEFAULT_TIMEZONE).to.be.a('string');
    expect(Party.DEFAULT_TIMEZONE).to.not.be.empty;
  });

  it('should expose default party disaster phases as constant', () => {
    expect(Party.DEFAULT_DISASTER_PHASE).to.exist;
    expect(Party.DEFAULT_DISASTER_PHASE).to.be.a('string');
    expect(Party.DEFAULT_DISASTER_PHASE).to.not.be.empty;
  });

  it('should expose acceptable party disaster phases as constant', () => {
    expect(Party.DISASTER_PHASES).to.exist;
    expect(Party.DISASTER_PHASES).to.be.an('array');
    expect(Party.DISASTER_PHASES).to.have.length.at.least(1);
  });

});
