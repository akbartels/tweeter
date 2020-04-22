/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  
  // HARD CODED DATA FOR TESTING
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
  ];

  // HELPER FUNCTIONS TO CREATE A TWEET AND RENDER ON PAGE
 
  // loops through all tweets from /tweets route and sends each tweet into createTweetElement()  before rending in the browser.
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    for (const tweet of tweets) {
      console.log(tweet)
      $tweetsContainer.append(createTweetElement(tweet));
    }
  };

  
  const createTweetElement = function(tweetObj) {
    const tweetUser = tweetObj.user
    const tweetContent = tweetObj.content 
    const tweetCreated = tweetObj.created_at
    const today = Date.now();
    const daysDifference = Math.round((today - tweetCreated) / (1000 * 3600 * 24))
    
    const $tweet = $(`
      <article class="tweet-body hover-tweet">
        <header class="tweet-header">
          <div class="tweet-left">
            <img class="tweet-img" src="${tweetUser.avatars}">
            <p class="tweet-name">${tweetUser.name}</p>
          </div>
          <p class="tweet-right hover-tweet">${tweetUser.handle}</p>
        </header>
        <section class="tweet-content">
          <p class="tweet">${tweetContent.text}</p>
        </section>
        <footer class="tweet-footer">
          <p class="tweet-date">${daysDifference} days ago</p>
          <div class="tweet-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  $.getJSON('/tweets')
  .then(renderTweets)


  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.post('/tweets', formData)

    .then(() => {
      $(this)[0].reset();
      $.getJSON('/tweets')
      .then(renderTweets)
    })

    .catch(err => console.log('error >', err))
  })
  
  



  

// end of document ready function
});

// from lecture....:

// $('form').submit(function(event){
//   // prevent the default behaviour of html form
//   event.preventDefault();
//   const self = this;
//   // extract data from `this` - the form
//   const formData = $(this).serialize(); // urlencoded serialization format
//   // make ajax post with extracted data
//   $.post('/api/posts', formData)
//   // if sucess - render updated posts
//   .then(() => {
//     // $('form') but that is slightly less performant
//     $(self)[0].reset();
//     loadPosts()
//   })
//   // else - do nothing; console.error
//   .catch(err => console.log('err :>> ', err))