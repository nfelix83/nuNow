let morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js');

module.exports = function (app, express) {
  let userRouter = express.Router();
  let fetchRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser());
  app.use(express.static(__dirname + '/../../client'));
};
