(function () {
    angular.module("app.components", []).component('cpLoader', {

        template: '<div ng-show="ctrl.isLoading" class="loading-page">' +
        '<i class="fa fa-spinner fa-pulse loading-icon"></i>' +
        '</div>',

        controller: ['$rootScope', '$window', function ($rootScope, $window) {
            var self = this;
            self.$onInit = function () {
                var onTriggerLoader = function (event, args) {
                    var loaderHeight = angular.element(document.querySelector('#memberUiView'))[0].scrollHeight
                        + angular.element(document.querySelector("header")).innerHeight();

                    angular.element(document.querySelector('.loading-page')).css("height", Math.max(loaderHeight, $window.innerHeight))
                    self.isLoading = args.isLoading;
                }
                $rootScope.$on('triggerLoader', onTriggerLoader);
            };
        }],
        controllerAs: 'ctrl'
    })
}());
