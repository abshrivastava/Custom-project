'use strict';

angular.module('app.careplan', ['app.enterprise-service', 'app.member-service', 'app.feature-toggle-service', 'app.offer-service', 'app.careplan-service', 'Teletubby.ui.shared.modules.nav'])

.controller('CareplanCtrl', ['$scope', '$q', '$state', '$window', 'enterpriseService', 'memberService', 'featureToggleService', 'offerService', 'careplanService', 'TeletubbyNav',
            function($scope, $q, $state, $window, enterpriseService, memberService, featureToggleService, offerService, careplanService, TeletubbyNav) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.load = true;
    vm.showCareplan = showCareplan;
    vm.resetAll = resetAll;
    vm.showEnterprise = showEnterprise;
    vm.showEnterpriseView = false;
    vm.getCheckin = getCheckin;
  	init();

    // ******************************

  	function init() {
      vm.showCareplanView = false;
      vm.showEnterpriseView = false;
      vm.showListView = true;
      $q.all({
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember(),
      })
      .then(function (response) {
        if(response.features['dark.member.pied-piper']) {
          var alt_medicine = "fa fa-3x fa-pied-piper-alt";
        }
        else {
          var alt_medicine = "fa fa-2x fa-leaf"
        }
        if(response.features['dark.member.alternative-medicine-view']) {
          vm.careplans = [{name: "Eat Healthy", tag: "eat_healthy", img: "fa fa-2x fa-cutlery"}, 
                          {name: "Get Fit", tag: "get_fit", img: "fa fa-2x fa-bicycle"},
                          {name: "Relax & Renew", tag:"relax_and_renew", img: "fa fa-2x fa-pagelines"}, 
                          {name: "Healthcare", tag: "healthcare", img: "fa fa-2x fa-heartbeat"},
                          {name: "Wellness", tag: "wellness", img: alt_medicine}, 
                          {name: "New", tag: "new", img: "fa fa-2x fa-star"}, 
                          {name: "Learn Carepoynt", tag: "learn", img: "fa fa-2x fa-question"}];
        }
        else {
          vm.careplans = [{name: "Eat Healthy", tag: "eat_healthy", img: "fa fa-2x fa-cutlery"}, 
                          {name: "Get Fit", tag: "get_fit", img: "fa fa-2x fa-bicycle"},
                          {name: "Relax & Renew", tag:"relax_and_renew", img: "fa fa-2x fa-pagelines"}, 
                          {name: "Healthcare", tag: "healthcare", img: "fa fa-2x fa-heartbeat"}, 
                          {name: "New", tag: "new", img: "fa fa-2x fa-star"}, 
                          {name: "Learn Carepoynt", tag: "learn", img: "fa fa-2x fa-question"}];
        }

        vm.loading = false;
        vm.features = response.features;
        vm.member = response.member;

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

    function goBack() {
      if(vm.showListView)
        $window.history.back();
      else if(vm.showCareplanView)
        vm.resetAll();
    }

    function showCareplan(tag) {
      vm.showBusy = true;
      vm.showCareplanView = true;
      vm.showListView = false;
      vm.enterprises = {};
      careplanService.getEnterprisesByTagForMember(tag)
        .then(function (response) {
          vm.enterprises = response;
          // angular.forEach(vm.enterprises.joyned, function (enterprise) {

          // careplanService.getNumberOfPromosByEntId(enterprise.ent_id) 
          //                 .then(function (response) {
          //                   enterprise.promotion_count = response.count;
          //                 })
          //                 .catch(function (response) {
          //                   console.log('broke');
          //                 }); 

          // });
          
          // angular.forEach(vm.enterprises.network, function (enterprise) {

          // careplanService.getNumberOfPromosByEntId(enterprise.ent_id) 
          //                   .then(function (response) {
          //                     enterprise.promotion_count = response.count;
          //                   })
          //                   .catch(function (response) {
          //                     console.log('broke');
          //                   }); 
          // });
          vm.showBusy = false;
        })
    }

    function showEnterprise(entid) {
      // resetAll();
      TeletubbyNav.goTo('company', {'id':entid});
    }

    function resetAll() {
      vm.showCareplanView = false;
      vm.showEnterpriseView = false;
      vm.showListView = true;
    }

}]);