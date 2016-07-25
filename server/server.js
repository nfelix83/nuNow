let express   = require('express'),
    mongoose  = require('mongoose'),
    scraper    = require('./config/helpers');

let app = express();

require('./config/middleware.js')(app, express);

// mongoose.connect(process.env.DB_PATH);

// app.listen(process.env.PORT);

module.exports = app;

scraper.scrape({
  usernameSelector: '[placeholder="Email or Phone"]',
  passwordSelector: '[placeholder="Password"]',
  buttonSelector: '[name="login"]'
});
