(function () {
  angular
    .module('app.dev-tools-service', [])
    .factory('devToolsService', devToolsService);

  devToolsService.$inject = ['$http', '$q', '$parse' ];

  function devToolsService($http, $q, $parse) {
    return {
      getDevToolsInitialData: getDevToolsInitialData,
      login: login,
      isLogin: isLogin,
      searchYelp: searchYelp,
      getAllEnterprises: getAllEnterprises,
      addEnterprise: addEnterprise,
      updateEnterprise: updateEnterprise,
      getFeatureToggles: getFeatureToggles,
      updateFeatureToggles: updateFeatureToggles,
      scanPromotion: scanPromotion,
      getEnterprisePromotions: getEnterprisePromotions,
      updatePromotion: updatePromotion,
      getEnterpriseRedemptions: getEnterpriseRedemptions,
      updateRedemption: updateRedemption,
      getAppConfigAll: getAppConfigAll,
      updateConfig: updateConfig,
      deactivateUser: deactivateUser,
      addConfig: addConfig,
      sendBulkSms: sendBulkSms,
      getPromos: getPromos,
      getEnterprises: getEnterprises,
      transferPoynts: transferPoynts,
      getEnterpriseMembers: getEnterpriseMembers,
      entPhotoUpload: entPhotoUpload,
      getMemberDetails: getMemberDetails,
      transferEntPoynts: transferEntPoynts,
      sendInviteReport: sendInviteReport,
      getPromoRankings: getPromoRankings,
      getEnterpriseRankings: getEnterpriseRankings,
      createPromoRank: createPromoRank,
      updatePromoRank: updatePromoRank,
      createEnterpriseRank: createEnterpriseRank,
      updateEnterpriseRank: updateEnterpriseRank,
      updatePromoPriority: updatePromoPriority,
      inactivateRank: inactivateRank,
      getStickies: getStickies,
      getReferralStatuses: getReferralStatuses,
      resetMembersToFTUE: resetMembersToFTUE,
      resetCliques: resetCliques,
      resetMemberToSingleEnt: resetMemberToSingleEnt,
      resetTransactionLogsEnt: resetTransactionLogsEnt,
      resetMemberPoynts: resetMemberPoynts,
      getMemberPoyntsbyid: getMemberPoyntsbyid,
      transferPoyntsMemToEnt: transferPoyntsMemToEnt,
      transferPoyntsMemToEnt: transferPoyntsMemToEnt,
      getEnterpriseTags: getEnterpriseTags,
      createEnterpriseTag: createEnterpriseTag,
      removeEnterpriseTag: removeEnterpriseTag,
      sendBulkInvites: sendBulkInvites,
      sendDailyReport: sendDailyReport,
      sendDailyReportWeek: sendDailyReportWeek,
      sendOutEmail: sendOutEmail,
      getRangedReport: getRangedReport,
      sendVariableReportEmail: sendVariableReportEmail,
      getMemberTags: getMemberTags,
      createMemberTag: createMemberTag,
      removeMemberTag: removeMemberTag
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

    function getPromos(name) {
      const REQUEST_URL = '/dev-service/promotion/' + name;
      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getEnterprises(name) {
      const REQUEST_URL = '/dev-service/enterprise/' + name;
      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getPromoRankings() {
      const REQUEST_URL = '/dev-service/rank/promotion/all';
      return $http
        .get(REQUEST_URL)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getEnterpriseRankings() {
      const REQUEST_URL = '/dev-service/rank/enterprise/all';
      return $http
        .get(REQUEST_URL)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getStickies() {
      const REQUEST_URL = '/dev-service/promotion/stickies/all';
      return $http
        .get(REQUEST_URL)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updatePromoPriority(data) {
      const REQUEST_URL = '/dev-service/promotion/priority';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function createPromoRank(data) {
      const REQUEST_URL = '/dev-service/rank/promotion/create';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updatePromoRank(data) {
      const REQUEST_URL = '/dev-service/rank/promotion/update';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function createEnterpriseRank(data) {
      const REQUEST_URL = '/dev-service/rank/enterprise/create';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updateEnterpriseRank(data) {
      const REQUEST_URL = '/dev-service/rank/enterprise/update';
      return $http
        .post(REQUEST_URL, data)
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

    function addEnterprise(data) {
      const REQUEST_URL = '/command-center/enterprise/add';
      return $http
        .post(REQUEST_URL, data)
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

    function getEnterprisePromotions(data) {
      const REQUEST_URL = '/command-center/enterprise/promotions?id='+data.id;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updatePromotion(data) {
      const REQUEST_URL = '/command-center/promotion/update';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getAppConfigAll() {
      const REQUEST_URL = '/command-center/app-config/all';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updateConfig(data) {
      const REQUEST_URL = '/command-center/app-config/update';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function addConfig(data) {
      const REQUEST_URL = '/command-center/app-config/add';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getEnterpriseRedemptions(data) {
      const REQUEST_URL = '/command-center/enterprise/redemptions?id='+data.id;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updateRedemption(data) {
      const REQUEST_URL = '/command-center/redemption/update';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    } 

    function sendBulkSms(data) {
      const REQUEST_URL = '/command-center/send-bulk-sms';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    } 

    function deactivateUser(data) {
      const REQUEST_URL = '/command-center/member/deactivate';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function transferPoynts(data) {
      const REQUEST_URL = '/command-center/transfer';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function transferPoyntsMemToEnt(data) {
      const REQUEST_URL = '/command-center/transferPoyntsMemToEnt';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function getEnterpriseMembers(data) {
      const REQUEST_URL = '/command-center/enterprise/members?eid=' + data;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }
    
    function inviteNew(data) {
      const REQUEST_URL = '/command-center/invite/phone' + data;

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function entPhotoUpload(data) {
      const REQUEST_URL = '/command-center/enterprise/photo-upload';
   
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMemberDetails(data) {
      const REQUEST_URL = '/command-center/member/detail/'+data;
   
      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function transferEntPoynts(data) {
      const REQUEST_URL = '/command-center/ent-transfer';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function sendInviteReport(data) {
      const REQUEST_URL = '/command-center/sendreport';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function getReferralStatuses(data) {
      const REQUEST_URL = '/command-center/getreferralstatuses?email=' + data;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function resetMembersToFTUE(data) {
      const REQUEST_URL = '/member-service/resetMembersToFTUE';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function resetCliques(data) {
      const REQUEST_URL = '/member-service/resetCliques';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function resetMemberToSingleEnt(data) {
      const REQUEST_URL = '/member-service/resetMemberToSingleEnt';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function resetTransactionLogsEnt(data) {
      const REQUEST_URL = '/member-service/resetTransactionLogsEnt';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function resetMemberPoynts(data) {
      const REQUEST_URL = '/member-service/resetMemberPoynts';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMemberPoyntsbyid(data) {
      const REQUEST_URL = '/member-service/getMemberPoyntsbyid';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
        return response.data;
        }, function error() {
        return $q.reject();
        });
    }

    function getEnterpriseTags(data) {
      const REQUEST_URL = '/tag-service/getEnterpriseTags?ent_id=' + data.ent_id;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function createEnterpriseTag(data) {
      const REQUEST_URL = '/tag-service/createEnterpriseTag';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
        return response.data;
        }, function error() {
        return $q.reject();
        });
    };

    function removeEnterpriseTag(data) {
      const REQUEST_URL = '/tag-service/removeEnterpriseTag';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
        return response.data;
        }, function error() {
        return $q.reject();
        });
    }

    function sendBulkInvites(data) {
      const REQUEST_URL = '/command-center/send-bulk-email';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    } 

    function sendDailyReport(data) {
      const REQUEST_URL = '/command-center/report/send-daily?email=' + data.email + '&entid=' + data.entid;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });      
    }

    function sendDailyReportWeek(data) {
      const REQUEST_URL = '/command-center/report/send-daily-week?email=' + data.email + '&entid=' + data.entid;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });      
    }    

    function inactivateRank(data) {
      const REQUEST_URL = '/dev-service/rank/inactivate';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function sendOutEmail(data) {
      const REQUEST_URL = '/command-center/send-out-email';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getRangedReport(data) {
      const REQUEST_URL = '/command-center/get-ranged-report';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }    

    function sendVariableReportEmail(data) {
      const REQUEST_URL = '/command-center/send-ranged-report';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }     

    function getMemberTags(data) {
      const REQUEST_URL = '/tag-service/member/get?member_id=' + data.member_id;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        }); 
    }

    function createMemberTag(data) {
      const REQUEST_URL = '/tag-service/member/create';
      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) { 
        return response.data;
        }, function error() {
        return $q.reject();
        });
    };

    function removeMemberTag(data) {
      const REQUEST_URL = '/tag-service/member/remove';
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
