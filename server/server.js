let express   = require('express'),
    mongoose  = require('mongoose');

let app = express();

require('./config/middleware.js')(app, express);

mongoose.connect(process.env.DB_PATH);

app.listen(process.env.PORT);

let request = require('request');

request(process.env.FB_URL, (err, res, body) => {
  console.log('HERE', body);
});

module.exports = app;
