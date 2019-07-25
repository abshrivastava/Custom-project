'use strict';

var app = angular.module('app.member-dashboard', ['ui.router', 'angularModalService', 'app.dashboard-service', 'app.member-service', 'app.member-profile', 'app.offer-service', 'app.feature-toggle-service', 'Teletubby.ui.shared.modules.nav', 'google-analytics'])

.controller('DashboardCtrl', ['$scope', '$q', '$window', 'dashboardService', 'ModalService', '$filter', '$state', 'offerService', 'memberService', 'featureToggleService', 'TeletubbyNav', 'GoogleAnalytics', '$location', function($scope, $q, $window, dashboardService, ModalService, $filter, $state, offerService, memberService, featureToggleService, TeletubbyNav, GoogleAnalytics, $location) {
    const vm = $scope;
    // vm.getCPTangoOptions = getCPTangoOptions;
    vm.goTo = goTo;
    vm.showMyProfileModal = showMyProfileModal;
    vm.gcShowMore = gcShowMore;
    vm.gcShowLess = gcShowLess;
    vm.hideSplashScreen = hideSplashScreen;
    vm.sortHpo = sortHpo;
    vm.handleBa = handleBa;
    vm.handleFl = handleFl;
    vm.showAdd = showAdd;
    vm.isVariable = isVariable;

    //this is for special use for checkin and earn TGMD
    vm.getCheckin = getCheckin;
    
    function getCheckin() {
      TeletubbyNav.checkin(vm).then(function(response){
        if(response){
              vm.member.reward.points = response.points;
            }
        });
    }

    vm.gmap = '';

    var userLocation = {
      lat : 33.6189,
      lng : -117.900
    };

    vm.gc = {};



    init();

    // ******************************

    function init() {
      vm.isMobile = mobilecheck();
      vm.loading = true;
      vm.gc.limit = 3;
      vm.showAddToHomescreen = false;
      gcLimit();


      $q.all({
        initialData: dashboardService.getInitialData()
        // features: featureToggleService.getFeatureToggles(),
        // member: memberService.getMember(), 
        // offers: offerService.getCarepoyntOffers(),
        // enterprises: memberService.getMemberEnterprises(),
        // cpTangoOptions: dashboardService.getCPTangoOptions()
      })
      .then(function (response) {
        vm.loading = false;
        vm.member = response.initialData.member;
        vm.offers = response.initialData.offers.promotions;
        
        vm.offers = vm.offers.map(function(promo) {
          promo.poynts = getTotalPoynts(promo);
          return promo;
        });
        // vm.offers = generateHpoList(vm.offers, 3);
        
        vm.features = response.initialData.features;
        vm.enterprises = response.initialData.enterprises;
        vm.cpTangoOptions = response.initialData.cpTangoOptions;
        vm.membertags = response.initialData.memberTags;
        ga('set', 'userId', vm.member.memberid);

        
        var md = new MobileDetect(window.navigator.userAgent);
        if(vm.features['dark.member.add-to-homescreen-button'] && md.mobile()){
          vm.showAddToHomescreen = true;
        }

        var addToHome = true;
        angular.forEach(vm.membertags, function(tag) {
          if(tag.tag_name == 'addToHomescreen') {
            addToHome = false;
            return;
          }
        });

        if(vm.features['dark.member.add-to-homescreen-notification']){
          if(addToHome) {
            if(md.mobile()) {
              TeletubbyNav.showAdd();
              TeletubbyNav.createA2HTag(vm.member.memberid);
            }
          }
        }

        if(vm.features['dark.member.dashboard-map']) {
          vm.gmap1 = new google.maps.Map(document.getElementById('map'), {
              zoom: 13,
              center: new google.maps.LatLng(userLocation.lat, userLocation.lng),
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              scrollwheel: false
          });
        }

        //leaving these separate for readability
        vm.offers = $filter('filter')(vm.offers, function(value, index, array){
          // return (value.user_earned == false && value.promo_freq == 1);
          return (value.user_earned == false || value.promo_freq == 0);
        });

        // vm.offers = vm.offers.map( function(offer) {
        //   offer.reward_value = parseInt(offer.reward_value);
        //   return offer;
        // });

        // vm.offers = $filter('orderBy')(vm.offers, sortHpo, false);

        vm.totalPromotions = vm.offers.length;
        vm.totalRedemptions = vm.cpTangoOptions.length;
 
        // comment out himss splash screen for first time users
        // if(!hasVisited()) {
        //   vm.showSplashScreen = true;
        // }

        // setCustomRedemptions();
        checkOnboardPromoGiven();

      });    
      
    }

    function sortHpo(hpo){
      return -parseInt(hpo.reward_value);
    }

    function generateHpoList(offers, limit) {
      
      var finalArr = [];

      var sticky = offers.sticky;
      var cp = offers.cp;
      var followed = offers.followed;
      var affiliate = offers.affiliate;
      
      sticky.forEach( function (offer) { finalArr.push(offer) });

      cp.forEach( function (offer) { 
        if ( offer.priority != 5 ) {
          finalArr.push(offer) 
        }
      });

      followed.forEach( function (offer) { 
        if ( offer.priority != 5 ) {
          finalArr.push(offer) 
        }
      });

      affiliate.forEach( function (offer) { 
        if ( offer.priority != 5 ) {
          finalArr.push(offer) 
        }
      });

      //return array up to a certain limit
      return finalArr.slice(0, limit);
    }

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function checkOnboardPromoGiven() {
      if(vm.member.username) {

        vm.onboardPromoArray = $filter('filter')(vm.offers, function(value, index, array){
            // return (value.user_earned == false && value.promo_freq == 1);
            return (value.activity == 'profile_complete' && value.user_earned == false);
          });

        if(vm.onboardPromoArray.length > 0) {
          offerService.promoEarned(vm.onboardPromoArray[0])
            .then(function (response) {
              if(response.success) {
                vm.member.reward.points = response.balanceReceiver;

                angular.forEach(vm.offers, function(value) {
                  if(value.activity == 'profile_complete') {

                    value.user_earned = true;
                    // re-filter the offers array update
                    vm.offers = $filter('filter')(vm.offers, function(value, index, array){
                      // return (value.user_earned == false && value.promo_freq == 1);
                      return (value.user_earned == false);
                    });
                  }
                });
              }
            });
        }
      }

    }

    function setCustomRedemptions() {

      angular.forEach(vm.redemptionOffers, function(value) {
        if(value.action.type == "DONATE") {
          vm.redeemDonate = value;
        }
        if(value.action.type == "SNACK") {
          vm.redeemSnack = value;
        }

      });
    }


    // offer in offers | filter:{ user_earned: false, promo_freq : 1 } | orderBy:'displayOrder' | limitTo:3 "

    function hideSplashScreen(){
      vm.showSplashScreen = false;
    }

    function goTo(state, params){
      TeletubbyNav.goTo(state, params);
    }

    function handleBa(){
      //$window.location="https://www.blueapron.com/?a=carepoynt_value";  
       $window.open("http://blue-apron.evyy.net/c/345682/151480/2880?subId1=" + vm.member.email, "_blank");
    }

    function handleFl(){
      //$window.location="https://www.freshly.com/?a=carepoynt_value";
      $window.open("http://freshly.evyy.net/c/345682/278160/4458?subId1=" + vm.member.email, "_blank");
      //alert("http://freshly.evyy.net/c/345682/278160/4458?subId1="   + vm.member.email);
    }


    function hasVisited() {

      if (typeof(Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        if(!localStorage.getItem('hasVisited') && !vm.member.email) {
          localStorage.setItem('hasVisited', true);
          return false;
        }
        else {
          return true;
        }
        
      } else {
          // Sorry! No Web Storage support..
          return true;

      }
    }

    function showMyProfileModal(){

      ModalService.showModal({
        templateUrl: "profile/index.html",
        controller: "ProfileController"
      })
      .then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal 
        // you can call 'modal' to show it, if it's a custom modal just show or hide 
        // it as you need to. 
        modal.element.modal();
        modal.close.then(function(result) {
          // do something cool with the result
          // $scope.message = result ? "You said Yes" : "You said No";
        });
      });
    }

    function gcShowMore(){
      vm.gc.limit = false;
      vm.gc.showMore = true;
    }

    function gcShowLess(){
      gcLimit()
      vm.gc.showMore = false;
    }

    function gcLimit() {
      vm.gc.limit = 3;
      if(vm.isMobile) {
        vm.gc.limit = 2;
      }
    }

    function mobilecheck() {
      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
    }

    function showAdd() {
      TeletubbyNav.showAdd();
    }

    function getTotalPoynts(promo){
      let poynts = 0;
      if(promo.hasOwnProperty('subPromos')) {
        promo.subPromos.forEach( function(promo) {
          poynts += parseInt(promo.reward_value);
        });
      } else {
        poynts = parseInt(promo.reward_value);
      }
      
      return poynts;
    }

    function isVariable(offer) {
      return offer.promo_type == "variable_promotion";
    }

}]);

