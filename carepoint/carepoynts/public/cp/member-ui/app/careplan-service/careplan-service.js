(function () {
  angular
    .module('app.careplan-service', [])
    .factory('careplanService', careplanService);

  careplanService.$inject = ['$http', '$q'];

  function careplanService($http, $q) {
    return {
      getEnterprisesByTagForMember: getEnterprisesByTagForMember,
      getNumberOfPromosByEntId: getNumberOfPromosByEntId

    };

    // -------------------------------------------
    
    function getEnterprisesByTagForMember(data) {
      const REQUEST_URL = '/careplan-service/' + data + '/enterprise';

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getNumberOfPromosByEntId(data) {
      const REQUEST_URL = '/careplan-service/enterprise/' + data + '/promos';
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
