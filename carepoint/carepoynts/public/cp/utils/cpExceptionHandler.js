angular.module('app.utils')
    .config(['$provide', function ($provide) {

        var $log = angular.injector(['ng']).get('$log');
        $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {

            function apiRequestHandling(exception, cause) {
                var err = "Exception code:" + exception + " ,request failed while processing " + cause + "route"
                $log.error(err);
            }

            $delegate.apiRequestHandling = apiRequestHandling;
            return $delegate;
        }]);

    }]);
