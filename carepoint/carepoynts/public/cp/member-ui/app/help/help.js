'use strict';

angular.module('app.help', ['Teletubby.ui.shared.modules.nav'])

.controller('HelpCtrl', ['$scope', '$q', '$state', '$window', 'featureToggleService', 'memberService', 'TeletubbyNav',
            function($scope, $q, $state, $window, featureToggleService, memberService, TeletubbyNav) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.sendMemberEmail = sendMemberEmail;
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

    function sendMemberEmail(){
      vm.sendHelpSuccess = false;
      vm.sendHelpFail = false;
      vm.showBusy = true;
      vm.data = {};
      vm.data.email = vm.member.email;
      vm.data.message = vm.message;
      vm.data.name = vm.member.name;
      vm.data.date = new Date().toString();
      if(!vm.message) {
        vm.sendHelpFail = true;
        vm.showBusy = false;
      }
      else {
        memberService.sendMemberEmail(vm.data)
          .then(function (response){
            if(response.success){
              vm.sendHelpSuccess = true;
              document.getElementById("message").value = "";
              vm.message = "";
            }
            else{
              vm.sendHelpFail = true;
            }

          });
          vm.showBusy = false;
      }
    }

    function showAdd() {
      TeletubbyNav.showAdd();
    }



 
}]);