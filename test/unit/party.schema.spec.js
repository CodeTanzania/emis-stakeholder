'use strict';

/* dependencies */
const { expect } = require('chai');
const { Schema } = require('mongoose');
const { Predefine } = require('@lykmapipo/predefine');
const { Party } = require('../..');

describe('Party Schema', () => {
  it('should have party field', () => {
    const party = Party.path('party');

    expect(party).to.exist;
    expect(party).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(party.options).to.exist;
    expect(party.options).to.be.an('object');
    expect(party.options.type).to.exist;
    expect(party.options.ref).to.exist;
    expect(party.options.exists).to.be.true;
    expect(party.options.aggregatable).to.exist.and.be.an('object');
    expect(party.options.autopopulate).to.exist;
    expect(party.options.index).to.be.true;
  });

  it('should have type field', () => {
    const type = Party.path('type');

    expect(type).to.exist;
    expect(type).to.be.an.instanceof(Schema.Types.String);
    expect(type.options).to.exist;
    expect(type.options).to.be.an('object');
    expect(type.options.type).to.exist;
    expect(type.options.trim).to.be.true;
    expect(type.options.enum).to.exist;
    expect(type.options.index).to.be.true;
    expect(type.options.searchable).to.be.true;
    expect(type.options.fake).to.be.true;
  });

  it('should have group field', () => {
    const group = Party.path('group');

    expect(group).to.exist;
    expect(group).to.be.instanceof(Schema.Types.ObjectId);
    expect(group.options).to.exist;
    expect(group.options).to.be.an('object');
    expect(group.options.type).to.exist;
    expect(group.options.ref).to.exist;
    expect(group.options.ref).to.be.equal(Predefine.MODEL_NAME);
    // expect(group.options.required).to.be.true;
    expect(group.options.default).to.be.undefined;
    expect(group.options.index).to.be.true;
    expect(group.options.exists).to.be.true;
    expect(group.options.aggregatable).to.exist.and.be.an('object');
    expect(group.options.autopopulate).to.exist;
  });

  it('should have name field', () => {
    const name = Party.path('name');

    expect(name).to.exist;
    expect(name).to.be.an.instanceof(Schema.Types.String);
    expect(name.options).to.exist;
    expect(name.options).to.be.an('object');
    expect(name.options.type).to.exist;
    expect(name.options.trim).to.be.true;
    expect(name.options.required).to.be.true;
    expect(name.options.index).to.be.true;
    expect(name.options.searchable).to.be.true;
    expect(name.options.fake).to.exist;
  });

  it('should have abbreviation field', () => {
    const abbreviation = Party.path('abbreviation');

    expect(abbreviation).to.exist;
    expect(abbreviation).to.be.an.instanceof(Schema.Types.String);
    expect(abbreviation.options).to.exist;
    expect(abbreviation.options).to.be.an('object');
    expect(abbreviation.options.type).to.exist;
    expect(abbreviation.options.trim).to.be.true;
    expect(abbreviation.options.uppercase).to.be.true;
    expect(abbreviation.options.index).to.be.true;
    expect(abbreviation.options.searchable).to.be.true;
    expect(abbreviation.options.fake).to.exist;
  });

  it('should have locale field', () => {
    const locale = Party.path('locale');

    expect(locale).to.exist;
    expect(locale).to.be.an.instanceof(Schema.Types.String);
    expect(locale.options).to.exist;
    expect(locale.options).to.be.an('object');
    expect(locale.options.type).to.exist;
    expect(locale.options.trim).to.be.true;
    expect(locale.options.enum).to.be.exist;
    expect(locale.options.index).to.be.true;
    expect(locale.options.searchable).to.be.true;
    expect(locale.options.fake).to.exist;
  });

  it('should have email field', () => {
    const email = Party.path('email');

    expect(email).to.exist;
    expect(email).to.be.an.instanceof(Schema.Types.String);
    expect(email.options).to.exist;
    expect(email.options).to.be.an('object');
    expect(email.options.type).to.exist;
    expect(email.options.trim).to.be.true;
    expect(email.options.required).to.be.true;
    expect(email.options.lowercase).to.be.true;
    expect(email.options.email).to.be.true;
    expect(email.options.searchable).to.be.true;
    expect(email.options.fake).to.exist;
    expect(email.options.index).to.be.true;
    expect(email.options.unique).to.be.true;
  });

  it('should have password field', () => {
    const password = Party.path('password');

    expect(password).to.exist;
    expect(password).to.be.an.instanceof(Schema.Types.String);
    expect(password.options).to.exist;
    expect(password.options).to.be.an('object');
    expect(password.options.type).to.exist;
    expect(password.options.trim).to.be.true;
    expect(password.options.required).to.be.true;
    expect(password.options.fake).to.exist;
  });

  it('should have mobile field', () => {
    const mobile = Party.path('mobile');

    expect(mobile).to.exist;
    expect(mobile).to.be.an.instanceof(Schema.Types.String);
    expect(mobile.options).to.exist;
    expect(mobile.options).to.be.an('object');
    expect(mobile.options.type).to.exist;
    expect(mobile.options.trim).to.be.true;
    expect(mobile.options.required).to.be.true;
    expect(mobile.options.searchable).to.be.true;
    expect(mobile.options.fake).to.exist;
    expect(mobile.options.index).to.be.true;
    expect(mobile.options.unique).to.be.true;
  });

  it('should have landline field', () => {
    const landline = Party.path('landline');

    expect(landline).to.exist;
    expect(landline).to.be.an.instanceof(Schema.Types.String);
    expect(landline.options).to.exist;
    expect(landline.options).to.be.an('object');
    expect(landline.options.type).to.exist;
    expect(landline.options.trim).to.be.true;
    expect(landline.options.searchable).to.be.true;
    expect(landline.options.fake).to.exist;
    expect(landline.options.index).to.be.true;
  });

  it('should have fax field', () => {
    const fax = Party.path('fax');

    expect(fax).to.exist;
    expect(fax).to.be.an.instanceof(Schema.Types.String);
    expect(fax.options).to.exist;
    expect(fax.options).to.be.an('object');
    expect(fax.options.type).to.exist;
    expect(fax.options.trim).to.be.true;
    expect(fax.options.searchable).to.be.true;
    expect(fax.options.fake).to.exist;
    expect(fax.options.index).to.be.true;
  });

  it('should have website field', () => {
    const website = Party.path('website');

    expect(website).to.exist;
    expect(website).to.be.an.instanceof(Schema.Types.String);
    expect(website.options).to.exist;
    expect(website.options).to.be.an('object');
    expect(website.options.type).to.exist;
    expect(website.options.trim).to.be.true;
    expect(website.options.searchable).to.be.true;
    expect(website.options.fake).to.exist;
    expect(website.options.index).to.be.true;
  });

  it('should have physicalAddress field', function () {
    const physicalAddress = Party.path('physicalAddress');

    expect(physicalAddress).to.exist;
    expect(physicalAddress).to.be.an.instanceof(Schema.Types.String);
    expect(physicalAddress.options).to.exist;
    expect(physicalAddress.options).to.be.an('object');
    expect(physicalAddress.options.type).to.exist;
    expect(physicalAddress.options.searchable).to.be.true;
    expect(physicalAddress.options.trim).to.be.true;
    expect(physicalAddress.options.index).to.be.true;
    expect(physicalAddress.options.fake).to.exist;
  });

  it('should have postalAddress field', function () {
    const postalAddress = Party.path('postalAddress');

    expect(postalAddress).to.exist;
    expect(postalAddress).to.be.an.instanceof(Schema.Types.String);
    expect(postalAddress.options).to.exist;
    expect(postalAddress.options).to.be.an('object');
    expect(postalAddress.options.type).to.exist;
    expect(postalAddress.options.trim).to.be.true;
    expect(postalAddress.options.searchable).to.be.true;
    expect(postalAddress.options.index).to.be.true;
    expect(postalAddress.options.fake).to.exist;
  });

  it('should have centre field', () => {
    const centre = Party.path('centre');
    const type = Party.path('centre.type');
    const coordinates = Party.path('centre.coordinates');

    expect(centre).to.exist;
    expect(type).to.be.instanceof(Schema.Types.String);
    expect(coordinates).to.be.instanceof(Schema.Types.Array);
  });

  it('should have area field', () => {
    const area = Party.path('area');

    expect(area).to.exist;
    expect(area).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(area.options).to.exist;
    expect(area.options).to.be.an('object');
    expect(area.options.type).to.exist;
    expect(area.options.ref).to.exist;
    expect(area.options.ref).to.be.eql(Predefine.MODEL_NAME);
    // expect(area.options.required).to.be.true;
    expect(area.options.index).to.be.true;
    expect(area.options.exists).to.be.true;
    expect(area.options.autopopulate).to.exist;
    expect(area.options.aggregatable).to.exist.and.be.an('object');
    expect(area.options.autopopulate).to.be.an('object');
  });

  it('should have level field', () => {
    const level = Party.path('level');

    expect(level).to.exist;
    expect(level).to.be.an.instanceof(Schema.Types.ObjectId);
    expect(level.options).to.exist;
    expect(level.options).to.be.an('object');
    expect(level.options.type).to.exist;
    expect(level.options.ref).to.exist;
    expect(level.options.ref).to.be.eql(Predefine.MODEL_NAME);
    // expect(level.options.required).to.be.true;
    expect(level.options.index).to.be.true;
    expect(level.options.exists).to.be.true;
    expect(level.options.autopopulate).to.exist;
    expect(level.options.aggregatable).to.exist.and.be.an('object');
    expect(level.options.autopopulate).to.be.an('object');
  });

  it('should have role field', () => {
    const role = Party.path('role');

    expect(role).to.exist;
    expect(role).to.be.instanceof(Schema.Types.ObjectId);
    expect(role.options).to.exist;
    expect(role.options).to.be.an('object');
    expect(role.options.type).to.exist;
    expect(role.options.ref).to.exist;
    expect(role.options.ref).to.be.equal(Predefine.MODEL_NAME);
    // expect(role.options.required).to.be.true;
    expect(role.options.default).to.be.undefined;
    expect(role.options.index).to.be.true;
    expect(role.options.exists).to.be.true;
    expect(role.options.aggregatable).to.exist.and.be.an('object');
    expect(role.options.autopopulate).to.exist;
  });

  it('should have token field', () => {
    const token = Party.path('token');

    expect(token).to.exist;
    expect(token).to.be.an.instanceof(Schema.Types.String);
    expect(token.options).to.exist;
    expect(token.options).to.be.an('object');
    expect(token.options.type).to.exist;
    expect(token.options.trim).to.be.true;
  });
});
