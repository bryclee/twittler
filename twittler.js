$(document).ready(function(){
  var $body = $('body');
  var $main = $('.main');
  var index = 0,
      numTweets = 0,
      maxTweets = 50;
  
  
  var update_tweets = function(){
    while(index < streams.home.length){
      var tweet = streams.home[index];
      var $tweet = create_tweet(tweet, "tweet hidden");
      $tweet.prependTo($main);
      index += 1;
      numTweets += 1;
    }
    // display new tweets
    var $hidden = $('.hidden');
    $hidden.find('a').on('click', profile_click);
    $hidden.slideDown(800,'swing',function(){
      $hidden.removeClass("hidden");
    });
    if (numTweets > maxTweets){
      $('.main').find('.tweet').slice(maxTweets).remove();
    }
  };  
  
  var create_tweet = function(tweet, classes){
    var $tweet = $('<div class="' + classes + '"></div>');
    var userLink = '<small><b><a href="//' + tweet.user + '" class="profile" data-user="' + 
      tweet.user + '">@' + 
      tweet.user + '</a></b> ';
    $tweet.html(userLink + tweet.created_at.toUTCString() + 
                  ':</small><br>' + tweet.message);
    
    return $tweet;
  };
  
  var profile_click = function(event){
    // popup overlay of profile
    event.preventDefault();
    var user = $(this).data("user");
    var $overlay = $('<div class="overlay"></div>');
    var $modal = $('<div class="modal"></div>');
    var $userTitle = $('<div class="user-container"></div>');
    $userTitle.append('<h2><a>@' + user + '</a></h2>');
    $userTitle.append('<h3>Recent tweets:</h3>');
    $userTitle.appendTo($modal);
    var tweets = streams.users[user].slice(streams.users[user].length - 6);
    for (var i = 0; i < tweets.length; i++){
      var $tweet = create_tweet(tweets[i], "profile-tweet");
      $tweet.find('a').on('click', function(event){
        event.preventDefault();
      });
      console.log($tweet);
      $userTitle.after($tweet);
    }
    
    // make appear
    $modal.prependTo($body).fadeIn('fast');
    $overlay.prependTo($body).fadeIn('fast');
    $overlay.on('click', function(){
      $modal.remove();
      $overlay.remove();
    });
  };
  
  update_tweets();
  setInterval(update_tweets, 10000);
});
