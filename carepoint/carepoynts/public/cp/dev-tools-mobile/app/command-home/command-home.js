'use strict';

angular.module('app.command-home', ['app.dev-tools-service'])

.controller('CommandHomeCtrl', ['$scope', '$q', '$state', 'devToolsService', function($scope, $q, $state, devToolsService) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.login = login;
    vm.isLogin = isLogin;


    init();

    // ******************************

  	function init() {
      // this is to highlight the nav bar
      isLogin();
      vm.navValue = 'command-home';

      $q.all({
        //initialData: devToolsService.getDevToolsInitialData()
      })
      .then(function (res) {
        //vm.initialData = res.initialData;
      });
    }

    function login() {
      vm.creds = vm.creds || {};
      if(vm.creds.password) {
        //vm.creds.tz = new Date().getTimezoneOffset();//in minutes from UTC
        devToolsService.login(vm.creds)
          .then(function (response) {
            vm.response = response; 
            if(response.isLogin && response.success) {
              goTo('command-home');
            }
            else {
              goTo('command-login');
            }
          });
      }
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

}]);