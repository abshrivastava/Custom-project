'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'ui.bootstrap',
  'app.onboard',
  'app.onboard-service',
  'app.onboard-ftue',
  'app.dosgets', 
  'app.dosgets1', 
  'app.dosgets2',
  'app.dosgetspr',
  'app.dosgets3',
  'app.dosgets1ptnr',
  'app.dosgets3ptnr'
]).
config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('onboard', {
      url: '/onboard',
      templateUrl: 'onboard/index.html',
      controller: 'OnboardCtrl'
    })
    .state('eula-member', {
      url: '/eula-member',
      templateUrl: 'onboard/eula-member.html',
      controller: 'OnboardCtrl'
    })
    .state('completed', {
      url: '/completed',
      templateUrl: 'onboard/completed.html',
      controller: 'OnboardCtrl'
    })

    .state('ftue-profile', {
      url: '/ftue-profile',
      templateUrl: 'onboard-ftue/index.html',
      controller: 'FtueProfileCtrl'
    })


    

    .state('dosgetsf1', {
      url: '/dosgetsf1',
      templateUrl: 'dosgetsf1/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgetsf2', {
      url: '/dosgetsf2',
      templateUrl: 'dosgetsf2/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgetsf3', {
      url: '/dosgetsf3',
      templateUrl: 'dosgetsf3/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgetsf4', {
      url: '/dosgetsf4',
      templateUrl: 'dosgetsf4/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgetst1', {
      url: '/dosgetst1',
      templateUrl: 'dosgetst1/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgetst2', {
      url: '/dosgetst2',
      templateUrl: 'dosgetst2/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgetst3', {
      url: '/dosgetst3',
      templateUrl: 'dosgetst3/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgetsl1', {
      url: '/dosgetsl1',
      templateUrl: 'dosgetsl1/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgetsl2', {
      url: '/dosgetsl2',
      templateUrl: 'dosgetsl2/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgets', {
      url: '/dosgets',
      templateUrl: 'dosgets/index.html',
      controller: 'DosGetsCtrl'
    })

    .state('dosgets-1-step', {
      url: '/dosgets-1-step',
      templateUrl: 'dosgets-1-step/index.html',
      controller: 'DosGetsCtrl1'
    })

    .state('dosgets-2-step', {
      url: '/dosgets-2-step',
      templateUrl: 'dosgets-2-step/index.html',
      controller: 'DosGetsCtrl2'
    })

    .state('dosgetspr', {
      url: '/dosgetspr',
      templateUrl: 'dosgetspr/index.html',
      controller: 'DosGetsCtrlpr'
    })


    .state('1s', {
      url: '/1s/:name',
      templateUrl: 'dsgs/1s/index.html',
      controller: 'DosGetsCtrl1'
    }) 
    .state('2s', {
      url: '/2s/:name',
      templateUrl: 'dsgs/2s/index.html',
      controller: 'DosGetsCtrl2'
    })
    .state('3s', {
      url: '/3s/:name',
      templateUrl: 'dsgs/3s/index.html',
      controller: 'DosGetsCtrl3'
    }) 
    .state('1p', {
      url: '/1p/:name',
      templateUrl: 'dsgs/1p/index.html',
      controller: 'DosGetsCtrlpr'
    })
    .state('1ptnr', {
      url: '/1ptnr/:name',
      templateUrl: 'dsgs/1ptnr/index.html',
      controller: 'DosGetsCtrl1ptnr'
    })
    .state('3ptnr', {
      url: '/3ptnr/:name',
      templateUrl: 'dsgs/3ptnr/index.html',
      controller: 'DosGetsCtrl3ptnr'
    });    

    $urlRouterProvider
  	  .when('', 'dosgets')
  	  .otherwise('/dosgets');
});
