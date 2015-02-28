$(document).ready(function(){
  var $body = $('body');
  var $main = $('.main');
  var index = 0;
  
  
  var update_tweets = function(){
    var showIdx;
    while(index < streams.home.length){
      var tweet = streams.home[index];
      var $tweet = $('<div class="tweet hidden"></div>');
      var userLink = '<small><b><a href="//' + tweet.user + '" class="profile" data-user="' + 
      tweet.user + '">@' + 
      tweet.user + '</a></b> ';
      $tweet.html(userLink + tweet.created_at.toUTCString() + 
                  ':</small><br>' + tweet.message);
      $tweet.prependTo($main);
      index += 1;
    }
    var $hidden = $('.hidden');
    $hidden.find('a').on('click', profile_click);
    $hidden.slideDown(800,'swing',function(){
      $hidden.removeClass("hidden");
    });
  };
  
  var profile_click = function(event){
    event.preventDefault();
    console.log($(this).data("user"));
  };
  
  update_tweets();
  setInterval(update_tweets, 10000);
});
