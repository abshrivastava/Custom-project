(function () {
    angular.module('app.redeem', ['app.utils', 'app.helpers']).service('redeemService',
        ['$q', '$http', 'cpUtils', 'cacheService', function ($q, $http, cpUtils, cacheService) {

            this.getRedeemData = function (location) {

                const REQUEST_URL = '/rewards/redeem-offers?memberid=' +
                    cacheService.get('MemberData').memberid + '&location=' + location;
                return $http.get(REQUEST_URL).then(
                    function success(response) {
                        return response.data;
                    }, function error(err) {
                        return $q.reject(cpUtils.getErrorDetails(err));
                    });
            };

            this.searchRedeemData = function (location, txtSearch) {

                const REQUEST_URL = '/rewards/search-redeem-offers?memberid=' +
                    cacheService.get('MemberData').memberid + '&location=' + location + '&txtSearch=' +txtSearch;
                return $http.get(REQUEST_URL).then(
                    function success(response) {
                        return response.data;
                    }, function error(err) {
                        return $q.reject(cpUtils.getErrorDetails(err));
                    });
            };

        }])
})();