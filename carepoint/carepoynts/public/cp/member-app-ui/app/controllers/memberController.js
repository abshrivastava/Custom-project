(function () {
    angular.module('app.member')
        .controller('memberController', ['$q', '$scope', '$rootScope', 'cpUtils', 'memberService', 'notificationService', 
        'memberDataItems', 'teleTubbyService', 'cacheService', 'rateReviewService',
            function ($q, $scope, $rootScope, cpUtils, memberService, notificationService, memberDataItems, teleTubbyService, cacheService, rateReviewService) {
                var self = this;
                var vm = $scope;
                vm.features = memberDataItems.features ? memberDataItems.features : [];
                vm.member = cacheService.get('MemberData');
                vm.memberTags = memberDataItems.memberTags ? memberDataItems.memberTags : [];
                vm.stateNames = STATE_NAMES;
                vm.CarepoyntRewardEntId = Carepynt_Rewards_EntId;
                self.carepoyntEntName = ENTERPRISE_NAMES.CarepoyntRewards;

                function init() {
                    ga('set', 'userId', vm.member.memberid);

                    vm.showAddToHomescreen = false;
                    if (vm.memberTags) {
                        setAddHomeScreen();
                    }
                };

                vm.loadScript = function () {
                    cpUtils.loadScript();
                }

                vm.toggleFlyout = function () {
                    cpUtils.toggleFlyout();
                }

                vm.closeFlyout = function () {
                    cpUtils.closeFlyout();
                };

                vm.showAdd = function () {
                    teleTubbyService.showAdd();
                }

                vm.goBack = function () {
                    cpUtils.goBack();
                }

                vm.goTo = function (state, params) {
                    cpUtils.goTo(state, params);
                }

                function setAddHomeScreen() {
                    let md = new MobileDetect(window.navigator.userAgent);

                    let addToHome = true;
                    for (let i = 0; i < vm.memberTags.length; i++) {
                        if (vm.memberTags[i].tag_name == 'addToHomescreen') {
                            addToHome = false;
                            break;
                        }
                    }
                    if (md.mobile()) {
                        if (vm.features['dark.member.add-to-homescreen-button']) {
                            vm.showAddToHomescreen = true;
                        }

                        if (vm.features['dark.member.add-to-homescreen-notification'] && addToHome) {
                            teleTubbyService.showAdd();
                            teleTubbyService.createA2HTag(vm.member.memberid)
                                .then(function (response) {
                                    if (response) {
                                        // notificationService.success("Tag added to Home screen successfully.");
                                    }
                                    else {
                                        notificationService.error("Error while adding tag to Home screen. Please try again.");
                                    }
                                }, function (error) {
                                    notificationService.error("Error while adding tag to Home screen. Please try again.");
                                })
                        }
                    }
                };


                init();

                $rootScope.$on('refreshMemberData', onRefreshMemberData);

                function onRefreshMemberData() {
                    var poyntDiff = cacheService.get('MemberData').reward.points - vm.member.reward.points;
                    if (poyntDiff > 0) {
                        notificationService.success("You have earned " + poyntDiff + " poynts.");
                    }
                    vm.member = angular.copy(cacheService.get('MemberData'));
                };

                self.submitCarepoyntRewardsRating = function (reviewData) {
                    var dfd = $q.defer();
                    angular.extend(reviewData, { 'entId': Carepynt_Rewards_EntId });
                    rateReviewService.submitReview(reviewData).then(function (response) {
                        if (response && response.success) {
                            notificationService.success("Review submitted successfully.");
                            $scope.$broadcast('submitRating');
                            dfd.resolve(true);
                        } else {
                            notificationService.error("Error while submitting review. Please try again.");
                            dfd.reject(false);
                        }
                    }, function (err) {
                        dfd.reject(false);
                        notificationService.error(err.error_message);
                    });
                    return dfd.promise;
                };

                //TODO verify below
                // $scope.$on('$destroy', function () {
                //     $scope.refreshMemberData = true;
                // });
            }])
})();