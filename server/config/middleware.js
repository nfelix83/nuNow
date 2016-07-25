let morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js');

module.exports = function (app, express) {

  require('dotenv').config();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../client'));

  require('../scrape/scrapeRoutes.js')(app);
  require('../fetch/fetchRoutes.js')(app);
};
