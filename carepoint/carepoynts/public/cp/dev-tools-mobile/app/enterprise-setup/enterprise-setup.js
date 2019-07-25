'use strict';

angular.module('app.enterprise-setup', ['app.dev-tools-service'])

.controller('EnterpriseSetupCtrl', ['$scope', '$q', '$state', 'devToolsService', '$filter', function($scope, $q, $state, devToolsService, $filter) {
    const vm = $scope;
    vm.account;
    vm.doSearch = doSearch;
    vm.setEnterpriseData = setEnterpriseData;
    vm.selectEnt = selectEnt;
    vm.goBack = goBack;
    vm.isLogin = isLogin;
    vm.goTo = goTo;
    vm.saveEnterprise = saveEnterprise;


    init();


    // ******************************

  	function init() {
      isLogin();
      // this is to highlight the nav bar
      vm.navValue = 'enterprise-setup';

      vm.showBusy = true;
      vm.search = {};
      vm.selectedEnt = null;
      $q.all({
        // initialData: tangoService.getInitialData(),
        enterprises: devToolsService.getAllEnterprises()
      })
      .then(function (response) {
        // vm.initialData = response.initialData;
        vm.enterprises = response.enterprises;
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

    function doSearch() {
      vm.showBusy = true;
      devToolsService.searchYelp(vm.search)
        .then(function (response) {
          vm.businesses = response.businesses;
          vm.showBusy = false;
        });
    }

    function getAllEnterprises() {
      devToolsService.getAllEnterprises()
        .then(function (response) {
          vm.enterprises = response;
        });
    }

    function setEnterpriseData(ent){

      vm.selectedEnt.ent_address = ent.location.address1;
      vm.selectedEnt.ent_city = ent.location.city;
      vm.selectedEnt.ent_state = ent.location.state;
      vm.selectedEnt.ent_zip = ent.location.zip_code;
      vm.selectedEnt.geo_long = ent.coordinates.longitude;
      vm.selectedEnt.geo_lat = ent.coordinates.latitude;
      vm.selectedEnt.ent_phone = ent.display_phone;
    }

    function selectEnt(ent) {
      vm.selectedEnt = ent;
    }

    function goBack(){
      vm.selectedEnt = null;
    }

    function saveEnterprise() {
      vm.showBusy = true;
      devToolsService.updateEnterprise(vm.selectedEnt)
        .then(function (response) {
          vm.enterprises = response;
          vm.showBusy = false;
        });
    }




}]);