'use strict';

angular.module('app.onboard', [])

.controller('OnboardCtrl', ['$scope', '$q', '$state', '$stateParams', '$window', function($scope, $q, $state, $stateParams, $window) {
    const vm = $scope;

    vm.goTo = goTo;
    vm.goBack = goBack;

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

}]);