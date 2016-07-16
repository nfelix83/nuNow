let defaultController = require('../controllers/default.controller');

module.exports = function (app) {
  app.use('/', defaultController.default);
}
