(function () {
    angular.module('app.careplan')
        .controller('careplanController', ['careplanList', function (careplanList) {

            var self = this;

            function init() {
                self.careplanList = careplanList;
            }

            init()
        }])
}());