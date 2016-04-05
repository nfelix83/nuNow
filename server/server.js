var express = require('express');
var app = express();
var server = require('http').Server(app);
var db = require('../db/db.js');

var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');

var port = 8080;

app.use(bodyParser());
app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.sendfile(path.join(__dirname, '../client/', 'index.html'));
});

server.listen(port, function () {
  console.log('You\'re listening to the soothing sounds of port ' + port + 'AM.');
});
