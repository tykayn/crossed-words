'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('crossedWordsApp'));

  var MainCtrl,scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should have 7 enigma', function () {
    expect(scope.mots.length).toBe(6); // 7 with a start from 0
  });
  
  it('should not be ok by default for the first answer', function () {
    expect(scope.mots[0].ok).toBeFalsy();
  });
  it('ok the first answer being sumotori', function () {
    scope.mots[0].input = 'sumotori';
    expect(scope.mots[0].input).toBe('sumotori');
    scope.compare();
    expect(scope.mots[0].ok).toBeTruthy();
  });
  it('not ok for wrong first answer', function () {
    scope.mots[0].input = 'sdhiufshrhdfisghiruhsriug';
    scope.compare();
    expect(scope.mots[0].ok).toBeFalsy();
  });
  it('should won', function () {
      var rep = [
          'sumotori',
          'fesses',
          'poulet',
          'fada',
          'démon',
          'qzine'
      ];
      for (var i = 0; i < ($scope.mots.length); i++) {
                    scope.mots[i].input = rep[i];
                }
scope.compare();
expect(scope.won()).toBeTruthy();
}
//  it('ok entering the form the first answer being sumotori', function () {
//    using('div.enigme:nth-of-type(1)').input('enigme.input').enter('sumotori'); 
//    scope.compare();
//    expect(scope.mots[0].ok).toBeTruthy();
//  });
});
