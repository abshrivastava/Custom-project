(function () {
  angular
    .module('app.onboard-service', [])
    .factory('onboardService', onboardService);

  onboardService.$inject = ['$http', '$q'];

  function onboardService($http, $q) {
    return {
      getMemberProfile: getMemberProfile,
      setMemberProfile: setMemberProfile,
      getMemberEula: getMemberEula,
      setMemberEula: setMemberEula,
      goDosgets: goDosgets,
      goDosgetsValidate: goDosgetsValidate,
      checkEmail: checkEmail,
      checkPhone: checkPhone,
      goMakeMe: goMakeMe,
      goDosgetsValidate1Step: goDosgetsValidate1Step,
      goDosgets1Step: goDosgets1Step,
      goDosgetsValidate2Step: goDosgetsValidate2Step,
      goDosgets2Step: goDosgets2Step,
      goUpdateMe: goUpdateMe,
      goDosgets1StepUpdate: goDosgets1StepUpdate,
      goDosgetsRoll: goDosgetsRoll,
      goDosgetsRollUpdate: goDosgetsRollUpdate,
      goDosgetsData: goDosgetsData,
      getConfigData: getConfigData
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

    function getMemberEula(data) {
      const REQUEST_URL = '/onboard-member/eula';

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function setMemberEula(data) {
      const REQUEST_URL = '/onboard-member/eula';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function goDosgetsValidate(data) {
      const REQUEST_URL = '/onboard/member/dosgets-validate';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }


    function goDosgets(data) {
      const REQUEST_URL = '/onboard/member/dosgets-promo';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }    
    
    function checkEmail(data) {
      const REQUEST_URL = '/onboard/member/check-email?email='+(data);

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function checkPhone(data) {
      const REQUEST_URL = '/onboard/member/check-phone?phone='+data;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function goMakeMe(data) {
      const REQUEST_URL = '/onboard/member/dosgets-create-member';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function goDosgetsValidate1Step(data) {
      const REQUEST_URL = '/onboard/member/dosgets-validate-1-step';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function goDosgets1Step(data) {
      const REQUEST_URL = '/onboard/member/dosgets-promo-1-step';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }  

    function goDosgetsValidate2Step(data) {
      const REQUEST_URL = '/onboard/member/dosgets-validate-2-step';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function goDosgets2Step(data) {
      const REQUEST_URL = '/onboard/member/dosgets-promo-2-step';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    } 

    function goUpdateMe(data) {
      const REQUEST_URL = '/onboard/member/dosgets-update-member';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    } 

    function goDosgets1StepUpdate(data) {
      const REQUEST_URL = '/onboard/member/dosgets-1-step-update';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });      
    }   

    function goDosgetsRoll(data) {
      const REQUEST_URL = '/onboard/member/dosgets-create-roll';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function goDosgetsRollUpdate(data) {
      const REQUEST_URL = '/onboard/member/dosgets-update-roll';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function goDosgetsData(data) {
      const REQUEST_URL = '/onb/getdata' + '?path=' + data;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }
    
    function getConfigData() {
      const REQUEST_URL = '/onb/config';

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
