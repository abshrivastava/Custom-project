'use strict';

angular.module('app.onboard', [])

.controller('OnboardCtrl', ['$scope', '$q', '$state', '$stateParams', '$window', function($scope, $q, $state, $stateParams, $window) {
    const vm = $scope;

    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.goToMemberLogin = goToMemberLogin;

    init();

    // ******************************

    function init() {
      // vm.loading = true;
    }

    function goTo(state){
      $state.go(state);
    }

    function goBack(){
      $window.history.back();
    }

    function goToMemberLogin(){
      console.log('aaa');
      $window.location = '/cp/member-ui/app/index.html';
    }

}]);