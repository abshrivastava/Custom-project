'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'ui.router',
  'ui.event',
  'ui.bootstrap',
  'ngSanitize',
  'ngMap',
  'angularModalService',
  'app.login',
  'app.member-dashboard',
  'app.member-profile',
  'app.company-detail',
  'app.offer-detail',
  'app.gc-offer',
  'app.clique',
  'app.cliques',
  'app.cp-utils',
  'app.feature-toggle-service',
  'app.clique',
  'app.cliques',
  'app.clique-service',
  'app.require-onboard',
  'app.help',
  'app.refer-business',
  'Teletubby.ui.shared.modules.nav',
  'google-analytics',
  'ezfb',
  'app.poynt-log',
  'app.careplan',
  'app.careplan-service',
  'app.my-log',
  'app.voucher'
  // 'app.cp-rating'
])
.config(function($stateProvider, $urlRouterProvider, ezfbProvider) {
  
  ezfbProvider.setInitParams({
    appId: '1275109325868916',
    cookie: true
  });

  $stateProvider
  .state('login', {
      url: '/login',
      templateUrl: 'login/index.html',
      controller: 'LoginCtrl'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'dashboard/index.html',
      controller: 'DashboardCtrl'
    })
    .state('clique', {
      url: '/clique',
      templateUrl: 'clique/index.html',
      controller: 'CliqueCtrl'
    })
    .state('cliques', {
      url: '/cliques',
      templateUrl: 'cliques/index.html',
      controller: 'CliquesCtrl'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'profile/index.html',
      controller: 'ProfileCtrl'
    })
    
    .state('company', {
      url: "/company/:id",
      templateUrl: "company-detail/index.html",
      controller: 'CompanyDetailCtrl'
    })
  
    .state('gc/offer', {
      url: "/gc/offer/:utid",
      templateUrl: "gc-offer/index.html",
      controller: 'GCOfferCtrl'
    })

    .state('rating', {
      url: '/rating',
      templateUrl: "rating/index.html",
      controller: 'RatingCtrl'
    })

    .state('require-onboard', {
      url: '/require-onboard',
      templateUrl: "require-onboard/index.html",
      controller: 'RequireOnboardCtrl'
    })

    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    })

    .state('help', {
      url: '/help', 
      templateUrl: "help/index.html",
      controller: 'HelpCtrl'
    })

    .state('refer-business', {
      url: '/refer-business', 
      templateUrl: "refer-business/index.html",
      controller: 'ReferBusinessCtrl'
    })

    .state('careplan', {
      url: '/careplan', 
      templateUrl: "careplan/index.html",
      controller: 'CareplanCtrl'
    })
    
    .state('mylog', {
      url: '/mylog', 
      templateUrl: "my-log/index.html",
      controller: 'mylogCtrl'
    })

    .state('voucher', {
      url: "/voucher/:id",
      templateUrl: "voucher/index.html",
      controller: 'voucherCtrl'
    })

    .state('offer', {
      url: '/:type/:id',
      templateUrl: "offer-detail/index.html",
      controller: 'OfferDetailCtrl'
    })

    .state('poyntlog',{
      url: '/poyntlog',
      templateUrl: 'poynt-log/index.html',
      controller: 'poyntlogController'
    });
    
    $urlRouterProvider
	  .when('', 'dashboard')
	  .otherwise('/dashboard');
})

.run(['$rootScope', '$window', '$location', function($rootScope, $window, $location) {
  $rootScope.$on('$stateChangeSuccess', function (event) {
    $window.ga('send', 'pageview', $location.path());
});
}]);
