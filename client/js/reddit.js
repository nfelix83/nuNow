let request = require('request');

request.get('http://www.reddit.com/hot.json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(response);
  }
});
