/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const tweetData =   {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  
  
  const createTweetElement = function(tweetObj) {
    const $tweet = $(`<article class="tweet">Hello world</article>`);
    
    return $tweet;
  }
  
  const $tweet = createTweetElement(tweetData);
  
  console.log($tweet);
  $('#tweets-container').append($tweet);
  

  const renderTweets = function(tweetArr) {
    $.getJSON('/tweets')
      .then((tweets) => {
        // console.log("tweets >>", tweets);
        const $tweetsContainer = $('#tweets-container');
        for (const tweet of tweets) {
          console.log("tweet >!>", tweet);
          const tweetHTML = `
          <article class="tweet-body hover-tweet">
            <header class="tweet-header">
              <div class="tweet-left">
                <img class="tweet-img" src="${tweet.user.avatars}">
                <p class="tweet-name">${tweet.user.name}</p>
              </div>
                <p class="tweet-right hover-tweet">${tweet.user.handle}</p>
            </header>
            <section class="tweet-content">
              <p class="tweet">${tweet.content.text}</p>
            </section>
            <footer class="tweet-footer">
              <p class="tweet-date">10 days ago</p>
              <div class="tweet-icons">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
          </article>
          `
          $tweetsContainer.append(tweetHTML);
        }
      })
  }

  renderTweets(data)

// end of document ready function
});

