'use strict';


/* dependencies */
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost/emis-stakeholder';
const CONNECTION_OPTION = { useNewUrlParser: true };


/* wipe test database instance */
function wipe(done) {
  if (mongoose.connection && mongoose.connection.dropDatabase) {
    mongoose.connection.dropDatabase(done);
  } else {
    done();
  }
}


/* setup test database instance */
before(function (done) {
  mongoose.connect(MONGODB_URI, CONNECTION_OPTION, done);
});


/* clear test database instance */
before(wipe);


/* clear test database instance */
after(wipe);
