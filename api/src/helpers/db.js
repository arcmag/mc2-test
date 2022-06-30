const mongoose = require('mongoose');
const {host, port, db} = require('../configuration/index.js');

module.exports.connectDb = () => {
  mongoose.connect(db, {
    useNewUrlParser: true
  });

  return mongoose.connection;
};

