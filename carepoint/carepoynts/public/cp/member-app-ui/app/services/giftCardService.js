(function () {
    angular.module('app.gift-card', ['app.utils', 'app.helpers', 'app.filters'])
        .service('giftCardService', ['$q', '$http', 'cpUtils',
            function ($q, $http, cpUtils) {

                this.getCPTangoOptions = function () {
                    const REQUEST_URL = '/redemption-service/tango/cp-options';
                    return $http
                        .get(REQUEST_URL)
                        .then(function success(response) {
                            return response.data;
                        }, function error(err) {
                            return $q.reject(cpUtils.getErrorDetails(err));
                        });
                };

                this.createOrder = function (data) {
                    const REQUEST_URL = '/rewards/redemption/tango/gc-offer';
                    return $http
                        .post(REQUEST_URL, data)
                        .then(function success(response) {
                            return response.data;
                        }, function error(err) {
                            return $q.reject(cpUtils.getErrorDetails(err));
                        });
                };

                this.getAllTangoCards = function () {
                    const REQUEST_URL = '/redemption-service/tango/rewards-list';
                    return $http
                        .get(REQUEST_URL)
                        .then(function success(response) {
                            return response.data.brands;
                        }, function error(err) {
                            return $q.reject(cpUtils.getErrorDetails(err));
                        });
                }

                this.getTangoCard = function (data) {
                    const REQUEST_URL = '/redemption-service/tango/gc/' + data.utid + '/' + data.amt;
                    return $http
                        .get(REQUEST_URL)
                        .then(function success(response) {
                            return response.data;
                        }, function error(err) {
                            return $q.reject(cpUtils.getErrorDetails(err));
                        });
                }

            }])
})();
