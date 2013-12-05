'use strict';

angular.module('crossedWordsApp')
  .controller('MainCtrl', function ($scope) {
    
    // chaine de guidage
    $scope.chain = "abcdefgh"; 
    $scope.side = 50; 
    //décodage de la chaine de guidage pour reconstruire la grille
    $scope.upChain = function(){
       var tab = $scope.chain.split('');
       $scope.cases_exemple = {};
       for( var i=0 ; i < ($scope.crossbox.width * $scope.crossbox.height ) ; i++){
           
           if(tab[i] != '' ){
               if(tab[i] != undefined ){
                  $scope.cases_exemple[i] = {
               id: i,
               row: i,
               col : i/$scope.crossbox.width ,
               content :  tab[i] ,
               word : 1,
               class : 'downlight'
                } 
               }
               else{
                   $scope.cases_exemple[i] = {
               id: i,
               row: i,
               col : i,
               content : '' ,
               word : 2,
               class : 'downlight'
               }
              
            }     
           }
           
           
       }
    }; 
    $scope.highLight = function(number){
        console.log(number)
       var tab = $scope.chain.split('');
       
       for( var i=0 ; i < ($scope.crossbox.width * $scope.crossbox.height ) ; i++){
          var lacase = $scope.cases_exemple[i];
               if(lacase.word == number ){
                  lacase.light = !lacase.light
               }
           }
    }; 
    //décodage de la chaine de guidage pour reconstruire la grille
    $scope.upCase = function(){
       
       
    }; 

    $scope.crossbox = {width : 5 , height : 5};
    
    $scope.mots = 1;
    $scope.cases_exemple = [
        {id:1, row: 1, col: 1, content: 'a', word:1},
        {id:2, row: 1, col: 2, content: 'b', word:1},
        {id:3, row: 1, col: 3, content: 'c', word:1},
        {id:4, row: 1, col: 4, content: 'd', word:1},
        {id:5, row: 1, col: 5, content: 'e', word:1}];

  });