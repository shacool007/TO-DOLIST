const monogoose = require('mongoose');

monogoose.connect("mongodb://localhost/development");

const db = monogoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("sucessfully connected to db");
});

module.exports=db;