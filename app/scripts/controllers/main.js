'use strict';

angular.module('crossedWordsApp')
        .controller('MainCtrl', function($scope, $http) {

            $scope.mots = {};
            $scope.wordtocase = [];
            // chaine de guidage
            $scope.chain = 'example';
            // initialisation des mots
            $scope.gogetjson = function() {
                $http({method: 'GET', url: 'json/example.json'}).
                        success(function(data, status) {
                            $scope.status = status;
                            $scope.mots = data;
                            console.log('succès');
                            console.log($scope.mots.length + ' mots à trouver');
                            $scope.initsuite();

                        }).
                        error(function(data, status) {
                            $scope.mots = data || "Request failed";
                            console.log('fail de $http get')
                            $scope.status = status;
                        });
            };

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

            $scope.cases_vides = tab;
            $scope.default_direction = {'descr': 'droite'};
            $scope.colors = [
                {name: 'black', shade: 'dark'},
                {name: 'white', shade: 'light'},
                {name: 'red', shade: 'dark'},
                {name: 'blue', shade: 'dark'},
                {name: 'yellow', shade: 'light'}
            ];

            $scope.directions = [
                {descr: 'haut'},
                {descr: 'bas'},
                {descr: 'gauche'},
                {descr: 'droite'}
            ];
            $scope.color = $scope.colors[3]; // red

            $scope.directions2 = [
                'haut',
                'bas',
                'gauche',
                'droite'
            ];
            $scope.crossbox = {width: 10, height: 10};
            $scope.startId = 0;
            $scope.side = 50; // taille des côtés de cases
            // un tableau ou l'index vaut un objet
            // plein des nombres des cases
            // pour chaque lettre devant recevoir la réponse
            $scope.wordtocase = [];

            //trouver la taille maximum de la réponse
            //selon l'emplacement de son départ et la taille de grille.
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

            /* mettre en surbrillance un mot et enlever la surbrillance aux autres */
            $scope.highLightWord = function(number) {
//                if ( number === $scope.highLighted){
//                    return;
//                }
                if (number === undefined) {
                    return;
                }

                $scope.downLightAll(number);
//                console.log('highLightWord ' + number)
//                console.log('highLightWord ' + $scope.cases.length)
                var tabcases = $scope.wordtocase[number - 1].cases; // -1 car le tableau commence a 0 et non 1.
//                console.log('tabcases ' + tabcases)
//                console.log('highLightWord ' + $scope.crossbox.width * $scope.crossbox.height)
                for (var i = 0; i < tabcases.length; i++) {
                    var lacase = $scope.cases[tabcases[i]];

                    lacase.light = true;
//                        console.log('tabcases[i] ' + tabcases[i])
//                    console.log('lacase.id ' + $scope.cases[tabcases[i]].id)
//                    console.log('lacase.light ' + $scope.cases[tabcases[i]].light)
//                        console.log('case highlightée ' + number)
//                    
                }
            }
            /* 
             /**
             * enlever la surbrillance aux autres mots que celui dont on donne l'id
             * @param {type} id
             * @returns {undefined}
             */
            $scope.downLightAll = function(id) {
//                console.log('downLightAll sauf le mot n°' + id);



                for (var i = 0; i < $scope.wordtocase.length; i++) {
                    if (i == id) {
                        continue;
                    }
//                    console.log('$scope.wordtocase.length' + $scope.wordtocase.length);
                    $scope.downLightWord(i);
                }
                $scope.highLighted = id;

            }
            $scope.downLightWord = function(number) {

                if (typeof ($scope.wordtocase[number]) === undefined) {
                    window.console.log("pas de wordtocase n°" + number);
                    return;
                }
//                console.log('downLightWord n°' + number);
                var tabcases = $scope.wordtocase[number].cases;
                for (var i = 0; i < tabcases.length; i++) {
                    var lacase = $scope.cases[tabcases[i]];
                    lacase.light = false;
                }
            }
            /* mettre le focus sur l'input */
            $scope.focusWord = function(number) {
                $('#enigme_' + number).focus().select();

            }
            $scope.upAllWords = function() {
                window.console.log("up all words");
                for (var i = 0; i < $scope.mots.length; i++) {
                    $scope.upWord(i);
                }
            }

            /* update de mot avec wordtocase */
            $scope.upWord = function(number) {
                if (typeof ($scope.mots) === undefined) {
                    console.log('NO upWord ')
                    return;
                }

//                console.log('upWord ' + number)
//                console.log($scope.mots[number])
                if (typeof ($scope.mots[number].input) === undefined) {
                    console.log('NO upWord ')
                    return;
                }
                else {
                    var input = $scope.mots[number].input;
                }

                var tabcases = $scope.wordtocase[number].cases;
//                console.log('input ' + input)
//                console.log('highLightWord ' + $scope.crossbox.width * $scope.crossbox.height)
                for (var i = 0; i < tabcases.length; i++) {
                    var lacase = $scope.cases[tabcases[i]];
                    lacase.content = input[i];
                }


            }
            /* mettre en surbrillance une case et définir le départ d'édition a cette case */
            $scope.highLight = function(number) {
                $scope.startId = number;
                var lacase = $scope.cases[number];
                lacase.light = true
            };

            $scope.removeEnigme = function(index) {
                $scope.editWords.splice(index, 1);
//                $scope.cases_edit = $scope.editToChain($scope.cases_edit);
            };



            /*
             * utilisé par editToChain()
             * @param {type} j
             * @param {type} wordtocase
             * @param {type} num_mot
             * @param {type} tab
             * @param {type} cases
             * @param {type} compt
             * @returns {undefined}
             */
            $scope.makeCase = function(j, wordtocase, num_mot, tab, cases, compt) {
                var lacase = {};
                lacase.id = j;
                wordtocase.cases.push(j);
                lacase.word = num_mot;

                // il y a superposition lorsque la lettre de la réponse actuelle
                // écrase la lettre de la case courante.
                if (tab[compt] !== '.' && tab[compt] !== '') {
                    lacase.content = tab[compt];
                    if (
                            cases[j].content !== '.' &&
                            cases[j].content !== '' &&
                            cases[j].content !== undefined &&
                            cases[j].content !== lacase.content
                            ) {

                        lacase.superposition = true;

                        if (
                                typeof (cases[j].content) !== undefined &&
                                typeof (tab[compt]) !== undefined
                                )
                        {
                            lacase.content = cases[j].content + '/' + tab[compt];
//                          console.log(lacase.content);
                        }

                    }
//                    console.log('réponse: ' + lacase.content + ' case ' + j + ':  ' + cases[j].content);
                }
                compt++;
                cases[j] = lacase;
            };

            /**
             * décrypte le tableau d'édition pour afficher les cases
             * @param {type} array
             * @returns cases
             */
            $scope.editToChain = function(array)
            {
                if (typeof (array) === undefined) {
                    array = $scope.mots;
                }
                if (typeof ($scope.mots) === undefined) {
                    return;
                }
//                window.console.log("edittochain sparti");
                //pour chaque énigme, placer sa réponse selon son orientation
                // cases est la chaine de guidage des réponses à construire
                $scope.cases_vides = $scope.casesVides();
                var cases = $scope.cases_vides;

                var num_mot = 0;
                //à chaque énigme, définir les cases selon le point de départ
                console.log('il y a  ' + array.length + ' énigmes');
//                console.log(enigme);
                for (var i = 0; i < array.length; i++) {
                    if (array[i] != null) {
                        num_mot++; // passer au mot suivant    
                        var enigme = array[i];
//                        console.log('editToChain enigme ');
//                        console.log(enigme);
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
                        if (typeof (enigme.direction.descr) === undefined) {
                            var dir = enigme.direction;
                        }
                        else {
                            var dir = enigme.direction.descr;
                        }
                        var wordtocase = {id: num_mot, cases: []};

                        if (dir === 'droite' || typeof (dir) === undefined) {

                            for (var j = enigme.start; j < arrivee; j++) {
                                $scope.makeCase(j, wordtocase, num_mot, tab, cases, compt);
                            }
                        }
                        else if (dir == 'gauche') {
                            var arrivee = enigme.start - longueur * 1;
                            for (var j = enigme.start; j > arrivee; j--) {
                                $scope.makeCase(j, wordtocase, num_mot, tab, cases, compt);
                            }
                        }
                        else if (dir == 'bas') {
                            var arrivee = enigme.start + (longueur * $scope.crossbox.width);
                            for (var j = enigme.start; j < arrivee; j += $scope.crossbox.width) {
                                $scope.makeCase(j, wordtocase, num_mot, tab, cases, compt);
                            }

                        }
                        else if (dir == 'haut') {
                            var arrivee = enigme.start - (longueur * $scope.crossbox.width);
                            for (var j = enigme.start; j > arrivee; j -= $scope.crossbox.width) {
                                $scope.makeCase(j, wordtocase, num_mot, tab, cases, compt);
                            }
                        }
                    }
                    else {
                        lacase.content = '';
                    }

                    $scope.wordtocase.push(wordtocase);
                }
                return cases;

            }
            // ajoute le mot dans le tableau d'édition
            $scope.validateWord = function(startId) {
                var i = $scope.editWords.length + 1;
                var word = {};
                word.id = i;
                word.response = $scope.editResponse;
                word.enigme = $scope.editEnigme;
                word.start = $scope.startId;
                word.direction = $scope.editDirection;
                $scope.editWords.push(word);
                $scope.editToChain($scope.editWords)
            };

            // comparer la réponse donnée par l'utilisateur et la bonne
            $scope.compare = function() {
                window.console.log("comparaison");
                var compt_ok = 0;
                for (var i = 0; i < ($scope.mots.length); i++) {
                    if ($scope.mots[i].response == $scope.mots[i].input) {
                        window.console.log(i + ' ' + $scope.mots[i].response);
                        $scope.upWord(i);
                        $scope.mots[i].ok = true;
                        compt_ok++;
                    }
                }
                if (compt_ok == $scope.mots.length) {
                    $scope.won = true;
                }
                else {
                    $scope.won = false;
                    window.console.log(compt_ok + "/" + $scope.mots.length + " bonnes réponses, c'est pas encore gagné");
                }

                /* remplir la grille de résultat avec la réponse de l'utilisateur */
//                var reponsesUser = $scope.getResponsesUser($scope.mots)


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
                        console.log('réponse attendue ' + enigmeTab[i].response.length)
                        var answerWantedSize = enigmeTab[i].response.length;
                        var userAnswer = enigmeTab[i].input.length;
                        var reste = answerWantedSize - userAnswer;
                        var complement = '';
                        for (var j = 0; j < reste; j++) {
                            complement += '.';
                        }
                        // compléter avec des . pour la taille totale de réponse attendue
                        tab.response = enigmeTab[i].input + complement;
                    }
                    else {
                        var answerWantedSize = enigmeTab[i].response.length;
                        var reste = answerWantedSize;
                        var complement = '';
                        for (var j = 0; j < reste; j++) {
                            complement += '.';
                        }
                        tab.response = '' + complement;
                    }
                    tab.id = enigmeTab[i].id;
                    tab.enigme = enigmeTab[i].enigme;
                    tab.start = enigmeTab[i].start;
                    tab.direction = enigmeTab[i].direction;
                    tabRep.push(tab);
                }
//                console.log('getResponsesUser tab');
//                console.log(tabRep)
                //           $scope.responsesUser = tabRep;
                return tabRep;
            }

            $scope.cases_edit = []



            /**
             * énigmes d'exemple
             */
//            $scope.mots = [{"id":1,"response":"sumotori","enigme":"oiseau léger","start":41,"direction":{"descr":"droite"},"input":""},{"id":2,"response":"fesses","enigme":"callypiges","start":21,"direction":{"descr":"bas"}},{"id":3,"response":"poulet","enigme":"et mon cul c'est du","start":36,"direction":{"descr":"bas"}},{"id":5,"response":"fada","enigme":"fou dans le sud","start":21,"direction":{"descr":"droite"}},{"id":6,"response":"démon","enigme":"oni, en Japonais signifie","start":23,"direction":{"descr":"bas"}},{"id":7,"response":"qzine","enigme":"nom du fanzine CULturel","start":5,"direction":{"descr":"droite"}}];




            $scope.editWords = $scope.mots;
            $scope.cases_exemple = $scope.mots;
            /* créer une lsite de cases vides */
            $scope.casesVides = function() {
                var cases = []
                var totalCases = $scope.crossbox.width * $scope.crossbox.height

                for (var i = 0; i < totalCases; i++) {
                    cases.push({id: i})
                }

                return cases
            }

            //remplir les réponses de lettres pour voir leur rendu dans la grille
            $scope.fillHint = function() {

                var hintTab = new Array(1, 3, 4, 2, 1, 3, 4, 2, 1, 3);

                window.console.log($scope.mots.length);
                if ($scope.mots === undefined) {
                    window.console.log("pas de mots");
                    return;
                }
                var i = 0;

                for (var mot in $scope.mots) {
                    var add= "";
                    var lettre = $scope.mots[i]['response'].substr(hintTab[i],1);
//                    var lettre = $scope.mots[i]['response'].substr(0, 1);
                    for(var j = 0; j < hintTab[i]; j++){
                        add +=' ';
                    }
//                    window.console.log($scope.mots[i]['response']);
                    $scope.mots[i].input = add+lettre;

                    i++;
                }
                console.log('remplissage bon ok');
            };
            //remplir les réponses de lettres pour voir leur rendu dans la grille
            $scope.fillGood = function() {
                window.console.log($scope.mots.length);
                if ($scope.mots === undefined) {
                    window.console.log("pas de mots");
                    return;
                }
                var i = 0;

                for (var mot in $scope.mots) {

//                    window.console.log($scope.mots[i]);
                    $scope.mots[i].input = $scope.mots[i]['response'];

                    i++;
                }
                console.log('remplissage bon ok');
            };
            //remplir les réponses de lettres pour voir leur rendu dans la grille
            $scope.fill = function() {
                window.console.log($scope.mots.length);
                var i = 0;
                var texts = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                for (var mot in $scope.mots) {

                    if ($scope.mots[i].input === undefined) {
                        window.console.log("pas d'input de mot");
                        window.console.log($scope.mots[i].input);
//                        return;
                    }


                    var texte = '';
                    for (var j = 0; j < $scope.mots[i].response.length; j++) {
                        texte += texts[i];
                    }
                    var filltext = texte + ''.substr(0, $scope.mots[i].response.length);
                    $scope.mots[i].input = filltext;

                    i++;
                }
                console.log('remplissage ok');
            };
            /**
             * 
             * à l'init de l'application,
             * aller chercher le json pour faire la grille
             */
            $scope.initsuite = function() {
                window.console.log($scope.mots.length + ' mots');

                // définir les cases avec les énigmes chargées
                $scope.cases = $scope.editToChain($scope.mots);
                window.console.log($scope.cases.length + ' cases');

                //remplir de fausses données les réponses de l'utilisateur
//                $scope.fill();

                $scope.fillHint(); //donner quelques lettres d'indice
                $scope.upAllWords();
                $scope.compare();
                ////                $scope.fillGood();
//                $scope.upAllWords();
//                $scope.compare();
            }
            $scope.cwinit = function() {
                // chopper le json contenant les énigmes et leurs réponses
                $scope.gogetjson();

            }

            console.log('scripts ok');

        });

