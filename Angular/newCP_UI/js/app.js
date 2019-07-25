    angular.module('cpApp',['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
      .state('login', {
          url: '/login',
          templateUrl: 'login/index.html',
          controller: 'LoginCtrl'
        })
    })