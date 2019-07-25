(function () {

    function cpDatePickerController(cpUtils) {
        var self = this;

        self.defaultOptions = {
            formatYear: 'yy',
            startingDay: 1,
            showWeeks: false
        };

        self.clear = function () {
            self.dateModel = null;
        };

        self.openCalendar = function (event) {
            self.opened = true;
        };

        self.needUibPicker = function() {

            // var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);
            // var isIE = /*@cc_on!@*/false || !!document.documentMode;
            // var isEdge = !isIE && !!window.StyleMedia;
            var isChrome = !!window.chrome && !!window.chrome.webstore;

            if (!cpUtils.isMobile() && (!isChrome)) {
                return true;
            }
            else {
                return false;
            }
        }();

        self.$onInit = function () {
            self.format = self.format ? self.format : "MM/dd/yyyy"
            angular.extend(self.defaultOptions, self.dateOptions);
        };
    };

    angular.module("app.components").component('cpDatePicker', {

        bindings: {
            dateModel: "=",
            dateOptions: "=",
            dateRequired: '@',
            startDate: '=',
            endDate: '=',
            format: '@',
            name: '@',
            isDisabled: '@'
        },
        template:
        '<div class="input-group" ng-if="ctrl.needUibPicker" >' +
        '<input type="text" class="form-control" uib-datepicker-popup="{{ctrl.format}}" name="{{ctrl.name}}" ng-model="ctrl.dateModel" min-date="ctrl.startDate"' +
        'max-date="ctrl.endDate" is-open="ctrl.opened" datepicker-options="ctrl.defaultOptions" ng-change="ctrl.changeDate()" ng-required="{{ctrl.dateRequired}}" auto-focus ' +
        'ng-click="ctrl.openCalendar($event)" on-open-focus="false" input-mask="{mask: \'99/99/9999\'}" readonly ng-disabled="ctrl.isDisabled" />' +
        '<span class="input-group-btn" style="">' +
        '<button type="button" class="btn btn-info" ng-click="ctrl.openCalendar($event)" title="Calendar" ng-disabled="ctrl.isDisabled" ><i class="fa fa-calendar"></i></button>' +
        '</span>' +
        '</div>' +
        '<input name="{{ctrl.name}}" class="form-control h-sm" type="date" ng-if="!ctrl.needUibPicker" ng-model="ctrl.dateModel" ng-required="{{ctrl.dateRequired}}" >',
        controller: ['cpUtils', cpDatePickerController],
        controllerAs: 'ctrl'
    })
}());
