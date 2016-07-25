function scrapeFacebook(loginParams, scrapeTimeInSeconds) {
  const phantom = require('phantom');
  const cheerio = require('cheerio');
  require('dotenv').config();

  let sitepage = null;
  let phInstance = null;
  let posts = [];

  return new Promise((resolve, reject) => {
    phantom.create()
    .then(instance => {
      phInstance = instance;
      return instance.createPage();
    })
    .then(page => {
      sitepage = page;
      sitepage.property('onConsoleMessage', function(msg) {
        console.log("CM: " + msg);
      });
      return page.open('https://m.facebook.com/');
    })
    .then(status => {
      console.log(status);
      sitepage.evaluate(function(args) {
          document.querySelector(args[0].usernameSelector).value = args[1].FB_USER;
          document.querySelector(args[0].passwordSelector).value = args[1].FB_PW;
          document.querySelector(args[0].buttonSelector).click();
          return;
        }, [loginParams, process.env])
        .then(() => {
          setTimeout(function() {
            sitepage.evaluate(function() {
              document.querySelector('#bookmarks_jewel a').click();
            }).then(() => {
              setTimeout(function() {
                sitepage.evaluate(function() {
                  document.querySelector('[data-testid="most_recent_tab"]').parentNode.click();
                }).then(() => {
                  setTimeout(function() {
                    sitepage.evaluate(function() {
                        window.scrollBy(0, 10000);
                        window.setInterval(function() {
                          window.scrollBy(0, 10000);
                        }, 800)
                        return;
                      })
                      .then(() => {
                        setTimeout(function() {
                          sitepage.property('content')
                            .then((content) => {
                              $ = cheerio.load(content);
                              $('#m_newsfeed_stream article').each(function(i, el) {
                                let time = $(el).find('._52jc abbr').text();
                                if (time) {
                                  let post = {
                                    name: $(el).find('._52jd a').text(),
                                    time: time,
                                    content: $(el).find('._5rgt span p').text()
                                  };

                                  let link = $(el).find('._4o50').toString();

                                  if (link) {
                                    post.link = decodeURIComponent(link.slice(link.indexOf('u=') + 2, link.indexOf('&amp;h=')));
                                    post.linkHeader = $(el).find('._55wr ._hm6').text();
                                    post.linkContent = $(el).find('._52jc._52jg._24u1._4o59._3u26._5tg_').text();
                                  }
                                  posts.push(post);
                                }
                              });
                              phInstance.exit();
                              resolve(posts);
                            });
                        }, scrapeTimeInSeconds * 1000);
                      });
                  }, 2000);
                });
              }, 2000);
            });
          }, 3000);
        });
    })
    .catch(error => {
      console.log(error);
      phInstance.exit();
      reject();
    });
  });
}

module.exports = {
  scrapeFacebook: (req, res, next) => {
    console.log('HERE')
    scrapeFacebook({
      usernameSelector: '[placeholder="Email or Phone"]',
      passwordSelector: '[placeholder="Password"]',
      buttonSelector: '[name="login"]'
    }, 30).then(content => {res.json(content)});
  }
}
