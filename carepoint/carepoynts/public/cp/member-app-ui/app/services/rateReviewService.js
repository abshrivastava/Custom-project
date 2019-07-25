(function () {
    angular.module('app.rateReview', [])
        .service('rateReviewService', ['$q', '$http', 'cpUtils', function ($q, $http, cpUtils) {
            this.submitReview = function (data) {
                const REQUEST_URL = '/rewards/rateReview/submitReview';
                return $http
                    .post(REQUEST_URL, data)
                    .then(function success(response) {
                        return response.data;
                    }, function error(err) {
                        return $q.reject(cpUtils.getErrorDetails(err));
                    });
            }

            this.getLatestReviewsByEntId = function (entid) {
                const REQUEST_URL = '/rewards/rateReview/getReviewsOfEnterprise?limit=3&entid=' + entid;
                return $http.get(REQUEST_URL).then(
                    function success(response) {
                        return response.data;
                    }, function error(err) {
                        return $q.reject(cpUtils.getErrorDetails(err));
                    });
            }

            this.getAverageRatingOfEnterprise = function (entid) {
                const REQUEST_URL = '/rewards/rateReview/getAverageRatingOfEnterprise?entid=' + entid;
                return $http.get(REQUEST_URL).then(
                    function success(response) {
                        return response.data;
                    }, function error(err) {
                        return $q.reject(cpUtils.getErrorDetails(err));
                    });
            }
        }])
})();