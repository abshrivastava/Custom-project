'use strict';

angular.module('app.gc-offer', ['app.tango-service', 'app.member-service', 'app.offer-service', 'Teletubby.ui.shared.modules.nav'])

.controller('GCOfferCtrl', ['$scope', '$q', '$filter', '$state', '$stateParams', '$window', 'tangoService', 'offerService', 
                            'memberService', 'featureToggleService', 'TeletubbyNav',
            function($scope, $q, $filter, $state, $stateParams, $window, tangoService, offerService, memberService, featureToggleService, TeletubbyNav) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.createOrder = createOrder;
    vm.goBack = goBack;

    vm.cardOrderedSuccess = false;
    vm.canRedeem = false;
    vm.showIsNotEligible = false;
    vm.showAdd = showAdd;

    //this is for special use for checkin and earn TGMD
    vm.getCheckin = getCheckin;
    
  	init();

    // ******************************

  	function init() {
      vm.loading = true;
      vm.utid = $stateParams.utid;
      vm.showAddToHomescreen = false;
      
      $q.all({
        //initialData: dashboardService.getInitialData(),
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember(),
        cpTangoOptions: tangoService.getCPTangoOptions(),
        isEligible : tangoService.isEligible()
      })
      .then(function (response) {
        vm.features = response.features;
        vm.cpTangoOptions = response.cpTangoOptions;
        vm.isEligible = response.isEligible.eligible;

        vm.card = $filter('filter')(vm.cpTangoOptions, function(value, index, array){
            return (value.order.utid == vm.utid);
          })[0];

        vm.card.brand.description = decodeURI(vm.card.brand.description);

        vm.member = response.member;
        vm.canRedeem = canRedeem(vm.card.carepoynt_value, vm.member.reward.points);
        vm.loading = false;

        var md = new MobileDetect(window.navigator.userAgent);
        if(vm.features['dark.member.add-to-homescreen-button'] && md.mobile()){
          vm.showAddToHomescreen = true;
        }

      });
    }

    function getCheckin() {
      TeletubbyNav.checkin(vm).then(function(response){
        if(response){
              vm.member.reward.points = response.points;
            }
        });
    }

    function goTo(state, params){
      $state.go(state, params);
    }

    function goBack(){
      $window.history.back();
    }

    function createOrder(order, value) {
      vm.cardOrderedSuccess = false;
      vm.cardOrderedProblem = false;
      order.value = value;
      vm.showBusy = true;
      order.imageUrl = vm.card.brand.imageUrls['130w-326ppi'];
      tangoService.createOrder(order)
        .then(function (response) {
          vm.orderResponse = response; //JSON.stringify(response, null, 4);
          if(response.success == false) {
            if(response.status == 'zeroFriction') {
              // goTo('require-onboard');
              $window.location = response.onboardUrl;
            }
            else if (response.message == 'Insufficient Poynts') {
              vm.cardOrderedProblem = true;
            }
            else
              vm.showIsNotEligible = true;
          } 
          else {

            if(response.status == 'COMPLETE') {
              vm.cardOrderedSuccess = true;
              vm.member.reward.points = vm.member.reward.points - vm.card.carepoynt_value;
              vm.canRedeem = canRedeem(vm.card.carepoynt_value, vm.member.reward.points);
             // getMember();
            }
            if(response.errors){
              vm.loading = false;
              vm.cardOrderedSuccess = false;
              vm.cardOrderedProblem = true;
              getMember();
              vm.canRedeem = canRedeem(vm.card.carepoynt_value, vm.member.reward.points);
            }
          }
          vm.showBusy = false;
        });
    }

    function getMember(){
      memberService.getMember()
        .then(function (response) {
          vm.member = response; //JSON.stringify(response, null, 4);
          vm.canRedeem = canRedeem(vm.card.carepoynt_value, vm.member.reward.points);
        });
    }

    function canRedeem(value, points) {
      return points >= value;
    }

    function showAdd() {
      TeletubbyNav.showAdd();
    }

}]);