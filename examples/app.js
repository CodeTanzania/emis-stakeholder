'use strict';

/* dependencies */
const { get, start, mount } = require('@lykmapipo/express-common');
const { connect } = require('@lykmapipo/mongoose-common');
const { predefineRouter } = require('@lykmapipo/predefine');
const {
  info,
  permissionRouter,
  partyRouter,
  authenticationRouter,
  fetchContacts,
} = require('../');
const { campaignRouter, messageRouter } = require('@lykmapipo/postman')({
  fetchContacts,
});

// establish mongodb connection
connect(error => {
  // re-throw if error
  if (error) {
    throw error;
  }

  // expose module info
  get('/', (request, response) => {
    response.status(200);
    response.json(info);
  });

  // mount routers
  mount(
    authenticationRouter,
    permissionRouter,
    partyRouter,
    predefineRouter,
    campaignRouter,
    messageRouter
  );

  // fire the app
  start((error, env) => {
    // re-throw if error
    if (error) {
      throw error;
    }

    // start http server
    console.log(`visit http://0.0.0.0:${env.PORT}`);
  });
});
