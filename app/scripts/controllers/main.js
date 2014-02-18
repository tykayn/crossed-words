'use strict';
angular.module('crossedWordsApp')
        .controller('MainCtrl', function($scope) {

            // chaine de guidage
            $scope.chain = 'abcdefgh';
            $scope.editChain = '';
            $scope.editResponse = '';
            $scope.editEnigme = '';
            $scope.editWords = [];
            $scope.editDirection = 'droite';
            $scope.Edition = false;
            var tab = [];
            for (var i = 0; i < 100; i++) {
                tab[i] = {id: i, row: 1, col: 5, content: '', word: 0};
            }
            console.log(tab)
            $scope.cases_vides = tab
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
            //trouver la taille maximum de la réponse selon l'emplacement de son départ et la taille de grille.
            $scope.responseSize = function() {
                var startId = $scope.startId;
                var size = $scope.crossbox.width;


                var lines = Math.round($scope.startId / $scope.crossbox.width) + 1; // le nombre de lignes de la case arrondi au supérieur
                var linesCases = lines * $scope.crossbox.width;// le nombre de cases jusqu'au bout de la ligne
                var linesCasesMinus = (lines - 1) * $scope.crossbox.width; // le nombre de cases jusqu'au bout de la ligne
                switch ($scope.editDirection.descr)
                {
                    case 'droite':
                        // si start = 0, size vaut la largeur totale. enlever le nombre de cases de lignes -1 de l'id
                        if (startId <= $scope.crossbox.width) {
                            size = linesCases - startId;
                        }
                        else {
                            console.log(lines)
                            size = linesCases - startId;
                            // 20 - 15 // LineCases ligne courante - startid
                        }

                        break;
                    case 'gauche':
                        size = $scope.crossbox.width - (-linesCases + startId);
                        break;
                    case 'bas':
                        size = lines * $scope.crossbox.height - lines;
                        break;
                    case 'haut':
                        size = lines;
                        break;
                    default:
                        size = -linesCases + startId;
                        // si 10 de large, et que l'id est 12, on doit trouver 8 de taille de réponse.
                        // le nombre de lignes de la case, 10+2-10*2
                }


                return size;
            }

            //mise en avant de la case pour ajouter une énigme
            $scope.hlStart = function(id) {
                $scope.highLight(id);
                console.log(highLight(id));
                startId = id;
            }
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
            /* mettre en surbrillance un mot et enlever la surbrillance aux autres */
            $scope.highLightWord = function(number) {
                for (var i = 0; i < ($scope.crossbox.width * $scope.crossbox.height); i++) {
                    var lacase = $scope.cases_edit[i];
                    if (lacase.word == number) {
                        lacase.light = true;
                    }
                    else{
                        lacase.light = false;
                    }
                }
            }
            /* mettre en surbrillance une case et définir le départ d'édition a cette case */
            $scope.highLight = function(number) {
                $scope.startId = number;
               // var tab = $scope.chain.split('');
                for (var i = 0; i < ($scope.crossbox.width * $scope.crossbox.height); i++) {
                    var lacase = $scope.cases_edit[i];
                    if (lacase.word == number) {
                        lacase.light = !lacase.light
                    }
                }
            };
            //décodage de la chaine de guidage pour reconstruire la grille
            $scope.upCase = function() {


            };
            $scope.removeEnigme = function(index) {
                $scope.editWords.splice(index, 1);
                $scope.editToChain($scope.cases_edit);
            };
            // ajout dans la chaine de guidage du tableau d'édition
            $scope.addEditChain = function(id) {
                $scope.startId = id;
            };


            // donne la colonne de l'id demandé selon la taille de la grille
            $scope.getCol = function(id) {
                return id;
            }
            // donne la ligne de l'id demandé selon la taille de la grille
            $scope.getRow = function(id) {
                return id;
            }
            // décrypte le tableau d'édition pour en faire une chaine de  guidage
            $scope.editToChain = function(array) {
                //pour chaque énigme, placer sa réponse selon son orientation
                // cases est la chaine de guidage des réponses à construire
                $scope.cases_vides = $scope.casesVides();
                var cases = $scope.cases_vides;

                var num_mot = 0;
                //à chaque énigme, définir les cases selon le point de départ
                console.log('il y a  ' + array.length + ' énigmes');
                console.log(enigme);
                for (var i = 0; i < array.length; i++) {
                    if (array[i] != null) {
                        num_mot++; // passer au mot suivant    
                        var enigme = array[i];
                        console.log('editToChain enigme ');
                        console.log(enigme);
                        var longueur = enigme.response.length
                        var tab = enigme.response.split('');
                        var idFin = enigme.start;
                        var arrivee = longueur + enigme.start * 1;
                        // limiter l'arrivée au nombre de cases
                        if (arrivee > ($scope.crossbox.width * $scope.crossbox.height)) {
                            arrivee = $scope.crossbox.width * $scope.crossbox.height;
                        }
                        // compteur de lettre car le tableau de réponse n'a pas les mêmes indexes que ceux des cases
                        var compt = 0;
                        if (enigme.direction.descr == undefined) {
                            var dir = enigme.direction;
                        }
                        else {
                            var dir = enigme.direction.descr;
                        }


                        if (dir == 'droite' || dir == undefined) {

                            for (var j = enigme.start; j < arrivee; j++) {
                                var lacase = {};
                                lacase.id = j;
                                lacase.word = num_mot;
                                if (tab[compt] != '') {
                                    lacase.content = tab[compt];
                                }
                                compt++;
                                cases[j] = lacase;
                            }
                        }
                        else if (dir == 'gauche') {
                            var arrivee = enigme.start - longueur * 1;
                            for (var j = enigme.start; j > arrivee; j--) {
                                var lacase = {};
                                lacase.id = j;
                                lacase.word = num_mot;
                                if (tab[compt] != '') {
                                    lacase.content = tab[compt];
                                }
                                compt++;
                                cases[j] = lacase;

                            }
                        }
                        else if (dir == 'bas') {
                            var arrivee = enigme.start + (longueur * $scope.crossbox.width);
                            for (var j = enigme.start; j < arrivee; j += $scope.crossbox.width) {
                                var lacase = {};
                                lacase.id = j;
                                lacase.word = num_mot;
                                if (tab[compt] != '') {
                                    lacase.content = tab[compt];
                                }

                                compt++;
                                cases[j] = lacase;

                            }

                        }
                        else if (dir == 'haut') {
                            var arrivee = enigme.start - (longueur * $scope.crossbox.width);
                            for (var j = enigme.start; j > arrivee; j -= $scope.crossbox.width) {
                                var lacase = {};
                                lacase.id = j;
                                lacase.word = num_mot;
                                if (tab[compt] != '') {
                                    lacase.content = tab[compt];
                                }
                                compt++;
                                cases[j] = lacase;

                            }
                        }
                    }
                    else {
                        lacase.content = '';
                    }


                }

                // rendre la chaine de guidage dans la vue d'édition
                $scope.cases_edit = cases;
                // $scope.cases_exemple = cases;
                return cases;

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
                var compt_ok = 0;
                for (var i = 0; i < ($scope.mots.length); i++) {
                    if ($scope.mots[i].response == $scope.mots[i].input) {
                        $scope.mots[i].ok = true;
                        compt_ok++;
                    }
                }
                if (compt_ok == $scope.mots.length) {
                    $scope.won = true;
                }
                /* remplir la grille de résultat avec la réponse de l'utilisateur */
                var reponsesUser = $scope.getResponsesUser($scope.mots)
                $scope.cases_exemple = $scope.editToChain(reponsesUser);

            };
            /**
             * fait un tableau d'énigmes avec les réponses de l'utilisateur
             * à la place des bonnes réponses pour pouvoir les afficher dans une grille
             * @param {type} enigmeTab doit avoir un champ input dans chaque index
             * @returns {array} tableau d'énigmes prêt à être affiché en grille
             */
            $scope.getResponsesUser = function(enigmeTab) {
                var tabRep = new Array();
                for (var i = 0; i < enigmeTab.length; i++) {
                    tab = {};
                    if (enigmeTab[i] == undefined) {
                        enigmeTab[i] = new Array();
                    }
                    if (enigmeTab[i].input !== undefined) {
                        tab.response = enigmeTab[i].input;
                    }
                    else {
                        tab.response = '';
                    }
                    tab.id = enigmeTab[i].id;
                    tab.enigme = enigmeTab[i].enigme;
                    tab.start = enigmeTab[i].start;
                    tab.direction = enigmeTab[i].direction;
                    tabRep.push(tab);
                }
//                console.log('getResponsesUser tab');
//                console.log(tabRep)
                $scope.responsesUser = tabRep;
                return tabRep;
            }

            $scope.cases_edit = [
                {id: 1, row: 1, col: 1, content: 'a', word: 1, light: 0},
            ];
            /**
             * énigmes d'exemple
             */
            $scope.mots = [{"id": 1, "response": "sumotori", "enigme": "oiseau léger", "start": 41, "direction": {"descr": "droite"}}, {"id": 2, "response": "fesses", "enigme": "callypiges", "start": 21, "direction": {"descr": "bas"}}, {"id": 3, "response": "poulet", "enigme": "et mon cul c'est du", "start": 36, "direction": {"descr": "bas"}}]

            $scope.cases_exemple = [
                {id: 1, row: 1, col: 1, content: 'a', word: 1, light: 0},
                {id: 2, row: 1, col: 2, content: 'b', word: 1, light: 0},
                {id: 3, row: 1, col: 3, content: 'c', word: 1, light: 0},
                {id: 4, row: 1, col: 4, content: 'd', word: 1, light: 0},
                {id: 5, row: 1, col: 5, content: 'e', word: 1, light: 0}];

            /* créer une lsite de cases vides */
            $scope.casesVides = function() {
                var cases = []
                var totalCases = $scope.crossbox.width * $scope.crossbox.height

                for (var i = 0; i < totalCases; i++) {
                    cases.push({id: i})
                }

                return cases
            }
        });
        