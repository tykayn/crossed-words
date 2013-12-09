'use strict';

angular.module('crossedWordsApp')
        .controller('MainCtrl', function($scope) {

            // chaine de guidage
            $scope.chain = "abcdefgh";
            $scope.editChain = '';
            $scope.editResponse = '';
            $scope.editEnigme = '';
            $scope.editWords = [];
            $scope.editDirection = 'droite';
            $scope.Edition = true;
            $scope.directions = [
                {'descr': 'haut'},
                {'descr': 'bas'},
                {'descr': 'gauche'},
                {'descr': 'droite'}
            ];
            $scope.crossbox = {width: 10, height: 10};
            $scope.startId = 0;

            $scope.mots = [];
            $scope.side = 50;
            //décodage de la chaine de guidage pour reconstruire la grille
            $scope.upChain = function() {
                var tab = $scope.chain.split('');
                $scope.cases_exemple = [{}];
                $scope.cases_edit = [{}];
                for (var i = 0; i < ($scope.crossbox.width * $scope.crossbox.height); i++) {

                    if (tab[i] != '') {
                        if (tab[i] != undefined) {
                            $scope.cases_exemple[i] = {
                                id: i,
                                row: i,
                                col: i / $scope.crossbox.width,
                                content: tab[i],
                                word: 1,
                                class: 'downlight'
                            }
                        }
                        else {
                            $scope.cases_exemple[i] = {
                                id: i,
                                row: i,
                                col: i,
                                content: '',
                                word: 2,
                                class: 'downlight'
                            }

                        }
                    }


                }
            };
            $scope.highLight = function(number) {
                var tab = $scope.chain.split('');

                for (var i = 0; i < ($scope.crossbox.width * $scope.crossbox.height); i++) {
                    var lacase = $scope.cases_exemple[i];
                    if (lacase.word == number) {
                        lacase.light = !lacase.light
                    }
                }
            };
            //décodage de la chaine de guidage pour reconstruire la grille
            $scope.upCase = function() {


            };
            $scope.removeEnigme = function(index) {
                $scope.editWords.splice(index,1);

            };

            // ajout dans la chaine de guidage du tableau d'édition
            $scope.addEditChain = function(id) {
                $scope.startId = id;
            };


            // décrypte le tableau d'édition pour en faire une chaine de  guidage
            $scope.editToChain = function(array) {
                //pour chaque énigme, placer sa réponse selon son orientation
                // cases est la chaine de guidage des réponses à construire
                var cases = $scope.cases_edit;
                //    var cases = [];

                var num_mot = 0;
                //à chaque énigme, définir les cases selon le point de départ
                for (var i = 0; i <= array.length; i++) {
                    if (array[i] != null) {
                        num_mot++; // passer au mot suivant    
                        var enigme = array[i];

                        var longueur = enigme.response.length
                        var tab = enigme.response.split('');
                        console.log(' tab ' + tab);
                        var idFin = enigme.start;
                        var arrivee = longueur + enigme.start * 1;
                        // limiter l'arrivée au nombre de cases
                        if (arrivee > ($scope.crossbox.width * $scope.crossbox.height)) {
                            arrivee = $scope.crossbox.width * $scope.crossbox.height;
                        }
                        // compteur de lettre car le tableau de réponse n'a pas les mêmes indexes que ceux des cases
                        var compt = 0;

                        if (enigme.direction.descr == 'droite') {


                            for (var j = enigme.start; j <= arrivee; j++) {
                                console.log('j ' + j + ' /' + arrivee);
                                var lacase = {};
                                lacase.id = j;
                                lacase.word = num_mot;
                                lacase.content = tab[compt];
                                compt++;
                                cases[j] = lacase;
                                console.log(lacase);
                            }
                        }
                        else if (enigme.direction.descr == 'gauche') {
                            var arrivee = enigme.start - longueur * 1;

                            for (var j = enigme.start; j >= arrivee; j--) {
                                console.log('j ' + j + ' /' + arrivee);
                                var lacase = {};
                                lacase.id = j;
                                lacase.word = num_mot;
                                lacase.content = tab[compt];
                                compt++;
                                cases[j] = lacase;
                                console.log(lacase);
                            }
                        }
                        else if (enigme.direction.descr == 'bas') {
                            var arrivee = enigme.start + (longueur * $scope.crossbox.width);
                            for (var j = enigme.start; j <= arrivee; j += $scope.crossbox.width) {
                                console.log('j ' + j + ' /' + arrivee);
                                var lacase = {};
                                lacase.id = j;
                                lacase.word = num_mot;
                                lacase.content = tab[compt];
                                compt++;
                                cases[j] = lacase;
                                console.log(lacase);
                            }

                        }
                        else if (enigme.direction.descr == 'haut') {
                            var arrivee = enigme.start - (longueur * $scope.crossbox.width);

                            for (var j = enigme.start; j >= arrivee; j -= $scope.crossbox.width) {
                                console.log('j ' + j + ' /' + arrivee);
                                var lacase = {};
                                lacase.id = j;
                                lacase.word = num_mot;
                                lacase.content = tab[compt];
                                compt++;
                                cases[j] = lacase;
                                console.log(lacase);
                            }
                        }
                    }


                }

                // rendre la chaine de guidage dans la vue d'édition
                $scope.cases_edit = cases;

            }
            // ajoute le mot dans le tableau d'édition
            $scope.validateWord = function(startId) {
                var i = $scope.editWords.length + 1;
                var word = {};
                word.response = $scope.editResponse;
                word.enigme = $scope.editEnigme;
                word.start = $scope.startId;
                word.direction = $scope.editDirection;

                $scope.editWords.push(word);
                $scope.editToChain($scope.editWords)
            };
            // comparer la réponse donnée par l'utilisateur et la bonne
            $scope.compare = function() {
                for (var i = 0; i < ($scope.mots.length); i++) {
                    if ($scope.mots[i].reponse == $scope.mots[i].input) {
                        $scope.mots[i].ok = true;
                    }
                }

            };


            $scope.cases_edit = [
                {id: 1, row: 1, col: 1, content: 'a', word: 1},
            ];
            $scope.mots = [
                {id: 1,
                    enigme: "oiseau léger",
                    reponse: "sumotori",
                },
                {id: 2,
                    enigme: "callypiges",
                    reponse: "fesses",
                },
            ];
            $scope.cases_exemple = [
                {id: 1, row: 1, col: 1, content: 'a', word: 1},
                {id: 2, row: 1, col: 2, content: 'b', word: 1},
                {id: 3, row: 1, col: 3, content: 'c', word: 1},
                {id: 4, row: 1, col: 4, content: 'd', word: 1},
                {id: 5, row: 1, col: 5, content: 'e', word: 1}];

        });