(function () {
  angular
    .module('app.dev-tools-service', [])
    .factory('devToolsService', devToolsService);

  devToolsService.$inject = ['$http', '$q'];

  function devToolsService($http, $q) {
    return {
      getDevToolsInitialData: getDevToolsInitialData,
      login: login,
      isLogin: isLogin,
      searchYelp: searchYelp,
      getAllEnterprises: getAllEnterprises,
      updateEnterprise: updateEnterprise,
      getFeatureToggles: getFeatureToggles,
      updateFeatureToggles: updateFeatureToggles,
      scanPromotion: scanPromotion
    };

    //-------------------------------------------

    function getDevToolsInitialData() {
      const REQUEST_URL = '/dev-tools';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function isLogin() {
      const REQUEST_URL = '/command-center/islogin';
      //the .get(request_url doesn't have defined data.) 
      //.get used to be REQUEST_URL, data
      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function login(data) {
      const REQUEST_URL = '/command-center/command-login';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {

          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function searchYelp(data) {
      const REQUEST_URL = '/command-center/yelp/search';

      return $http
        .get(REQUEST_URL, {params: data})
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getAllEnterprises() {
      const REQUEST_URL = '/command-center/enterprise/all';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updateEnterprise(data) {
      const REQUEST_URL = '/command-center/enterprise/update';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getFeatureToggles() {
      const REQUEST_URL = '/command-center/feature-toggle';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updateFeatureToggles(data) {
      const REQUEST_URL = '/command-center/feature-toggle/update';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function scanPromotion(data) {
      const REQUEST_URL = '/command-center/promotion/scan';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

  }
})();
