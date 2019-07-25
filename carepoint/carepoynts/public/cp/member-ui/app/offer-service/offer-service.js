(function () {
  angular
    .module('app.offer-service', [])
    .factory('offerService', offerService);

  offerService.$inject = ['$http', '$q'];

  function offerService($http, $q) {
    return {
      getCarepoyntOffers: getCarepoyntOffers,
      getEnterpriseOffers: getEnterpriseOffers,
      getPromoDetail: getPromoDetail,
      redeemOffer: redeemOffer,
      promoEarned: promoEarned,
      getRedeemDetail: getRedeemDetail,
      promoRating: promoRating,
      promoReferral: promoReferral,
      getOnboardUrl: getOnboardUrl,
      promoSocialRating: promoSocialRating,
      checkTwitterLoginStatus: checkTwitterLoginStatus,
      authorizeTwitter: authorizeTwitter,
      post: post,
      checkFBLoginStatus: checkFBLoginStatus,
      storeFBToken: storeFBToken,
      getAffiliateShowAgainTag: getAffiliateShowAgainTag,
      setAffiliateShowAgainTag: setAffiliateShowAgainTag,
      getPurchaseShowAgainTag: getPurchaseShowAgainTag,
      setPurchaseShowAgainTag: setPurchaseShowAgainTag
    };

    //-------------------------------------------

    function getCarepoyntOffers() {
      const REQUEST_URL = '/rewards/priority-offers';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getEnterpriseOffers(id) {
      const REQUEST_URL = '/rewards/enterprise/offers?id='+id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getOfferDetail(id) {
      const REQUEST_URL = '/rewards/offer/detail?id='+id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getRedeemDetail(id) {
      const REQUEST_URL = '/rewards/redemption/'+id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getPromoDetail(id) {
      const REQUEST_URL = '/rewards/promo/'+id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function redeemOffer(data) {
      const REQUEST_URL = '/rewards/redemption/redeem';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function promoEarned(data) {
      const REQUEST_URL = '/rewards/promo/earn';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function promoSocialRating(data) {
      const REQUEST_URL = '/rewards/promo/social-rating';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function promoRating(data) {
      const REQUEST_URL = '/rewards/promo/rating';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function promoReferral(data) {
      const REQUEST_URL = '/rewards/promo/referral';

      return $http
        .post(REQUEST_URL, data)
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

    function checkTwitterLoginStatus() {
      const REQUEST_URL = '/social-media-service/twitter/login';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function authorizeTwitter(data) {
      const REQUEST_URL = '/social-media-service/twitter/authorize';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function checkFBLoginStatus() {
      const REQUEST_URL = '/social-media-service/facebook/login';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function storeFBToken(data) {
      const REQUEST_URL = '/social-media-service/facebook/store';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function post(path, params, method = "post") {

      method = "post";

      var form = document.createElement("form");
      form.setAttribute("method", method);
      form.setAttribute("action", path);
      form.setAttribute("target", "_blank");

      for(var key in params) {
          if(params.hasOwnProperty(key)) {
              var hiddenField = document.createElement("input");
              hiddenField.setAttribute("type", "hidden");
              hiddenField.setAttribute("name", key);
              hiddenField.setAttribute("value", params[key]);

              form.appendChild(hiddenField);
           }
      }

      document.body.appendChild(form);
      form.submit();
    }

    function getAffiliateShowAgainTag() {
      const REQUEST_URL = '/tag-service/member/affiliate/warning/get';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function setAffiliateShowAgainTag() {
      const REQUEST_URL = '/tag-service/member/affiliate/warning/set';

      return $http
        .post(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getPurchaseShowAgainTag() {
      const REQUEST_URL = '/tag-service/member/purchase/warning/get';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function setPurchaseShowAgainTag() {
      const REQUEST_URL = '/tag-service/member/purchase/warning/set';

      return $http
        .post(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

  }
})();
