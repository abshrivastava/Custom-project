(function () {
    angular.module('app.clique', [])
        .controller('cliqueController', ['cliqueService', 'notificationService', 'cpUtils',
        function (cliqueService, notificationService, cpUtils) {
            var self = this;

            function initCliqueModel() {
                self.clique = {
                    name: ""
                };
            };

            self.addClique = function () {
                cliqueService.addClique(self.clique).then(function (response) {
                    if (response.success) {
                        notificationService.success("clique has been added succesfully.");
                        initCliqueModel();
                        cpUtils.goTo('member.cliques');
                    }
                }, function error() {
                    notificationService.error("Error occured: Try again !");
                });
            };

            initCliqueModel();

        }]);
}());