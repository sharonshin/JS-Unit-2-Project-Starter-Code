/*
  GA SF JSD6
  Sharon Shin
  Please add all Javascript code to this file.

  Not used -- only one source. 
*/


'use strict';

$(document).ready(function(){

var newsUrl = "https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&";
var apiKey = "apiKey=b1d1f7d59bdc4ea295496c98926660a0";


$.ajax({
  
    url: newsUrl+apiKey,
    data: {
        format: 'json',
    },

    beforeSend: function(){
      $('#popUp').removeClass('hidden');
    },

    complete: function(){
      $('#popUp').addClass('hidden');
    },

    error: function(request, errorType, errorMessage){
      alert('Error: '+ errorType + ' with message: ' + errorMessage);
    },
    timeout: 5000,

    success: function(response){


  for(var i = 0; i<response.articles.length; i++){

        //create new article class
        var $newArticle = $('<article>').addClass('article');

        //create 1st section in article - image
        var $featuredImage = $('<section>').addClass('featuredImage')
        var link = response.articles[i].urlToImage;
        $('<img src='+link+'>').appendTo($featuredImage);

        //create 2nd section in article - title link 
        var $articleContent = $('<section>').addClass('articleContent');
        //var newsLink = response.articles[i].url;
        var newsLink = "#";
        var $newsLink = $('<a href='+newsLink+'>'+'</a>');
        var title = response.articles[i].title;
        var $title = $('<h3>'+title+'</h3>');
        var $subHeading = $('<h6>'+"Entertainment"+'</h6>');

        //skipped impressions.

        var $clearDiv = $('<div>').addClass('clearfix');

         $('#main').append($newArticle);
        $newArticle.append($featuredImage);
        $newArticle.append($articleContent);
        $articleContent.append($newsLink);
        $newsLink.append($title);
        $articleContent.append($subHeading);
        $newArticle.append($clearDiv);



}
      //click on title results in popup (remove hidden loader class)
    $('#main').click('articleContent',function(event){
      event.preventDefault(); 
      
      $('#popUp').removeClass('loader hidden');

      //pop up content - title
      $('#popUp .container h1').text($(event.target).text());

      //pop up content - paragraph
      var articleIndex = ($(event.target).index('h3'));
      var description = response.articles[articleIndex].description;
      $('#popUp .container p').text(description);

      //pop up content - link
      var articleUrl = response.articles[articleIndex].url;     
      $('#popUp .popUpAction').click('popUpAction', function(event){
        $('.popUpAction').attr('href',articleUrl);
      });

    })

      // in pop up, click x to make pop up hidden. 
    $('#popUp .closePopUp').click('closePopUp', function(event){
      $('#popUp').addClass('loader hidden');
    });

    $('#search').click('search', function(event){
      $('#search').toggleClass('active');
    });


}
});
});

