'use strict';
var app = angular.module('app.my-log', ['Teletubby.ui.shared.modules.nav', 'app.member-service','app.feature-toggle-service', 'carepoynt-common-services']);
app.controller('mylogCtrl', ['$scope', '$window', '$filter', 'memberService', 'TeletubbyNav', '$q', 'featureToggleService', 'alertService',
 function ($scope, $window, $filter, memberService, TeletubbyNav, $q, featureToggleService, alertService) {
    var vm = $scope;
    vm.goBack = goBack;
    vm.goTo = goTo;
    vm.showVouchers = showVouchers;
    vm.showPoyntLog = showPoyntLog;
    vm.showVoucher = true;
    vm.showLog = false;
    vm.activeTab = 'voucher';
    vm.showAdd = showAdd;
    vm.getCheckin = getCheckin;
    vm.showFooterMessage = showFooterMessage;
    vm.displayFooter = false;

    function showVouchers(){
        vm.showVoucher = true;
        vm.showLog = false;
        vm.activeTab = 'voucher';
    }

    function showPoyntLog(){
        vm.showVoucher = false;
        vm.showLog = true;
        vm.activeTab = 'poyntLog';
    }

    showVouchers();

    function showVouchers() {
        vm.loading = true;
        vm.showAddToHomescreen = false;

        $q.all({
             features: featureToggleService.getFeatureToggles(),
             member: memberService.getMember(),
        })
        .then(function (response) {
            if(response && response.features && response.member){
                vm.features = response.features;
                vm.member = response.member;
                vm.memberBalance = vm.member.reward.points;
                memberService.getMemberGiftCardData({'entId': vm.member.entid, 'memberId': vm.member.memberid})
                    .then(function (resp) {
                        if(resp && resp.length>0){
                            vm.giftcards = resp;
                        }
                        else{
                            showFooterMessage();
                        }
                        // vm.loading = false;
                    },
                function(error){
                    // vm.loading = false;                    
                    alertService.error("Error occured while loading giftcard. Please try again.")
                });
            }
            else{
                // vm.loading = false;                    
                alertService.error("Error occured while getting member & features. Please try again.")
            }

            vm.loading = false;

            var md = new MobileDetect(window.navigator.userAgent);
            if(vm.features['dark.member.add-to-homescreen-button'] && md.mobile()){
            vm.showAddToHomescreen = true;
            }

        }, 
        function(error){
            vm.loading = false;                    
            alertService.error("Error occured while initial request load. Please try again.")
        }
        );
    }

    function goBack(){
      $window.history.back();
    }

    function goTo(state, params){
      TeletubbyNav.goTo(state, params);
    }

    function getCheckin() {
      TeletubbyNav.checkin(vm).then(function(response){
        if(response){
              vm.member.reward.points = response.points;
            }
        });
    }

    function showAdd() {
      TeletubbyNav.showAdd();
    }

    function showFooterMessage(){
        vm.displayFooter = true;
    }

}]);
