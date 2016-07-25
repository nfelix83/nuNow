function getDefaultSubs() {
  const request = require('request');

  return new Promise((resolve, reject) => {
    let subs = [];

    request.get('http://www.reddit.com/subreddits/popular.json?limit=50', function(err, res, body) {
      JSON.parse(body).data.children.forEach(sub => {
        subs.push(sub.data.url);
      });
      resolve(subs);
    });
  });
};

function getRedditSubs(defaultSubs, ...subs) {
  const request = require('request');
  let subReqs = [];
  getDefaultSubs().then(subs => {
    subs.forEach(sub => {
      subReqs.push(
        new Promise((resolve, reject) => {
          let data = [];
          request.get('http://www.reddit.com' + sub.slice(0, sub.length - 1) + '.json?limit=50&raw_json=1', function(err, res, body) {
            let links = [];
            JSON.parse(body).data.children.forEach(link => {
              links.push(link.data);
            });
            resolve(links);
          });
        })
      );
    });
    Promise.all(subReqs).then(content => {
      console.log(content);
    });
  });
}

function getRedditDefault() {
  const request = require('request');
  const subs = ['/top', '/hot']
  let subReqs = [];
  subs.forEach(sub => {
    subReqs.push(
      new Promise((resolve, reject) => {
        let data = [];
        request.get('http://www.reddit.com' + sub + '.json?limit=100&raw_json=1', function(err, res, body) {
          let links = [];
          JSON.parse(body).data.children.forEach(link => {
            links.push(
              {
                subreddit: link.data.subreddit,
                title: link.data.title,
                score: link.data.score,
                name: link.data.name,
                thumb: link.data.thumbnail,
                url: link.data.url
              }
            );
          });
          resolve(links);
        });
      })
    );
  });
  return Promise.all(subReqs).then(content => {
    return content.reduce((acc, curr) => {
      curr.forEach(el => {
        acc.push(el);
      });
      return acc;
    }, []);
  });
}

module.exports = {
  fetchReddit: (req, res, next) => {
    getRedditDefault().then(content => {res.json(content)});
  }
}
