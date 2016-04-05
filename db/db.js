var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nunow');

var db = mongoose.connection;

db.on('error', function (error) {
  console.error.bind(console, error);
});

db.once('open', function () {
});
