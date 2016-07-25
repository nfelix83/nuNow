const scrapeController = require('./scrapeController.js');

module.exports = function(app) {
  app.get('/scrape/facebook', scrapeController.scrapeFacebook);
}
