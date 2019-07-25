'use strict';

angular.module('app.require-onboard', [])

.controller('RequireOnboardCtrl', ['$scope', '$state', '$stateParams', '$window','featureToggleService', 
            function($scope, $state, $stateParams, $window, featureToggleService) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.goToOnboard = goToOnboard;

  	init();

    // ******************************

  	function init() {


    }

    function goTo(state, params){
      $state.go(state, params);
    }

    function goBack(){
      $window.history.back();
    }

    function goToOnboard() {
      $window.location = '/cp/onboard-ui/app/index.html';
    }


}]);