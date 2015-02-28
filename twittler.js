$(document).ready(function(){
  var $body = $('body');
  var $main = $('.main');
  var index = 0;
  
  var update_tweets = function(){
    var showIdx;
    while(index < streams.home.length){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet hidden"></div>');
      $tweet.html('<small><b>@' + tweet.user + '</b> ' + tweet.created_at.toUTCString() + 
                  ':</small><br>' + tweet.message);
      $tweet.prependTo($main);
      index += 1;
    }
    var $hidden = $('.hidden');
    $hidden.slideDown(800,'swing',function(){
      $hidden.removeClass("hidden");
    });
  }
  
  update_tweets();
  setInterval(update_tweets, 10000);
});
