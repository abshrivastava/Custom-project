angular.module('app.utils')
.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        autoDismiss: true,
        maxOpened: 1,
        newestOnTop: true,
        positionClass: 'toast-top-center',
        closeButton: true,
        allowHtml: true,
        maxOpened: 1,
        newestOnTop: true
    });
})
.factory('notificationService', ['toastr', function (toastr) {

    function success(msg) {
        toastr.success(msg);
    };

    function error(msg) {
        toastr.error(msg);
    };

    function error(msg,heading) {
        toastr.error(msg,heading);
    };

    function warning(msg) {
        toastr.warning(msg);
    };

    function warning(msg,heading) {
        toastr.warning(msg,heading);
    };

    function info(msg) {
        toastr.info(msg);
    };

    function info(msg,heading) {
        toastr.info(msg,heading);
    };

    return {
        success: success,
        error: error,
        warning: warning,
        info: info
    };
}]);