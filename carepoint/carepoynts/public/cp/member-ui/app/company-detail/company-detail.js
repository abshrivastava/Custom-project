'use strict';

angular.module('app.company-detail', ['app.enterprise-service', 'app.member-service', 'app.offer-service', 'ngMap', 'app.cp-utils', 'Teletubby.ui.shared.modules.nav', 'carepoynt-common-services'])

.controller('CompanyDetailCtrl', ['$scope', '$q','$filter', '$location', '$state', '$stateParams', '$window', 'enterpriseService', 
                                  'memberService', 'offerService', 'NgMap', 'featureToggleService', 'TeletubbyNav', 'alertService',
            function($scope, $q, $filter, $location, $state, $stateParams, $window, enterpriseService, memberService, offerService, NgMap, featureToggleService, TeletubbyNav, alertService) {
    const vm = $scope;
    vm.goBack = goBack;
    vm.goTo = goTo;
    vm.showEarnList = showEarnList;
    vm.showRedeemList = showRedeemList;
    vm.showMore = showMore;
    vm.showLess = showLess;
    vm.joyn = joyn;
    vm.address;
    vm.showAdd = showAdd;
    vm.type = 'earn';
    vm.isVariable = isVariable;

    vm.settings = {
      limit:3,
      showMore: false
    };
    vm.getCheckin = getCheckin;

  	init();

    // ******************************

  	function init() {
  		vm.loading = true;
      vm.entid = $stateParams.id;
      vm.showAddToHomescreen = false;


      $q.all({
        initialData: enterpriseService.getInitialData(vm.entid)
        // features: featureToggleService.getFeatureToggles(),
        // member: memberService.getMember(),
        // enterprise: enterpriseService.getEnterprise(vm.entid),
        // promotions: enterpriseService.getPromotionsForEnterprise(vm.entid),
        // redemptions: enterpriseService.getRedemptionsForEnterprise(vm.entid)
      })
      .then(function (response) {
        vm.features = response.initialData.features;
        vm.member = response.initialData.member;
        vm.enterprise = response.initialData.enterprise;
        vm.promotions = response.initialData.promotions;
        vm.redemptions = response.initialData.redemptions;
        vm.isEnterpriseMember = response.initialData.isEnterpriseMember;
        vm.address = "http://maps.apple.com/?address=" + encodeURI(vm.enterprise.ent_address + " " 
                                                                    + vm.enterprise.ent_city + " " 
                                                                    + vm.enterprise.ent_city + " " 
                                                                    + vm.enterprise.ent_zip);

        vm.promotions = vm.promotions.map(function(promo) {
          promo.poynts = getTotalPoynts(promo);
          return promo;
        });

        vm.offers = response.initialData.promotions;
        if(!vm.enterprise.profile_photo) {
            vm.enterprise.profile_photo = '/cp/img/cp/carepoynts-bg-banner.jpg';
        }

        if(vm.promotions.length == 1 && vm.redemptions.length == 0 ) {
          $location.replace();
          goTo('offer',{'type': vm.type, 'id':vm.promotions[0].id});
        }
        
        vm.loading = false;

        var md = new MobileDetect(window.navigator.userAgent);
        if(vm.features['dark.member.add-to-homescreen-button'] && md.mobile()){
          vm.showAddToHomescreen = true;
        }

      });

      NgMap.getMap().then(function(map) {
          map.setOptions({
            gestureHandling: 'none',
            scrollwheel: false,
            draggable: false,
            disableDefaultUI: true
          });
          console.log(map.getCenter());
          console.log('markers', map.markers);
          console.log('shapes', map.shapes);
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

    function showEarnList() {
      vm.type = 'earn';
      vm.offers = vm.promotions;
    }

    function showRedeemList() {
      vm.type = 'redeem';
      vm.offers = vm.redemptions;
    }

    function showMore() {
      vm.settings.limit = false;
      vm.settings.showMore = true;
    }

    function showLess() {
      vm.settings.limit = 3;
      vm.settings.showMore = false;
    }

    function joyn() {
      // if member has a username, then is onboarded already
      if(vm.member.username) {
        enterpriseService.joyn(vm.enterprise)
          .then(function (response) {
            if(response.success) {
              vm.showJoynSuccess = true;
              vm.isEnterpriseMember.status = true;
            }
            else {
              vm.showJoynError = true;
            }    
          });
      }
      else {
        $window.location = '/whatever-the-onboard-url-is';
      }
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

angular.module('app.cp-utils', [])
.filter('telephone', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 1:
            case 2:
            case 3:
                city = value;
                break;

            default:
                city = value.slice(0, 3);
                number = value.slice(3);
        }

        if(number){
            if(number.length>3){
                number = number.slice(0, 3) + '-' + number.slice(3,7);
            }
            else{
                number = number;
            }

            return ("(" + city + ") " + number).trim();
        }
        else{
            return "(" + city;
        }

    };
});