let express   = require('express'),
    mongoose  = require('mongoose');

let app = express();

require('./config/middleware.js')(app, express);

mongoose.connect(process.env.DB_PATH);

app.listen(8080);

module.exports = app;
