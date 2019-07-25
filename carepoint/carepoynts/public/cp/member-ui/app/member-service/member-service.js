(function () {
  angular
    .module('app.member-service', ['carepoynt-common-services'])
    .factory('memberService', memberService);

  memberService.$inject = ['$http', '$q','alertService'];

  function memberService($http, $q,alertService) {
    return {
      getMember: getMember,
      getMemberEnterprises: getMemberEnterprises,
      login: login,
      saveProfile: saveProfile,
      getMemberStepsToday: getMemberStepsToday,
      getHumanApiProfile: getHumanApiProfile,
      getOnboardUrl: getOnboardUrl,
      sendMemberEmail: sendMemberEmail,
      sendReferralEmail: sendReferralEmail,
      getMemberAddToHomescreenTag: getMemberAddToHomescreenTag,
      postCheckin:postCheckin,
      createAddToHomeTag: createAddToHomeTag,
      getMemberPoyntsLog: getMemberPoyntsLog,
      getMemberGiftCardData: getMemberGiftCardData,
      saveInterests: saveInterests,
      getInterests: getInterests
    };

    //-------------------------------------------

    function getMember() {
      const REQUEST_URL = '/rewards/mem/get';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          if(!response.data.memberid){
            window.location = '/login';
          }
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMemberEnterprises() {
      const REQUEST_URL = '/rewards/mem/enterprises';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function isLogin() {
      const REQUEST_URL = '/rewards/member/login';

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          if(!response.data){
            window.location = '/login';
          }
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function login(data) {
      const REQUEST_URL = '/login';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function saveProfile(data) {
      const REQUEST_URL = '/rewards/mem/profile/save';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMemberStepsToday() {
      const REQUEST_URL = '/rewards/mem/steps-today';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getHumanApiProfile() {
      const REQUEST_URL = '/rewards/mem/humanapi';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getOnboardUrl() {
      const REQUEST_URL = '/rewards/mem/onboardUrl';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function sendMemberEmail(data) {
      const REQUEST_URL = '/rewards/mem/help';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function sendReferralEmail(data) {
      const REQUEST_URL = '/rewards/mem/referbusiness';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }
    
    function getMemberAddToHomescreenTag() {
      const REQUEST_URL = '/rewards/mem/getMemberAddToHomescreenTag';
      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function createAddToHomeTag(data) {
      const REQUEST_URL = '/tag-service/createMemberTag';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function postCheckin(vm,data) {
          const REQUEST_URL = '/enterprise-service/scan_earn';

          return $http
              .post(REQUEST_URL, data)
              .then(function success(response) {
                  var resp=response.data;
                  if (!resp.success) {
                      alertService.warning(resp.msg);
                      classie.remove(document.getElementById('st-container'), 'st-menu-open');
                  }
                  else {
                      classie.remove(document.getElementById('st-container'), 'st-menu-open');
                      alertService.info(resp.msg);
                      // vm.member.reward.points=resp.msg;
                  }
                  return resp;
              }, function error() {
                  return $q.reject();
              });
      }


    function getMemberPoyntsLog(data) {
      const REQUEST_URL = '/rewards/mem/getPoyntsLog';
        return $http
          .post(REQUEST_URL, data)
          .then(function success(response) {
            return response.data;
          }, function error() {
            return $q.reject();
          });
    }

    function getMemberGiftCardData(data) {
      const REQUEST_URL = '/rewards/mem/getMemberGiftCardData';
        return $http
          .post(REQUEST_URL, data)
          .then(function success(response) {
            return response.data;
          }, function error() {
            return $q.reject();
          });
    }

    function saveInterests(data) {
      const REQUEST_URL = '/tag-service/member/interests/save';
        return $http
          .post(REQUEST_URL, data)
          .then(function success(response) {
            return response.data;
          }, function error() {
            return $q.reject();
          });
    }

    function getInterests() {
      const REQUEST_URL = '/tag-service/member/interests/get';
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
