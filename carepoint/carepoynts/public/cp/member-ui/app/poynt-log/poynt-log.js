'use strict';
var app = angular.module('app.poynt-log', ['Teletubby.ui.shared.modules.nav', 'carepoynt-common-services', 'app.member-service', 'app.feature-toggle-service']);
app.controller('poyntlogController', ['$scope', '$window', '$filter', 'memberService', 'TeletubbyNav', '$q', 'featureToggleService', 'alertService',
 function ($scope, $window, $filter, memberService, TeletubbyNav, $q, featureToggleService, alertService) {
    var vm = $scope;
    vm.showMemberPoyntLog = showMemberPoyntLog;
    vm.goBack = goBack;
    vm.goTo = goTo;
    vm.showAdd = showAdd;
    vm.getCheckin = getCheckin;

    showMemberPoyntLog();
    function showMemberPoyntLog() {
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
                memberService.getMemberPoyntsLog({ 'entId': vm.member.entid, 'memberId': vm.member.memberid, 'poyntBalance': vm.memberBalance })
                    .then(function (response) {
                        if(response && response.length>0){
                            vm.transactions = arangeMyArray(response);
                        }
                        // vm.loading = false;
                    },
                function(error){
                    // vm.loading = false;                    
                    alertService.error("Error occured while loading transactions. Please try again.")
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

            memberService.getMemberAddToHomescreenTag(vm.member.memberid)
            .then(function (response) {
                if(response.count == 0){
                    if(md.mobile()) {
                    TeletubbyNav.showAdd();
                    TeletubbyNav.createA2HTag(vm.member.memberid);
                    }
                }

          });
        }, 
        function(error){
            vm.loading = false;                    
            alertService.error("Error occured while initial request load. Please try again.")
        }
        );
    }

    function arangeMyArray(dataItems){
        var arrangedArray = [];
        var keepGoing = true;
        
        angular.forEach(dataItems, function(item) {
            if(keepGoing) {
                var pushObj  = {};
                var sameDateObj = $filter('filter')(dataItems, function(filterItem){
                    return  (item.transaction_date == filterItem.transaction_date);
                });
                if(sameDateObj && sameDateObj.length>0){
                    pushObj.transactionData = sameDateObj;
                    pushObj.transaction_date = item.transaction_date; 
                    arrangedArray.push(pushObj);
                }
                
                var diffDateObj = $filter('filter')(dataItems, function(filterItem){
                    return  (item.transaction_date != filterItem.transaction_date);
                });
                dataItems = diffDateObj;
                if(diffDateObj.length == 0){
                    keepGoing = false;
                }
            }
            
        });
        return arrangedArray;
    }

    function getCheckin() {
      TeletubbyNav.checkin(vm).then(function(response){
        if(response){
              vm.member.reward.points = response.points;
            }
        });
    }

    function goBack(){
      $window.history.back();
    }

    function goTo(state, params){
      TeletubbyNav.goTo(state, params);
    }

    function showAdd() {
      TeletubbyNav.showAdd();
    }
}]);
