'use strict';

angular.module('app.cp-rating', ['app.member-service', 'app.feature-toggle-service', 'Teletubby.ui.shared.modules.nav'])

.controller('RatingCtrl', ['$scope', '$q', '$filter', '$state', '$stateParams', '$window', 
                            'memberService', 'featureToggleService', 'TeletubbyNav',
            function($scope, $q, $filter, $state, $stateParams, $window, memberService, featureToggleService, TeletubbyNav) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.showAdd = showAdd;

  	init();

    // ******************************

  	function init() {
      vm.loading = true;
      vm.showAddToHomescreen = false;
      
      $q.all({
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember()
      })
      .then(function (response) {
        vm.features = response.features;
        vm.member = response.member;

        vm.loading = false;

        var md = new MobileDetect(window.navigator.userAgent);
        if(vm.features['dark.member.add-to-homescreen-button'] && md.mobile()){
          vm.showAddToHomescreen = true;
        }

      });


      // $scope.rate = 7;
      // $scope.max = 10;
      // $scope.isReadonly = false;

      // $scope.hoveringOver = function(value) {
      //   $scope.overStar = value;
      //   $scope.percent = 100 * (value / $scope.max);
      // };

      // $scope.ratingStates = [
      //   {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
      //   {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
      //   {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
      //   {stateOn: 'glyphicon-heart'},
      //   {stateOff: 'glyphicon-off'}
      // ];

    }

    function goTo(state, params){
      $state.go(state, params);
    }

    function goBack(){
      $window.history.back();
    }

    function createOrder(order, value) {
      vm.loading = true;
      order.value = value;
      tangoService.createOrder(order)
        .then(function (response) {
          vm.orderResponse = response; //JSON.stringify(response, null, 4);
          if(response.status == 'COMPLETE') {
            vm.cardOrderedSuccess = true;
            getMember();
            vm.loading = false;
          }
          if(response.errors){
            vm.loading = false;
            vm.cardOrderedSuccess = false;
            vm.cardOrderedProblem = true;
          }
        });
    }

    function showAdd() {
      TeletubbyNav.showAdd();
    }


}]);