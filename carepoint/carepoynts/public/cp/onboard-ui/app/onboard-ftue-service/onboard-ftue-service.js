(function () {
  angular
    .module('app.onboard-ftue-service', [])
    .factory('onboardFtueService', onboardFtueService);

  onboardFtueService.$inject = ['$http', '$q'];

  function onboardService($http, $q) {
    return {
      getMemberProfile: getMemberProfile,
      setMemberProfile: setMemberProfile
    };

    // -------------------------------------------

    function getMemberProfile(data) {
      const REQUEST_URL = '/onboard-member/profile';

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function setMemberProfile(data) {
      const REQUEST_URL = '/onboard-member/profile';

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
