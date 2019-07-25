'use strict';

angular.module('app.onboard', [])

.controller('OnboardCtrl', ['$scope', '$q', '$state', '$stateParams', '$window', 'onboardService', function($scope, $q, $state, $stateParams, $window, onboardService) {
    const vm = $scope;

    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.goToMemberLogin = goToMemberLogin;


    init();

    // ******************************

    function init() {
      vm.acceptEula = false;
      getMemberProfile();
    }

    function goTo(state) {
      $state.go(state);
    }

    function goBack() {
      $window.history.back();
    }

    function getMemberProfile() {
      onboardService.getMemberProfile()
        .then(function(response) {
          if(response.success) {

          }
        });
    }

    function setMemberProfile() {
      onboardService.setMemberProfile()
        .then(function(response) {
          if(response.success) {

          }
        });
    }

    function getMemberEula() {
      onboardService.getEula()
        .then(function(response) {
          if(response.success) {

          }
        });
    }

    function setMemberEula() {
      onboardService.setEula()
        .then(function(response) {
          if(response.success) {

          }
        });
    }

    function goToMemberLogin() {
      $window.location = '/cp/member-ui/app/index.html#/login';
    }

}]);