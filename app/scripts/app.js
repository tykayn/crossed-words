/**
* au survol, mettre en surbrillance le mot
 */
$('.case').on('mouseenter' , function(){
    var nbWord = $(this).attr('data-word');
    console.log('word' + nbWord)
    $('.word_' + nbWord ).addClass('highlight');
}).on('mouseleave' , function(){
    var nbWord = $(this).attr('data-word');
    $('.word_' + nbWord ).removeClass('highlight');
})


'use strict';

angular.module('crossedWordsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });