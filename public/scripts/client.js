/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



$(document).ready(function() {
 
  // ensures input cannot be used to alter any files
  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // loops through all tweets from /tweets route and sends each tweet into createTweetElement() before rendering in the browser.
  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');
    for (const tweet of tweets) {
      console.log(tweet);
      $tweetsContainer.prepend(createTweetElement(tweet));
    }
  };

  const createTweetElement = function(tweetObj) {
    const tweetUser = tweetObj.user;
    const tweetContent = tweetObj.content;
    const tweetCreated = tweetObj.created_at;
    const today = Date.now();
    const daysDifference = Math.round((today - tweetCreated) / (1000 * 3600 * 24));
    
    const $tweet = $(`
      <article class="tweet-body hover-tweet">
        <header class="tweet-header">
          <div class="tweet-left">
            <img class="tweet-img" src="${escape(tweetUser.avatars)}">
            <p class="tweet-name">${escape(tweetUser.name)}</p>
          </div>
          <p class="tweet-right hover-tweet">${escape(tweetUser.handle)}</p>
        </header>
        <section class="tweet-content">
          <p class="tweet">${escape(tweetContent.text)}</p>
        </section>
        <footer class="tweet-footer">
          <p class="tweet-date">${escape(daysDifference)} days ago</p>
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

  // using jQuery AJAX GET request
  const loadTweets = function() {
    $('#tweets-container').empty();
    $.getJSON('/tweets')
      .then(renderTweets);
  };
 
  // jQuery AJAX POST request
  $('.tweet-form').submit(function(event) {
    event.preventDefault();
    const formData = $(this).serialize();

    const $counter = Number($('.counter')[0].innerText);
    const $tweetAlert = $('.tweet-alert');
    const $alertMsg = $('.alert-msg');
    
    if ($counter === 140) {
      const noText = 'Oops, you forgot to write a message!';
      $alertMsg.text(`${noText}`);
      $tweetAlert.slideDown('slow').delay(3000).slideUp('slow');
      return;

    } else if ($counter < 0) {
      const overLmt = 'Oops, you went over the character limit!';
      $alertMsg.text(`${overLmt}`);
      $tweetAlert.slideDown('slow').delay(3000).slideUp('slow');
      return;

    }

    $.post('/tweets', formData)
      .then(() => {
        $(this)[0].reset();
        loadTweets();
      });
  });

  // Compose new tweet
  $('.write-new').click(function() {
    $('.tweet-form').slideToggle('slow');
  });

  $('.write-new').click(function() {
    $('#down-arrw-icon').toggleClass('flip');
  });


  // Main function call to load all existing/new tweets into <main>
  loadTweets();



});
