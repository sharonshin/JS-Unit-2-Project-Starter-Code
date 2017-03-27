/*
  GA SF JSD6
  Sharon Shin
  Please add all Javascript code to this file.
  
  Look at this one - multiple news sources
*/


'use strict';

$(document).ready(function(){

var ewUrl = "https://newsapi.org/v1/articles?source=entertainment-weekly&sortBy=top&";
var redditUrl = "https://newsapi.org/v1/articles?source=reddit-r-all&sortBy=top&";
var businessUrl = "https://newsapi.org/v1/articles?source=business-insider&sortBy=top&";
var apiKey = "apiKey=b1d1f7d59bdc4ea295496c98926660a0";



ApiCall(ewUrl);
ApiCall(businessUrl);
ApiCall(redditUrl);

  function ApiCall(url) {
    $.ajax({
      //async: false,
      url: url + apiKey,
      data: {
        format: 'json',
      },

      beforeSend: function () {
        $('#popUp').removeClass('hidden');
      },

      complete: function () {
        $('#popUp').addClass('hidden');
      },

      error: function (request, errorType, errorMessage) {
        alert('Error: ' + errorType + ' with message: ' + errorMessage);
      },
      timeout: 5000,

      success: function (response) {
        IterateResponse(response);
      }
    });
  }
 
  function IterateResponse(response){
    for(var i = 0; i<response.articles.length; i++){

        //create new article class
        var $newArticle = $('<article>').addClass('article');

        //create 1st section in article - image
        var $featuredImage = $('<section>').addClass('featuredImage')
        var link = response.articles[i].urlToImage;
        $('<img src='+link+'>').appendTo($featuredImage);

        //create 2nd section in article - title link 
        var $articleContent = $('<section>').addClass('articleContent');
        var newsLink = "#";
        var $newsLink = $('<a href='+newsLink+'>'+'</a>');
        var title = response.articles[i].title;
        var $title = $('<h3>'+title+'</h3>');
        var $subHeading = $('<h6>'+response.source+'</h6>');

        //skipped impressions.

        var $clearDiv = $('<div>').addClass('clearfix');

         $('#main').append($newArticle);
        $newArticle.append($featuredImage);
        $newArticle.append($articleContent);
        $articleContent.append($newsLink);
        $newsLink.append($title);
        $articleContent.append($subHeading);
        $newArticle.append($clearDiv);
        pop($articleContent, response.articles[i]);
    } 
  }

  function pop(content, resp){
    $(content).on('click', function(){
      event.preventDefault(); 

      //pop up content - title
      $('#popUp .container h1').text(resp.title);

      //pop up content - paragraph
      $('#popUp .container p').text(resp.description);

      //pop up content - link
        $('.popUpAction').attr('href',resp.url);


      $('#popUp').removeClass('loader hidden');

      // in pop up, click x to make pop up hidden. 
      $('#popUp .closePopUp').click('closePopUp', function(event){
        $('#popUp').addClass('loader hidden');
      });
    });
  }

  //search magnifying glass - opens search box. 
  $('#search').click('search', function(event){
    $('#search').toggleClass('active');
  });

$('.container').on('click', 'nav ul li ul li a', function(event){
  event.preventDefault();
  $('#main').empty();
  if($(this).text() == "Entertainment Weekly"){
    ApiCall(ewUrl);
  }
  else if($(this).text() == "Business Insider"){
    ApiCall(businessUrl);
  }
  else if($(this).text() == "Reddit"){
    ApiCall(redditUrl);
  }
});

$('header').on('click', '.container > a', function(event){
  location.reload();
});



});


    