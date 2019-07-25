(function () {
    angular
      .module('app.homeService', [])
      .factory('homeService', onboardService);
  
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
        goDosgetsData: goDosgetsData
      };
  
      // -------------------------------------------
  
      function test() {
        const REQUEST_URL = '/onboard-member/profile';
  
        return "yo";
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