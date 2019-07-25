(function () {
  angular
    .module('app.dashboard-service', [])
    .factory('dashboardService', dashboardService);

  dashboardService.$inject = ['$http', '$q'];

  function dashboardService($http, $q) {
    return {
      getInitialData: getInitialData,
      getMember: getMember,
      getCPTangoOptions: getCPTangoOptions
    };

    //-------------------------------------------

    function getInitialData() {
      const REQUEST_URL = '/rewards/mem/dashboard/init';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          if(!response.data.member){
            window.location = '/login';
          }
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    
    function getMember() {
      const REQUEST_URL = '/cp/member/get_member';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMemberTotalPoints() {
      const REQUEST_URL = '/cp/member/poynts';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getCPTangoOptions() {
      const REQUEST_URL = '/rewards/redemption/tango/cp-options';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }
  }
})();
