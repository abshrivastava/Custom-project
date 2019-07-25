angular.module('app.contactus', ['app.member'])
    .controller('contactUsController', ['$scope', 'memberService', 'notificationService', function ($scope, memberService, notificationService) {

        var vm = $scope;
        vm.sendMemberEmail = sendMemberEmail;

        function sendMemberEmail() {
            if (vm.message) {
                var data = {};
                data.name = vm.member.name;
                data.email = vm.member.email;
                data.message = vm.message;
                data.date = new moment().format("DD-MM-YYYY");
                memberService.sendMemberEmail(data).then(
                    function success(response) {
                        if (response.success) {
                            notificationService.success('message sent succesfully.');
                            vm.message = "";
                        }
                        else {
                            notificationService.error('Error occcured, while sending your message.');
                        }

                    },
                    function error(err) {
                        notificationService.error('Error occcured, while sending your message.');
                    });
            }
            else {
                notificationService.error('Please type a message.');
            }
        }

    }])

