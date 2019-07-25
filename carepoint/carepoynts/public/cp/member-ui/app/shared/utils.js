/* global WalkMeAPI */
angular.module('Teletubby.ui.shared.modules.nav', ['app.member-service', 'app.feature-toggle-service', 'google-analytics','carepoynt-common-services']).provider('TeletubbyNav', [
  function () {


    this.$get = [
      '$q', '$filter', '$window', '$state', 'memberService', 'featureToggleService', 'GoogleAnalytics', 'dashboardService','alertService',function ($q, $filter, $window, $state, memberService, featureToggleService, GoogleAnalytics, dashboardService, alertService) {


        function goTo(state, params){
          $state.go(state, params);
          //test stuff
          // if(params)
          //   GoogleAnalytics.sendEvent('event', 'nav-menu', 'goto', state + ": " + JSON.stringify(params, null, 4));
          // else
          //   GoogleAnalytics.sendEvent('event', 'nav-menu', 'goto', state);
        }

        function goBack(){
          $window.history.back();
        }

        function showAdd() {
          var md = new MobileDetect(window.navigator.userAgent);
          if ((md.os().indexOf("iOS") != -1) && (md.userAgent().indexOf("Safari") != -1)) 
            addToHomescreen().show(true);
          if ((md.os().indexOf("AndroidOS") != -1) && (md.userAgent().indexOf("Chrome") != -1))
            addToHomescreen().show(true);
        }

        function createA2HTag(memberid) {
          var tagData = {};
          tagData.member_id = memberid;
          tagData.tag_name = "addToHomescreen";
          tagData.is_deleted = 0;
          tagData.is_active = 1;
          tagData.type = "";

          memberService.createAddToHomeTag(tagData)
              .then(function (response) {
                if(response.success) {
                }
              });
        }

        function test() {
          console.log("test");
        }

        //========== checkin
        var dashboardScope;
        
        function checkin(vm) {
          var dfd = $q.defer();
            //get coordinates
            alertService.info("To Increase Accuracy : </br> 1) Allow location services. </br> 2) Turn on Wi-fi/Bluetooth.",'Warning');
            
            dashboardScope=vm;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                  geoSuccess(position, dfd)},geoError,{
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                });
            } else {
                alertService.warning("Geolocation service for this browser is not supported, please update your browser in order to earn via Check-In.");
            }
              return dfd.promise;
        }


        function geoSuccess(position,qDefer) {
            

            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            var qrdata="";
            //pass into server to validate and award poynts if valid location and code
            return memberService.postCheckin(dashboardScope,{lat: lat, long: long, qr: qrdata}).then(function(response){
              if(response){
                memberService.getMember().then(function(resp){
                  if(resp){
                    response.points = resp.reward.points;
                  }
                  else{
                    alertService.error('Member points could not be updated')
                  }
                    qDefer.resolve(response);
                },
                function(error){
                    qDefer.resolve(false);
                })
              }
              else{
                qDefer.resolve(false);
              }
            },
            function(error){
              qDefer.resolve(false);
            })
        }


        function geoError(error) {
            console.info(error);
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    alertService.error("User denied the request for Geolocation. Please turn on Locations Services for the browser.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    alertService.error("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    alertService.error("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    alertService.error("An unknown error occurred.");
                    break;
            }

        }

        var service = {
            goTo: goTo,
            showAdd: showAdd,
            createA2HTag: createA2HTag,
            test: test,
            checkin:checkin
        };
        return service;
      }];



  }]);