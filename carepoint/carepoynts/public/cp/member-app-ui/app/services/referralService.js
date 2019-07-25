(function () {
    angular.module("app.referral", ['angular-clipboard'])
        .service('referralService', ['$q', '$http', 'offerService', 'cpUtils', function ($q, $http, offerService, cpUtils) {

            var referFriend = function (data) {
                const REQUEST_URL = '/rewards/mem/referFriend';

                return $http
                    .post(REQUEST_URL, data)
                    .then(function success(response) {
                        return response.data;
                    }, function error() {
                        return $q.reject();
                    });
            };

            var getReferralLink = function () {
                const REQUEST_URL = '/rewards/referral/getReferralLink';

                return $http
                    .get(REQUEST_URL).then(
                    function success(response) {
                        return response.data;
                    }, function error() {
                        return $q.reject();
                    });
            };

            var getCurrentReferrals = function () {
                const REQUEST_URL = '/rewards/promo/fetchinvite';
                return $http
                    .get(REQUEST_URL)
                    .then(function success(response) {
                        return response.data;
                    }, function error() {
                        return $q.reject();
                    });
            };

            var sendReferral = function (stateName, id, referral) {
                if (stateName == STATE_NAMES.ReferralOffer) {
                    return referralOfferFriendsFamily(id, referral);
                }
                else if (stateName == STATE_NAMES.CurrentReferral) {
                    return sendInvite(referral);
                }
                else {          //if (stateName == STATE_NAMES.ReferFriend) or some other state
                    return referFriends(referral);
                }
            };

            var sendInvite = function (referral) {
                const REQUEST_URL = '/rewards/sendReminderInvite';
                var dfd = $q.defer();
                $http
                    .post(REQUEST_URL, { 'email': referral.email, 'inviteid': referral.inviteid })
                    .then(function success(response) {
                        dfd.resolve(referSuccess(response.data));
                    }, function error(err) {
                        dfd.reject(cpUtils.getErrorDetails(err));
                    });
                return dfd.promise;
            };

            var referralOfferFriendsFamily = function (id, referral) {
                var dfd = $q.defer();
                offerService.getPromoDetail(id).then(function (promoResponse) {
                    promoResponse.referral = referral;
                    offerService.promoReferral(promoResponse).then(function (response) {
                        dfd.resolve(referSuccess(response));
                    }, function error(err) {
                        dfd.reject(cpUtils.getErrorDetails(err));
                    });
                });
                return dfd.promise;
            };

            var referFriends = function (referral) {
                var dfd = $q.defer();
                referFriend(referral).then(function (response) {
                    dfd.resolve(referSuccess(response));
                }, function error(err) {
                    dfd.reject("Some error occured: couldn't sent your invitation.");
                });
                return dfd.promise;
            };

            var referSuccess = function (response) {
                if (response.msg == 'Already a member.') {
                    return { 'type': 'warning', 'msg': 'That person is already a member.' };
                }
                else if (response.msg == 'Already invited.') {
                    return { 'type': 'warning', 'msg': 'That person has already been invited.' };
                }
                else if (response.success) {
                    return { 'type': 'success', 'msg': 'Invitation has been sent successfully.' };
                }
                else {
                    return { 'type': 'error', 'msg': "Some error occured: couldn't sent your invitation." };
                }
            };

            return {
                referFriend: referFriend,
                getReferralLink: getReferralLink,
                getCurrentReferrals: getCurrentReferrals,
                sendReferral: sendReferral
            };

        }])
})();