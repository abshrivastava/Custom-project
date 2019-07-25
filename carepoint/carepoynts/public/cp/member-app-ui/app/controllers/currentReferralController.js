(function () {
    angular.module('app.currentReferral', [])
        .controller('currentReferralController', ['notificationService', 'cpUtils', 'currentReferrals', 'referralService', '$state',
            function (notificationService, cpUtils, currentReferrals, referralService, $state) {
                var self = this;

                function init() {
                    if (currentReferrals) {
                        self.referrals = currentReferrals.success ? currentReferrals.result : [];
                    }
                    else {
                        notificationService.error(ERROR_CODES.Null_Response_Error);
                    }
                };

                self.sendInvite = function (referral) {
                    var newRef = {'email': referral.inviteemail, 'inviteid': referral.inviteid}
                    referralService.sendReferral($state.$current.name, null, newRef)
                        .then(function (response) {
                            if (response.type == 'success') {
                                notificationService.success(response.msg);
                                cpUtils.goTo();
                            } else if (response.type == 'warning') {
                                notificationService.warning(response.msg);
                            } else {
                                notificationService.error(response.msg);
                            }
                        }, function (err) {
                            notificationService.error(err.error_message);
                        });
                };

                self.getDate = function(val){
                    return cpUtils.parseDate(val); 
                }

                init();

            }]);
}());