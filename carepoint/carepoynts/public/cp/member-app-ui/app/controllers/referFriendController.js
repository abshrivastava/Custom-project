(function () {
    angular.module('app.referral')
        .controller('referFriendController', ['referralService', 'notificationService', 'cpUtils',
            function (referralService, notificationService, cpUtils) {

                var self = this;
                self.referralLink = "";
                self.referral = {email: null};

                function init() {
                    referralService.getReferralLink().then(function (response) {
                        self.referralLink = response.success ? response.result : notificationService.error("Referral Code does not exist for member.");
                    }, function error() {
                        notificationService.error("Some error occured: try again");
                    });
                };

                self.sendReferral = function () {
                    if (cpUtils.validateEmail(self.referral.email)) {
                        referralService.sendReferral(null, null, self.referral).then(function (response) {
                            if (response.type == "warning") {
                                notificationService.warning(response.msg);
                            } else if (response.type == "error") {
                                notificationService.error(response.msg);
                            } else {
                                notificationService.success(response.msg);
                                self.referral.email = "";
                            }
                        }, function (err) {
                            notificationService.error(err);
                        })
                    }
                    else {
                        notificationService.error("Please verify email.");
                    }
                };

                init();
            }])
}());