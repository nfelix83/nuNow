let request = require('request'),
    fs      = require('fs');

require('dotenv').config();

describe('Initial Server Test', function() {
  it('Request to "/" should serve index.html', function(done) {
    request("http://localhost:" + process.env.PORT, (err, res, body) => {
      fs.readFile('client/index.html', 'utf8', (err, data) => {
        expect(data === body).toBe(true);
        done();
      });
    });
  });
});
