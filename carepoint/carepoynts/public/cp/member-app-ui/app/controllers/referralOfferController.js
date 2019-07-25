(function () {
    angular.module('app.offer')
        .controller('referralOfferController', ['$state', '$stateParams', 'notificationService', 'cpUtils', 'referralService', 'offerService',
             function ($state, $stateParams,  notificationService, cpUtils, referralService, offerService) {

                var self = this;
                self.referral = {
                    email: null,
                    mphone: null
                };

                self.sendReferral = function (isSend) {
                    if (isSend) {
                        if (self.referral.email || self.referral.mphone) {
                            referralService.sendReferral($state.$current.name, $stateParams.id, self.referral)
                                .then(function (response) {
                                    if (response.type == 'success') {
                                        notificationService.success(response.sg);
                                        cpUtils.goBack();
                                    } else if (response.type == 'warning') {
                                        notificationService.warning(response.msg);
                                    } else {
                                        notificationService.error(response.msg);
                                    }
                                }, function (err) {
                                    notificationService.error(err.error_message);
                                });
                        }
                        else {
                            notificationService.error("please fill require fields");
                        }
                    }
                    else {
                        cpUtils.goBack();
                    }
                };


                // self.sendReferral = function (isSend) {
                //     if (isSend) {
                //         if (self.referral.email || self.referral.mphone) {
                //             if ($state.$current.name == STATE_NAMES.ReferralOffer) {
                //                 referralOfferFriendsFamily();
                //             }
                //             if ($state.$current.name == STATE_NAMES.ReferFriend) {
                //                 referFriends();
                //             }
                //         }
                //         else {
                //             notificationService.error("please fill require fields");
                //         }
                //     }
                //     else {
                //         cpUtils.goBack();
                //     }
                // };


                // function referralOfferFriendsFamily() {
                //     offerService.getPromoDetail($stateParams.id).then(function (promoResponse) {
                //         promoResponse.referral = self.referral;
                //         offerService.promoReferral(promoResponse).then(function (response) {
                //             if (response.msg == 'Already a member.') {
                //                 notificationService.warning("That person is already a member.");
                //             }
                //             else if (response.msg == 'Already invited.') {
                //                 notificationService.warning("That person has already been invited.");
                //             }
                //             else if (response.success) {
                //                 notificationService.success("Invitation has been sent successfully.");
                //                 cpUtils.goBack();
                //             }
                //             else {
                //                 notificationService.error("Some error occured: couldn't sent your invitation.");
                //             }
                //         }, function error(err) {
                //             notificationService.error("Some error occured: couldn't sent your invitation.");
                //         });
                //     });
                // };

                // function referFriends() {
                //     referralService.referFriend(self.referral).then(function (response) {
                //         if (response.msg == 'Already a member.') {
                //             notificationService.warning("That person is already a member.");
                //         }
                //         else if (response.msg == 'Already invited.') {
                //             notificationService.warning("That person has already been invited.");
                //         }
                //         else if (response.success) {
                //             notificationService.success("Invitation has been sent successfully.");
                //             cpUtils.goBack();
                //         }
                //         else {
                //             notificationService.error("Some error occured: couldn't sent your invitation.");
                //         }
                //     }, function error(err) {
                //         notificationService.error("Some error occured: couldn't sent your invitation.");
                //     });
                // };

            }])
}());