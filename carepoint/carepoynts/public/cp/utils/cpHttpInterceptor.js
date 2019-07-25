(function () {
  angular.module('app.utils')
    .config(['$provide', '$httpProvider', function ($provide, $httpProvider) {

      // register the interceptor as a service
      $provide.factory('cpHttpInterceptor', ['$q', '$exceptionHandler', '$rootScope', function ($q, $exceptionHandler, $rootScope) {
        var reqCounter = 0;

        function setLoadingFalse() {
          reqCounter--;
          if (reqCounter === 0) {
            $rootScope.$emit('triggerLoader', { isLoading: false });
          }
        }
        return {
          // optional method
          'request': function (config) {
            // do something on success
            reqCounter++;
            if (reqCounter == 1) {
              $rootScope.$emit('triggerLoader', { isLoading: true });
            }
            return config;
          },

          // optional method
          'requestError': function (rejection) {
            // do something on error
            return $q.reject(rejection);
          },

          // optional method
          'response': function (response) {
            // do something on success
            setLoadingFalse();
            return response;
          },

          // optional method
          'responseError': function (rejection) {
            // do something on error
            setLoadingFalse();
            $exceptionHandler.apiRequestHandling(rejection.status, rejection.config.url);
            return $q.reject(rejection);
          }
        };
      }]);

      $httpProvider.interceptors.push('cpHttpInterceptor');

    }])
}());