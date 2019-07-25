(function () {
    angular.module('app.gift-card')
        .controller('giftCardController',
        ['giftCardService', 'notificationService', 'giftCardData', '$stateParams', '$filter', '$rootScope',
            'memberService', '$q', '$window',
            function (giftCardService, notificationService, giftCardData,
                $stateParams, $filter, $rootScope, memberService, $q, $window) {

                let self = this;

                let init = function () {
                    // let giftCardDataFromService = [];
                    self.canRedeem = false;

                    if (giftCardData) {
                        self.card = !giftCardData.success ? notificationService.error(giftCardData.msg) : giftCardData;
                    }
                    else {
                        notificationService.error(ERROR_CODES.Null_Response_Error);
                    }
                    
                    // Removed, as service call now handles this
                    // //Can be moved to service
                    // self.card.brand = $filter('filter')(giftCardDataFromService, function (value, index, array) {
                    //     for (let i = 0; i < value.items.length; i++) {
                    //         return value.items[i].utid == $stateParams.utid;
                    //     }
                    // })[0];

                    //CanRedeem can be moved to resolve 
                    getMemberData();
                }

                init();

                function canRedeem(value, points) {
                    return points >= value;
                }

                self.createOrder = function (order, value) {
                    order.value = value;
                    order.imageUrl = self.card.brand.imageUrls['130w-326ppi'];
                    giftCardService.createOrder(order)
                        .then(function (response) {
                            if (response && response.success == false) {
                                // if (response.status == 'zeroFriction') {
                                //     $window.location = response.onboardUrl; //TODO -> Not clear
                                // }
                                // else if (response.message == 'Insufficient Poynts') {
                                if (response.message == 'Insufficient Poynts') {
                                    notificationService.error("Unfortunately the reward is unavailable at this time.  Please try again later.");
                                }
                                else
                                    notificationService.info("Unfortunately you are not eligible to redeem at this time.  Please try again later.");
                            }
                            else {
                                if (response && response.status == 'COMPLETE') {
                                    notificationService.success("Congratulations! Check your email for your reward.");
                                }
                                if (response && response.errors) {
                                    notificationService.error("Unfortunately the reward is unavailable at this time.  Please try again later.");
                                }
                                getMemberData(true);
                            }
                        }, function (err) {
                            notificationService.error(err.error_message);
                        });
                };

                function getMemberData(needLatest) {
                    memberService.getMember(needLatest).then(function (response) {
                        success(response, needLatest);
                    }, function error() {
                        notificationService.error("Couldn't get member details, try again");
                    });
                };

                function success(response, needLatest) {
                    if (response) {
                        if (needLatest) {
                            $rootScope.$emit('refreshMemberData');
                        }
                        self.canRedeem = canRedeem(self.card.carepoynt_value, response.reward.points);
                    }
                    else {
                        notificationService.error("Couldn't get member details, try again");
                    }
                };
            }])
})();