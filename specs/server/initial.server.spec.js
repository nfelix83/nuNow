let request = require('request'),
    fs      = require('fs');

describe('Initial Server Test', function() {
  it('Request to "/" should serve index.html', function(done) {
    request("http://localhost:8080", (err, res, body) => {
      fs.readFile('client/index.html', 'utf8', (err, data) => {
        expect(data === body).toBe(true);
        done();
      });
    });
  });
});
