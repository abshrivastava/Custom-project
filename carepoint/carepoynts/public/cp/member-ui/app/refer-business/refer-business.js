'use strict';

angular.module('app.refer-business', ['Teletubby.ui.shared.modules.nav'])

.controller('ReferBusinessCtrl', ['$scope', '$q', '$state', '$window', 'featureToggleService', 'memberService', 'TeletubbyNav',
            function($scope, $q, $state, $window, featureToggleService, memberService, TeletubbyNav) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.sendReferralEmail = sendReferralEmail;
    vm.showAdd = showAdd;
    vm.getCheckin = getCheckin;
    
  	init();

    // ******************************

    function init() {
      vm.loading = true;
      vm.showAddToHomescreen = false;


      $q.all({
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember(),
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

      

    }

    function getCheckin() {
      TeletubbyNav.checkin(vm).then(function(response){
        if(response){
              vm.member.reward.points = response.points;
            }
        });
    } 


    function goTo(state){
      $state.go(state);
    }

    function goBack(){
      $window.history.back();
    }

    function sendReferralEmail(){
      vm.submitProblem = false;
      vm.submitSuccess = false;
      vm.data = {};
      vm.data.email = vm.member.email;
      vm.data.message = vm.additionalInfo;
      vm.data.name = vm.member.name;
      vm.data.businessemail = vm.businessEmail;
      vm.data.businessname = vm.businessName;
      vm.data.date = new Date().toString();
      vm.showBusy = true;
      if(!vm.businessName || !vm.businessEmail || !vm.additionalInfo || !validateEmail(vm.businessEmail)){
        vm.submitProblem = true;
        vm.showBusy = false;
      }
      else {
        memberService.sendReferralEmail(vm.data)
          .then(function (response){

            if(response.success){
              vm.submitSuccess = true;
              document.getElementById("bname").value = "";
              document.getElementById("bemail").value = "";
              document.getElementById("ainfo").value = "";
              vm.businessEmail = "";
              vm.additionalInfo = "";
              vm.businessName = "";
            }
            else
              vm.submitProblem = true;
          });
      }
      vm.showBusy = false;
    }

    function showAdd() {
      TeletubbyNav.showAdd();
    }

    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

 
}]);