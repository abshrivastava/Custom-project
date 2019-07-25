(function () {
    angular.module('app.feature-toggle', [])
        .factory('featureToggleService', featureToggleService);

    featureToggleService.$inject = ['$http', '$q'];

    function featureToggleService($http, $q) {
        return {
            getFeatureToggles: getFeatureToggles
        };

        //-------------------------------------------

        function getFeatureToggles(data) {
            const REQUEST_URL = '/rewards/feature-toggles';

            return $http
                .get(REQUEST_URL, data)
                .then(function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject();
                });
        }
    }
})();
