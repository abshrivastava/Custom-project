'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'ngCordova',
  'app.command-home',
  'app.dev-tools',
  'app.tango',
  'app.enterprise-setup',
  'app.feature-toggle',

]).
config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider
    .state('command-login', {
        url: '/command-login',
        templateUrl: 'command-home/login.html',
        controller: 'CommandHomeCtrl'
      })
  	.state('command-home', {
      url: '/command-home',
      templateUrl: 'command-home/index.html',
      controller: 'CommandHomeCtrl'
    })
  	.state('tango-card', {
      url: '/tango-card',
      templateUrl: 'tango/index.html',
      controller: 'TangoCtrl'
    })
    .state('feature-toggle', {
      url: '/feature-toggle',
      templateUrl: 'feature-toggle/index.html',
      controller: 'FeatureToggleCtrl'
    })
    .state('enterprise-setup', {
      url: '/enterprise-setup',
      templateUrl: 'enterprise-setup/index.html',
      controller: 'EnterpriseSetupCtrl'
    })
    .state('dev-tools', {
      url: '/dev-tools',
      templateUrl: 'dev-tools/index.html',
      controller: 'DevToolsCtrl'
    });

    $urlRouterProvider
	  .when('', 'command-home')
	  .otherwise('/command-home');
});
