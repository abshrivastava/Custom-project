'use strict';

angular.module('app.member-profile', ['ui.bootstrap', 'Teletubby.ui.shared.modules.nav', 'carepoynt-common-services'])

.controller('ProfileCtrl', ['$scope', '$q', '$state', '$window', 'featureToggleService', 'memberService', 'TeletubbyNav', 'alertService',
            function($scope, $q, $state, $window, featureToggleService, memberService, TeletubbyNav, alertService) {
    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.saveProfile = saveProfile;
    vm.openHumanApi = openHumanApi;
    vm.goToOnboard = goToOnboard;
    vm.opened = false;
    $scope.checkBrowser = getBrowserDetails();
    vm.showAdd = showAdd;
    //this is for special use for checkin and earn TGMD
    vm.getCheckin = getCheckin;
    
  	init();

    // ******************************

  	function init() {
      vm.loading = true;
      vm.showPartnerCredsForm = false;
      vm.showAddToHomescreen = false;

      $q.all({
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember(),
        interests: memberService.getInterests()
      })
      .then(function (response) {
        vm.features = response.features;
        vm.member = response.member;
        vm.interests = response.interests;

        // Will sometimes save as an array if there are no interest fields in database. Needs to be an object.
        if (vm.interests instanceof Array) {
          vm.interests = {};
        }

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

        var md = new MobileDetect(window.navigator.userAgent);
        if(vm.features['dark.member.add-to-homescreen-button'] && md.mobile()){
          vm.showAddToHomescreen = true;
        }

        memberService.getMemberAddToHomescreenTag(vm.member.memberid)
          .then(function (response) {
              if(response.count == 0){
                if(md.mobile()) {
                  TeletubbyNav.showAdd();
                  TeletubbyNav.createA2HTag(vm.member.memberid);
                }
              }

          });
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

    function saveProfile() {
      if(!vm.member.dob) {
       return;
      }
      else {
        vm.showBusy = true;

        vm.member.name = vm.member.fname + ' ' + vm.member.lname;
        console.log(vm.interests);

        $q.all({
          member: memberService.saveProfile(vm.member),
          interests: memberService.saveInterests({ "interests" : vm.interests})
        })
          .then(function (response) {
            if(response.member.success) {
                alertService.success("Profile saved successfully");
            }
            else
            {
              alertService.error("Unable to save profile. Please verify your information and try again.");
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

    function showAdd() {
      TeletubbyNav.showAdd();
    }

 
}]);