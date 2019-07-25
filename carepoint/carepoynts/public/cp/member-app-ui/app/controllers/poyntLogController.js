(function () {
    angular.module('app.poyntLog', ['app.utils'])
        .controller('poyntLogController', ['poyntLog', 'notificationService', function (poyntLog, notificationService) {

            let self = this;
            let init = function () {
                self.poyntLog = [];
                
                if (poyntLog) {
                    self.poyntLog = poyntLog.error_code ? notificationService.error(poyntLog.error_message) : poyntLog;
                }
                else {
                    notificationService.error(ERROR_CODES.Null_Response_Error);
                }
            }

            init();
        }])
})();