(function () {
    angular.module('app.careplan')
        .controller('careplanTypeController', ['enterpriseList', 'notificationService','enterpriseService','cpUtils', function (enterpriseList, notificationService,enterpriseService,cpUtils) {

            var self = this;

            function init() {
                self.enterprises = [];
                if (enterpriseList) {
                    self.enterprises = enterpriseList.error_code ? notificationService.error(enterpriseList.error_message)
                        : (enterpriseList.joyned || enterpriseList.network) ? enterpriseList : [];
                }
                else {
                    notificationService.error(ERROR_CODES.Null_Response_Error);
                }
            };

            self.onEnterpriseClick = function (entId, num_of_offers, isAffiliated, single_promo_id) {
                if (!!+isAffiliated && (num_of_offers == 1)) {
                    cpUtils.goTo('member.earn.affiliatedOffer', { 'type': ENTERPRISE_TABS.Earn, 'id': single_promo_id });
                }
                else {
                    cpUtils.goTo('member.earn.enterprise', { 'entId': entId });
                }
            };

            init()
        }])
}());