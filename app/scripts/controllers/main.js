'use strict';

angular.module('crossedWordsApp')
  .controller('MainCtrl', function ($scope) {
    
    // chaine de guidage
    $scope.chain = "abcdefgh"; 
    //décodage de la chaine de guidage pour reconstruire la grille
    $scope.upChain = function(){
       var tab = $scope.chain.split('');
       $scope.cases_exemple = {};
       for( var i=0 ; i < ($scope.crossbox.width * $scope.crossbox.height ) ; i++){
           $scope.cases_exemple[i] = {
               row: i,
               col : 1,
               content : tab[i],
               word : 1
           }
       }
    }; 
    $scope.crossbox = {width : 10 , height : 10};
    
    $scope.mots = 1;
    $scope.cases_exemple = [
        {row: 1, col: 1, content: 'a', word:1},
        {row: 1, col: 2, content: 'b', word:1},
        {row: 1, col: 3, content: 'c', word:1},
        {row: 1, col: 4, content: 'd', word:1},
        {row: 1, col: 5, content: 'e', word:1}];
    
    
    
  });