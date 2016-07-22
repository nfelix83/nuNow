

function scrape () {
  var phantom = require('phantom');
  var cheerio = require('cheerio');
var sitepage = null;
var phInstance = null;
var content = null;
var posts = null;

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
    sitepage.evaluate(function(env) {
      document.querySelectorAll('[placeholder="Email or Phone"]')[0].value = env.FB_USER;
      document.querySelectorAll('[placeholder="Password"]')[0].value = env.FB_PW;
      document.querySelectorAll('[name="login"]')[0].click();
      return;
    }, process.env)
    .then(() => {
      setTimeout(function(){
        sitepage.evaluate(function() {
          document.querySelector('#bookmarks_jewel a').click();
        }).then(() => {
          setTimeout(function() {
            sitepage.evaluate(function() {
              document.querySelector('[data-testid="most_recent_tab"]').parentNode.click();
            }).then(() => {
              setTimeout(function() {
              sitepage.render('./picture2.png');
                sitepage.evaluate(function() {
                  window.setInterval(function() {
                    window.scrollBy(0, 10000);
                  }, 6000)
                  return;
                })
                .then(()=>{
                  setTimeout(function() {
                    sitepage.property('content')
                    .then((content) => {
                      $ = cheerio.load(content);
                      $('#m_newsfeed_stream article').each(function (i, el) {
                        let post = {};
                        //Name
                        console.log("Name: " + $(el).find('._52jd a').text());
                        //Time
                        console.log("Time: " + $(el).find('._52jc abbr').text());
                        //Header
                        console.log("Content: " + $(el).find('._5rgt span p').text());
                        //link
                        var link = $(el).find('._4o50').toString();
                        if (link) {
                          console.log('Link: ' + decodeURIComponent(link.slice(link.indexOf('u=') + 2, link.indexOf('&amp;h='))))
                          console.log('LinkHead: ' + $(el).find('._55wr ._hm6').text());
                          console.log('LinkContent: ' + $(el).find('._52jc._52jg._24u1._4o59._3u26._5tg_').text())
                        }
                        console.log('\n');
                      });
                    })
                    phInstance.exit();
                  }, 13000);
                })
              }, 3000)
            })
          }, 2000)
        })
      }, 5000);
    })
  })
  .catch(error => {
      console.log(error);
      phInstance.exit();
  });
}

module.exports = scrape;
