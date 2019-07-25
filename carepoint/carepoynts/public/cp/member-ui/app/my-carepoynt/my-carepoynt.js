'use strict';

angular.module('app.my-carepoynt', [])

.controller('MyCarepoyntCtrl', ['$scope', '$q', '$state', '$window', 'featureToggleService', 'memberService', 
            function($scope, $q, $state, $window, featureToggleService, memberService) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.saveProfile = saveProfile;
    vm.openHumanApi = openHumanApi;
    vm.goToOnboard = goToOnboard;
    vm.showBarcode = showBarcode;

  	init();

    // ******************************

  	function init() {
      vm.loading = true;
      vm.showPartnerCredsForm = false;
      $q.all({
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember(),
      })
      .then(function (response) {
        vm.features = response.features;
        vm.member = response.member;

        if(!vm.member.username) {
          getOnboardUrl();
        }
        if(vm.member.dob < -2208960000000) {
          vm.member.dob = ''
        }
        else {
          vm.member.dob = new Date(vm.member.dob);
          vm.member.dob = new Date(vm.member.dob.getUTCFullYear(), vm.member.dob.getUTCMonth(), vm.member.dob.getUTCDate());
        }

        vm.loading = false;
      });


    }

    //Check for IE / Safari and Edge
    function getBrowserDetails(){

        var md = new MobileDetect(window.navigator.userAgent);
        
        // Safari 3.0+ "[object HTMLElementConstructor]" 
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

        // Internet Explorer 6-11
        var isIE = /*@cc_on!@*/false || !!document.documentMode;

        //Edge
        var isEdge = !isIE && !!window.StyleMedia;


        if(md.mobile())
        {
          return false;
        }
        else if(isIE || isEdge || isSafari)
        {
          return true;
        }
        else
        {
          return false;
        }
        
    }

    $scope.dateOptions = {
        showWeeks: false,
        maxDate: new Date()
        
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.opened = true;
    };

    function goTo(state){
      $state.go(state);
    }

    function goBack(){
      $window.history.back();
    }

    function saveProfile() {
      if(!vm.member.dob) {
       return;
     }
     else
    {
      vm.showBusy = true;

      vm.member.name = vm.member.fname + ' ' + vm.member.lname;
      memberService.saveProfile(vm.member)
        .then(function (response) {
          if(response.success) {

          }
          vm.showBusy = false;
        });
      }
    }

    function openHumanApi() {

      if(vm.features['dark.member.link-acct-fitbit']) {
          memberService.getHumanApiProfile()
            .then(function (response) {
              vm.humanApiProfile = response;

              var options = {
                modal: 1,
                mode: 'wellness', //or 'medical' (default if not specified)
                clientUserId: vm.member.memberid,
                clientId: vm.humanApiProfile.clientId, // grab it from app settings page
                publicToken: vm.humanApiProfile.publicToken,  // Leave blank for new users

                finish: function(err, sessionTokenObject) {
                    $.post('/hapi/connect', sessionTokenObject, function(res){
                        loadMain();
                    });
                },
                close: function() {
                },
                error: function(err) {
                    errorGrowl("Error retrieving HumanAPI Page.", "Error");
                }
              };

              HumanConnect.open(options);
            });
        }
      
    }

    function getOnboardUrl() {

      memberService.getOnboardUrl()
          .then(function (response) {
            vm.onboardUrl = response.onboardUrl;
          });
    }

    function goToOnboard(){
      $window.location = vm.onboardUrl;
    }

    function showBarcode(val) {
      vm.showBarcodeFlag = val;
    }

 
}]);