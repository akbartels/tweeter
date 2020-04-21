

$(document).ready(function() {
  console.log('jQuery ready')
});

const $textField = $('.tweet-field');
const $counter = $('.counter')

$textField.keyup(function () {
  const counterNum = 140
  let $tweetLength = $(this).val().length;
  
  let newLength = counterNum - $tweetLength
  $counter.val(`${newLength}`)
  
  if (newLength < 0 && !$counter.hasClass("counter-over")){
    console.log("over")
    $counter.addClass("counter-over")
  } else if (newLength >= 0 && $counter.hasClass("counter-over")) {
    $counter.removeClass("counter-over")
  }
});