(function () {
  angular
    .module('app.report-service', [])
    .factory('reportService', reportService);

  reportService.$inject = ['$http', '$q', '$parse' ];

  function reportService($http, $q, $parse) {
    return {
      getMembersData: getMembersData,
      getReferralData: getReferralData,
      getTransactionData: getTransactionData,
      getTotalPoynts: getTotalPoynts,
      getEnterpriseDayWisePoynts: getEnterpriseDayWisePoynts,
      getMemberMostPoynts: getMemberMostPoynts,
      getCheckins: getCheckins,
      getMembersDailyCount: getMembersDailyCount,
      getAllDailyMemberLogins: getAllDailyMemberLogins,
      getMePromoReport: getMePromoReport,
      getMeRedemReport: getMeRedemReport
    };

    //-------------------------------------------

    function getMembersData(eid) {
      const REQUEST_URL = '/command-center/report/members/data?eid='+eid;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getReferralData() {
      const REQUEST_URL = '/command-center/report/referral/data';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getTransactionData(eid) {
      const REQUEST_URL = '/command-center/report/transaction/data?eid='+eid;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getTotalPoynts(eid) {
      const REQUEST_URL = '/command-center/report/poynts/data?eid=' + eid;
      
      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getEnterpriseDayWisePoynts(data) {
      const REQUEST_URL = '/command-center/report/enterprise/poynts';
      
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMemberMostPoynts(data) {
      const REQUEST_URL = '/command-center/report/member-poynts/data';
      
      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getCheckins() {
      const REQUEST_URL = '/command-center/report/checkins/data';
      
      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMembersDailyCount(eid) {
      const REQUEST_URL = '/command-center/report/members/daily?eid='+eid;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getAllDailyMemberLogins() {
      const REQUEST_URL = '/command-center/report/logins/daily/all';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMePromoReport(data) {
      const REQUEST_URL = '/command-center/report/promotions/particular/range/' + data.start + '/' + data.end + '/' + data.id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });      
    }

    function getMeRedemReport(data) {
      const REQUEST_URL = '/command-center/report/redemptions/particular/range/' + data.start + '/' + data.end + '/' + data.id;

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
