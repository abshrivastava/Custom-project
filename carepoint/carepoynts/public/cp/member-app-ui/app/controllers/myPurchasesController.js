(function () {
    angular.module('app.myPurchases', ['app.utils'])
        .controller('myPurchasesController', ['purchases', 'notificationService', function (purchases, notificationService) {
            let self = this;

            var init = function () {
                self.purchases = [];
                
                if (purchases) {
                    self.purchases = purchases.error_code ? notificationService.error(purchases.error_message) : purchases;
                } else {
                    notificationService.error(ERROR_CODES.Null_Response_Error);
                }
            };

            init();
        }])
})();