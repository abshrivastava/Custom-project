'use strict';

angular.module('app.login', ['app.offer-service', 'app.member-service', 'Teletubby.ui.shared.modules.nav'])

.controller('LoginCtrl', ['$scope', '$q', '$filter', '$state', '$stateParams', '$window', 'memberService', 'offerService', 'TeletubbyNav', function($scope, $q, $filter, $state, $stateParams, $window, memberService, offerService, TeletubbyNav) {
    const vm = $scope;
    vm.login = login;
    vm.goTo = goTo;
    vm.goBack = goBack;

    init();

    // ******************************

    function init() {
      vm.showAddToHomescreen = false;
      vm.loading = true;
      vm.badCreds = false;
    }

    function goTo(state){
      $state.go(state);
    }

    function goBack(){
      $window.history.back();
    }

    function login(){
      vm.badCreds = false;
      vm.creds = vm.creds || {};
      if(vm.creds.username && vm.creds.password) {
        vm.creds.member = true;
        vm.creds.tz = new Date().getTimezoneOffset();//in minutes from UTC
        memberService.login(vm.creds)
          .then(function (response) {
            vm.response = response; 
            if(response.success) {
              $state.go('dashboard');
            }
            else {
              vm.badCreds = true;
            }
          });
      }
    }

}]);