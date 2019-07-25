angular.module('app.offer', ['app.utils', 'app.teleTubby', 'angular-clipboard'])
    .factory('offerService', ['$http', '$q', 'notificationService', 'memberService', function ($http, $q, notificationService, memberService) {

        function getCarepoyntOffers() {
            const REQUEST_URL = '/rewards/priority-offers';

            return $http.get(REQUEST_URL).then(
                function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject(false);
                });
        };

        function getOffersWithPoynts() {
            return getCarepoyntOffers().then(
                function success(response) {
                    if (response.promotions) {
                        return setOffersModelPoynts(response.promotions);
                    }
                    else {
                        return false;
                    }
                },
                function error(err) {
                    return err;
                });
        };

        function setOffersModelPoynts(offersDataItems) {

            offersDataItems.map(function (item) {
                var poynts = 0;
                if (item.hasOwnProperty('subPromos')) {
                    item.subPromos.forEach(function (subItem) {
                        poynts += parseInt(subItem.reward_value);
                    });
                } else {
                    poynts = parseInt(item.reward_value);
                }
                item.poynts = poynts;
                return item;
            });
            return offersDataItems;
        }

        function getEnterpriseOffers(id) {
            const REQUEST_URL = '/rewards/enterprise/offers?id=' + id;

            return $http
                .get(REQUEST_URL)
                .then(function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject();
                });
        }

        function getOfferDetail(id) {
            const REQUEST_URL = '/rewards/offer/detail?id=' + id;

            return $http
                .get(REQUEST_URL)
                .then(function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject();
                });
        }

        function getRedeemDetail(id) {
            const REQUEST_URL = '/rewards/redemption/' + id;

            return $http
                .get(REQUEST_URL)
                .then(function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject();
                });
        }

        function getPromoDetail(id) {
            const REQUEST_URL = '/rewards/promo/' + id;

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
                    return onPromoSuccess(response.data);
                }, function error() {
                    return $q.reject();
                });
        }

        function promoEarned(data) {
            const REQUEST_URL = '/rewards/promo/earn';

            return $http
                .post(REQUEST_URL, data)
                .then(function success(response) {
                    return onPromoSuccess(response.data);
                }, function error() {
                    return $q.reject();
                });
        }

        function onPromoSuccess(responseData){
            return memberService.getMember(true).then(function(){
                return responseData;
            }, function error(){
                return responseData;
            })
        };

        function promoSocialRating(data) {
            const REQUEST_URL = '/rewards/promo/social-rating';

            return $http
                .post(REQUEST_URL, data)
                .then(function success(response) {
                    return onPromoSuccess(response.data);
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
                    return onPromoSuccess(response.data);
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

        function post(path, params, method) {

            method = "post";

            var form = document.createElement("form");
            form.setAttribute("method", method);
            form.setAttribute("action", path);
            form.setAttribute("target", "_blank");

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
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

        return {
            getCarepoyntOffers: getCarepoyntOffers,
            getOffersWithPoynts: getOffersWithPoynts,
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

    }])

