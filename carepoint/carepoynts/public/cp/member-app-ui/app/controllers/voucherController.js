(function () {
    angular.module('app.voucher', ['app.utils'])
        .controller('voucherController', ['notificationService', '$stateParams', 'voucherService', '$q',
            function (notificationService, $stateParams, voucherService, $q) {
                let self = this;

                var init = function () {
                    self.voucher = [];
                    getVoucherData();
                };

                function getVoucherData() {
                    voucherService.getVoucherDetailWithShowModal($stateParams.id)
                        .then(function (response) {
                            if (response) {
                                self.voucher = response;
                                self.voucher.redeem_date = convertLocalDate(self.voucher.redeem_date);
                            }
                            else {
                                notificationService.error(ERROR_CODES.Null_Response_Error);
                            }
                        }, function (err) {
                            notificationService.error(err);
                        })
                };

                function convertLocalDate(date) {
                    date = new Date(date);
                    var localOffset = date.getTimezoneOffset() * 60000;
                    var localTime = date.getTime();
                    date = localTime + localOffset;
                    date = new Date(date);
                    return date;
                };

                self.redeemVoucherWithoutPopUp = function () {
                    if (!self.voucher.showModal) {
                        self.redeemVoucher();
                    }
                };

                self.redeemVoucher = function () {
                    var prom = {};
                    prom.activateVoucher = voucherService.updateVoucherStatus(self.voucher);

                    if (self.dontShowVoucherCheckBox) {
                        prom.updateMember = voucherService.updateMemberTagForHidingVoucherModal(self.voucher.memberid);
                    }

                    $q.all(prom).then(function (response) {
                        if (response && response.updateMember && response.updateMember.success == false) {
                            notificationService.error("Unable to update user preference. Please try again.");
                        }
                        if (response && response.activateVoucher && response.activateVoucher.success == true) {
                            self.voucher.voucherStatus = 'Redeemed';
                            self.voucher.redeem_date = new Date();
                            notificationService.success("Voucher redemption was successful.");
                        }
                        else {
                            notificationService.error("There was some problem. Please try again.");
                        }
                    }, function (error) {
                        notificationService.error("Unable to redeem voucher at service. Please try again.");
                    })
                };

                init();
            }])

})();