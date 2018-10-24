'use strict';


/* dependencies */
const path = require('path');
const { expect } = require('chai');
const Party = require(path.join(__dirname, '..', '..', 'lib', 'party.model'));


describe('Party Instance', () => {

  it('`preValidate` should be a function', () => {
    const party = Party.fake();
    expect(party.preValidate).to.exist;
    expect(party.preValidate).to.be.a('function');
    expect(party.preValidate.length).to.be.equal(1);
    expect(party.preValidate.name).to.be.equal('preValidate');
  });

});


describe('Party Statics', () => {

  it('should expose model name as constant', () => {
    expect(Party.MODEL_NAME).to.exist;
    expect(Party.MODEL_NAME).to.be.equal('Party');
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

});
