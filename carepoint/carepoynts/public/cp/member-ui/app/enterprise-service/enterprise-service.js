(function () {
  angular
    .module('app.enterprise-service', [])
    .factory('enterpriseService', enterpriseService);

  enterpriseService.$inject = ['$http', '$q'];

  function enterpriseService($http, $q) {
    return {
      getInitialData: getInitialData,
      getEnterprise: getEnterprise,
      getEnterpriseOffers: getEnterpriseOffers,
      getPromotionsForEnterprise: getPromotionsForEnterprise,
      getRedemptionsForEnterprise: getRedemptionsForEnterprise,
      joyn: joyn

    };

    // -------------------------------------------

    function getInitialData(id) {
      const REQUEST_URL = '/rewards/ent/company-details/'+id+'/init';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          if(!response.data.member)
            window.location.href = "/login";
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }
    
    function getEnterprise(id) {
      const REQUEST_URL = '/rewards/ent/'+id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getEnterpriseOffers(id) {
      const REQUEST_URL = '/rewards/ent/offers?id='+id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getPromotionsForEnterprise(id) {
      const REQUEST_URL = '/rewards/ent/promotions?id='+id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getRedemptionsForEnterprise(id) {
      const REQUEST_URL = '/rewards/ent/redemptions?id='+id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function joyn(data) {
      const REQUEST_URL = '/rewards/ent/joyn';

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
