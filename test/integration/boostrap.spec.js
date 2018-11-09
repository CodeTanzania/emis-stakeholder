'use strict';


/* ensure test env */
process.env.NODE_ENV = 'test';
process.env.MONGODB_URI =
  (process.env.MONGODB_URI || 'mongodb://localhost/emis-stakeholder');


/* dependencies */
const mongoose = require('mongoose');


/* clean and restore database */
const wipe = done => {
  if (mongoose.connection && mongoose.connection.dropDatabase) {
    mongoose.connection.dropDatabase(done);
  } else {
    done();
  }
};


/* setup database */
before((done) => {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, done);
});


/* clear database */
before(wipe);


/* clear database */
after(wipe);
