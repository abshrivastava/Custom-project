(function () {
    angular.module("app.earn", [])
        .service('earnService', ['$q', '$http', 'cpUtils', 'cacheService', function ($q, $http, cpUtils, cacheService) {

            this.getEarnOffers = function (location) {
                const REQUEST_URL = '/rewards/earn-offers?memberid=' + cacheService.get('MemberData').memberid + '&location=' + location;
                let dfd = $q.defer();

                $http.get(REQUEST_URL).then(
                    function success(response) {
                        dfd.resolve(response.data);
                    }, function error(err) {
                        dfd.reject(cpUtils.getErrorDetails(err));
                    });
                return dfd.promise;
            };

            this.searchEarnOffers = function (keyword, location) {
                const REQUEST_URL = '/rewards/search-earn-offers?memberid=' + cacheService.get('MemberData').memberid 
                + '&keyword=' + keyword + '&location=' + location;
                let dfd = $q.defer();

                $http.get(REQUEST_URL).then(
                    function success(response) {
                        dfd.resolve(response.data);
                    }, function error(err) {
                        dfd.reject(cpUtils.getErrorDetails(err));
                    });
                return dfd.promise;
            };

        }])
})();