const fetchController = require('./fetchController.js');

module.exports = function(app) {
  app.get('/fetch/reddit', fetchController.fetchReddit);
}
