'use strict';

angular.module('app.feature-toggle', ['app.dev-tools-service'])

.controller('FeatureToggleCtrl', ['$scope', '$q', '$state', 'devToolsService', '$filter', function($scope, $q, $state, devToolsService, $filter) {
    const vm = $scope;
    vm.isLogin = isLogin;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.getFeatureToggles = getFeatureToggles;
    vm.updateFeatureToggles = updateFeatureToggles;
    vm.updateFeature = updateFeature;
    vm.addFeature = addFeature;
    vm.acceptFeature = acceptFeature;

  	init();

    // ******************************

  	function init() {
      isLogin();
      // this is to highlight the nav bar
      vm.navValue = 'feature-toggle';

      vm.showBusy = true;
      vm.isAddFeature = false;

      $q.all({
        // initialData: tangoService.getInitialData(),
        features: devToolsService.getFeatureToggles()
      })
      .then(function (response) {
        // vm.initialData = response.initialData;
        vm.features = response.features;
        vm.showBusy = false;
      });

    }

    function isLogin() {
      devToolsService.isLogin()
        .then(function(response){
          if(response.isLogin == false){
            if($state.$current.name != 'command-login'){
              goTo('command-login');
            }
          }
        });
    }

    function goTo(state) {
      $state.go(state);
    }

    function getFeatureToggles() {
      devToolsService.getFeatureToggles()
        .then(function (response) {
          vm.features = response.features;
        });
    }

    function updateFeature(key, val) {
      vm.features[key] = val;
      updateFeatureToggles();
    }

    function updateFeatureToggles() {
      vm.showBusy = true;
      devToolsService.updateFeatureToggles(vm.features)
        .then(function (response) {
          vm.features = response;
          vm.newFeatureName = "";
          vm.showBusy = false;
        });
    }

    function addFeature() {
      vm.isAddFeature = true;
    }

    function acceptFeature() {
      vm.isAddFeature = false;
      updateFeature(vm.newFeatureName, false);
    } 

    function deleteFeature() {
      vm.isDelFeature = true;
    }   

    function acceptDeleteFeature() {
      vm.newDeleteName;
      /*
      get the delete name
      go through the file and look at the keys.
      if any of the keys match the name
      delete the key value from the file
      */
    }   

    function goBack(){
      vm.selectedEnt = null;
    }


}]);