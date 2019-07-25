'use strict';

angular.module('app.voucher', ['app.voucher-service', 'app.member-service',  'Teletubby.ui.shared.modules.nav', 'carepoynt-common-services'])

.controller('voucherCtrl', ['$scope', '$q', '$state', '$window', '$stateParams', 'memberService', 'ModalService', 'voucherService', 'featureToggleService', 'TeletubbyNav', 'alertService',
            function($scope, $q, $state, $window, $stateParams, memberService, ModalService, voucherService, featureToggleService, TeletubbyNav, alertService) {

    const vm = $scope;
    vm.goTo = goTo;
    vm.goBack = goBack;
    vm.getCheckin = getCheckin;
    vm.redeemVoucher = redeemVoucher;
    
    init();
    // ******************************

    function init() {
      vm.activeTab= "cancel";
      vm.showModal = false;
      vm.showBusy = false;
      vm.redeemSuccessful = false;
      vm.loading = true;
      vm.voucherId = $stateParams.id;

      var q = {
        features: featureToggleService.getFeatureToggles(),
        member: memberService.getMember(),
        voucher: voucherService.getVoucherDetail(vm.voucherId)
        
    };

       $q.all(q)
        .then(function (response) {
            if(response && response.features && response.member && response.voucher){
                vm.features = response.features;
                vm.member = response.member;
                vm.voucher = response.voucher;
                // vm.voucher.redeem_date = new Date(vm.voucher.redeem_date);
                vm.voucher.redeem_date = convertLocalDate(vm.voucher.redeem_date);
                vm.redeemSuccessful = vm.voucher.voucherStatus=='Redeemed' ? true: false;

                getVoucherModalBypassInfoFromMemberTag(vm.voucher.id, vm.voucher.poynts, vm.voucher.ent_id, vm.voucher.memberid)
                .then(function(response){
                    vm.showModal = response;
                    vm.loading = false;
                },function(error){
                     alertService.error("Error while displaying modal confirmation at service. Please try again.");
                     vm.loading = false;
                });
            }
            else{
                vm.loading = false;
                alertService.error("Error while loading data from server. ")
            }
        }, function(error){
            vm.loading = false;
            alertService.error("Error while initial load from server. Please try again.")
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
        TeletubbyNav.goTo(state, params);
    }

    function goBack(){
      $window.history.back();
    }

    function convertLocalDate(date) {
      date = new Date(date);

      var localOffset = date.getTimezoneOffset() * 60000;
      var localTime = date.getTime();
      date = localTime + localOffset;
      date = new Date(date);

      return date;
    }

    function redeemVoucher(){
        vm.activeTab= "activate";
        vm.showBusy = true;
        var prom = {};
        prom.activateVoucher = voucherService.updateVoucherStatus({"voucherId": vm.voucher.id, "poynts": vm.voucher.poynts, "entId": vm.voucher.ent_id, "memberId": vm.voucher.memberid});
        if(vm.checkbox == true){
            prom.updateMember = voucherService.updateMemberTagForHidingVoucherModal(memberId);
        }
        $q.all(prom).then(function(response){
            if(response && response.updateMember){
                if(response.updateMember.success == false){
                    alertService.error("Unable to update user preference. Please try again.");
                }
            }   
            if(response && response.activateVoucher){
                if(response.activateVoucher.success == true){
                    vm.redeemSuccessful = true;
                    vm.voucher.redeem_date = new Date();
                }
                else{
                    alertService.error("There was some problem. Please try again."); 
                }
            }
            vm.showBusy = false;
            }, 
            function(error){
                alertService.error("Unable to redeem voucher at service. Please try again.");
                vm.showBusy = false;
        })
    }

    function getVoucherModalBypassInfoFromMemberTag(voucherId, poynts, entId, memberId){
        var dfd = $q.defer();
        voucherService.getVoucherModalBypassInfoFromMemberTag({"memberId":memberId, "tagName":"bypassModalForVoucherRedeem"})
        .then(function(response){
            if(response && response.isActive){
                dfd.resolve(false);
            }
            else{
                dfd.resolve(true);
            }
        },function(error){
            dfd.resolve(false);
            alertService.error("Unable to get user preference at service. Please try again.")
        });
        return dfd.promise;
    }

    // function ActivateVoucher(voucherId, poynts, entId, memberId){
    //     return voucherService.updateVoucherStatus({"voucherId": voucherId, "poynts": poynts, "entId": entId, "memberId": memberId})
    //     .then(function(response){
    //         if(response && response.success == true){
    //                 vm.redeemSuccessful = true;
    //         }
    //         else{
    //             alertService.error("There was some problem. Please try again."); 
    //         }
    //     },
    //     function(error){
    //         alertService.error("Error while redeeming voucher at service. Please try again.");
            
    //     });
    // }
}]);