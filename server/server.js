let express   = require('express'),
    mongoose  = require('mongoose');

let app = express();

mongoose.connect('mongodb://localhost/nunow');

require('./config/middleware.js')(app, express);

app.listen(8080);

module.exports = app;
