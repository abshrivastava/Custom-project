(function () {
    angular.module('app.member', ['app.utils', 'app.helpers'])
        .factory('memberService', memberService);

    memberService.$inject = ['$http', '$q', '$rootScope', 'notificationService', 'cacheService', 'cpUtils', '$filter'];

    function memberService($http, $q, $rootScope, notificationService, cacheService, cpUtils, $filter) {
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
            postCheckin: postCheckin,
            createAddToHomeTag: createAddToHomeTag,
            getMemberPoyntsLog: getMemberPoyntsLog,
            getMemberGiftCardData: getMemberGiftCardData,
            saveInterests: saveInterests,
            getInterests: getInterests,
            getMemberTags: getMemberTags,
            getPurchaseDetails: getPurchaseDetails,
            getMemberPoyntsLogDetails: getMemberPoyntsLogDetails
        };

        //-------------------------------------------
        function getMember(needLatest) {
            var dfd = $q.defer();
            const REQUEST_URL = '/rewards/mem/get';
            if (!cpUtils.hasDetails(cacheService.get('MemberData')) || needLatest) {
                $http.get(REQUEST_URL).then(
                    function success(response) {
                        if (!response.data || !response.data.memberid) {
                            window.location = '/login';
                            dfd.resolve(false);
                        }
                        else {
                            response.data.dob = moment(response.data.dob).toDate();
                            cacheService.set('MemberData', response.data);
                            $rootScope.$emit('refreshMemberData');
                            dfd.resolve(response.data);
                        }
                    },
                    function error(err) {
                        dfd.reject(false);
                    });
            }
            else {
                dfd.resolve(cacheService.get('MemberData'));
            }
            return dfd.promise;
        };

        function getMemberEnterprises() {
            const REQUEST_URL = '/rewards/mem/enterprises';

            return $http.get(REQUEST_URL).then(
                function success(response) {
                    return response.data;
                },
                function error() {
                    return $q.reject();
                }
            );
        }

        function isLogin() {
            const REQUEST_URL = '/rewards/member/login';

            return $http
                .get(REQUEST_URL, data)
                .then(function success(response) {
                    if (!response.data) {
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

        function postCheckin(vm, data) {
            const REQUEST_URL = '/enterprise-service/scan_earn';

            return $http
                .post(REQUEST_URL, data)
                .then(function success(response) {
                    return refreshMemberDataOnSuccess(response.data);
                }, function error() {
                    return $q.reject();
                });
        }

        function refreshMemberDataOnSuccess(responseData) {
            return getMember(true).then(function () {
                return responseData;
            }, function error() {
                return responseData; //ToDo: Notification msg if refresh fails
            })
        }

        function getMemberPoyntsLog(data) {
            const REQUEST_URL = '/rewards/mem/getPoyntsLog';
            return $http
                .post(REQUEST_URL, data)
                .then(function success(response) {
                    return response.data;
                }, function error(err) {
                    return $q.reject(cpUtils.getErrorDetails(err));
                });
        }

        function getMemberGiftCardData(data) {
            const REQUEST_URL = '/rewards/mem/getMemberGiftCardData';
            return $http
                .post(REQUEST_URL, data)
                .then(function success(response) {
                    return response.data;
                }, function error(err) {
                    return $q.reject(cpUtils.getErrorDetails(err));
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

        function getMemberTags(data) {
            const REQUEST_URL = '/tag-service/getMemberTags?memberid=' + data.memberid;
            var dfd = $q.defer();
            $http.get(REQUEST_URL, data).then(
                function success(response) {
                    if (response && response.data) {
                        dfd.resolve(response.data);
                    }
                    else {
                        dfd.reject(false);
                    }
                },
                function error(err) {
                    dfd.reject(err);
                });
            return dfd.promise;
        };

        function getPurchaseDetails(member) {
            var dfd = $q.defer();
            getMemberGiftCardData({ 'entId': member.entid, 'memberId': member.memberid })
                .then(function (resp) {
                    dfd.resolve(resp);
                }, function (err) {
                    dfd.reject(err);
                });
            return dfd.promise;
        };

        function getMemberPoyntsLogDetails(member) {
            let dfd = $q.defer();
            getMemberPoyntsLog({
                'entId': member.entid,
                'memberId': member.memberid,
                'poyntBalance': member.reward.points
            }).then(function (response) {
                dfd.resolve(ArrangePoyntLogWithDates(response));
            }, function (err) {
                dfd.reject(err);
            });
            return dfd.promise;
        };

        function ArrangePoyntLogWithDates(transactionList) {
            var diffDateArray = [], PoyntLogWithDateArray = [];
            $filter('filter')(transactionList, function (el) {
                if (diffDateArray.indexOf(el.transaction_date) === -1) {
                    diffDateArray.push(el.transaction_date);
                    let sameDateColl = $filter('filter')(transactionList, function (item) {
                        return el.transaction_date == item.transaction_date;
                    });
                    PoyntLogWithDateArray.push({ transactionDate: el.transaction_date, transactionData: sameDateColl });
                    return true;
                } else {
                    return false;
                }
            });
            return PoyntLogWithDateArray;
        };
    }
})();
