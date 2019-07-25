(function () {
    angular.module('app.referBusiness', ['app.member'])
        .controller('referBusinessController', ['memberService', 'notificationService', 'memberDataItems', 'cpUtils',
            function (memberService, notificationService, memberDataItems, cpUtils) {

                let self = this;
                self.member = memberDataItems.member;

                function init() {
                    initReferBusinessModel();
                }

                function initReferBusinessModel() {
                    self.referBusinessModel = {
                        email: self.member.email,
                        message: '',
                        name: self.member.name,
                        businessemail: '',
                        businessname: '',
                        date: new moment().format("MM-DD-YYYY")
                    };
                }

                self.sendReferralEmail = function () {
                    //Validation need to be changed
                    if (!self.referBusinessModel.businessname || !self.referBusinessModel.message) {
                        notificationService.error("Please provide values for all input fields on form.");
                    }
                    if (!cpUtils.validateEmail(self.referBusinessModel.businessemail)) {
                        notificationService.error("Please enter valid email.");
                    }
                    if (self.referBusinessModel.businessname && self.referBusinessModel.message  && 
                        cpUtils.validateEmail(self.referBusinessModel.businessemail)) {
                        memberService.sendReferralEmail(self.referBusinessModel)
                            .then(function (response) {
                                if (response.success) {
                                    notificationService.success('Business referred succesfully.');
                                    initReferBusinessModel();
                                }
                                else
                                    notificationService.error('Error occcured while referring business.');
                            }, function error(err) {
                                notificationService.error('Error occcured while referring business.');
                            })
                    }
                };

                init();
            }])
})();