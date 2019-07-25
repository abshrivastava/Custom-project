'use strict';

angular.module('app.onboard-ftue', [])

.controller('FtueProfileCtrl', ['$scope', '$q', '$state', '$stateParams', '$window', 'onboardService', function($scope, $q, $state, $stateParams, $window, onboardService) {
    const vm = $scope;

    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.goToMemberLogin = goToMemberLogin;
    vm.goalClick = goalClick;
    vm.goNext = goNext;
    vm.goToDashboard = goToDashboard;


    init();

    // ******************************

    function init() {
      vm.steps = [false, false, false, false, false];

      vm.profile = {
        fitness: false,
        sleep: false,
        nutrition: false,
        smoking: false,
        spa: false,
        holistic: false,
        preventative: false
      };

      vm.acceptEula = false;
      // getMemberProfile();

      vm.steps[0] = true;
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

    function goalClick(goalName) {
      vm.profile[goalName] = !vm.profile[goalName];
    }

    function goNext(step) {
      vm.steps[step-1] = false;
      vm.steps[step] = true;
    }

    function goToDashboard() {
      $window.location = '/cp/member-ui/app/index.html#/dashboard';
    }


}]);