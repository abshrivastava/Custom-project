(function () {
    angular.module('app.enterprise')
        .controller('enterpriseController', ['$q', '$scope', '$state', '$stateParams', '$filter', 'enterpriseService', 'notificationService', 'cpUtils', 'rateReviewService',
            function ($q, $scope, $state, $stateParams, $filter, enterpriseService, notificationService, cpUtils, rateReviewService) {

                var self = this;
                var enterpriseData;
                self.showButton = SHOW_BUTTONS;
                self.stateNames = STATE_NAMES;
                self.tileDataLimit = TILE_DATA_LIMIT;
                function init() {
                    self.entepriseTabs = ENTERPRISE_TABS;
                    self.parentState = $state.$current.parent.name;
                    self.ent_id = $stateParams.entId
                    enterpriseService.getInitialData($stateParams.entId).then(function (response) {
                        if (response) {
                            enterpriseData = response
                            self.enterprise = enterpriseData.enterprise;
                            self.addressUri = enterpriseService.getAddressUri(self.enterprise);
                            self.latLong = enterpriseService.getLatLong(self.enterprise);
                            self.isEnterpriseMember = enterpriseData.isEnterpriseMember;
                            self.setCurrentView((self.parentState == STATE_NAMES.Earn) ? ENTERPRISE_TABS.Earn : ENTERPRISE_TABS.Redeem);
                            self.isEnterpriseAffiliated = enterpriseService.isEnterpriseAffiliated(self.enterprise);
                            cpUtils.resizeMap('entMap', self.latLong);//During offer refactor map component will be created hence passing id as string 
                        }
                        else {
                            notificationService.error(ERROR_CODES.Null_Response_Error);
                        }
                    }, function error(err) {
                        notificationService.error(err);
                    })
                };

                self.showMore = function () {
                    self.limitCount = (self.limitCount == TILE_DATA_LIMIT.EnterpriseScreen) ? false : TILE_DATA_LIMIT.EnterpriseScreen;
                };

                self.setCurrentView = function (selectedTab) {
                    self.currentTab = selectedTab;
                    self.limitCount = TILE_DATA_LIMIT.EnterpriseScreen;
                    self.offers = (selectedTab == ENTERPRISE_TABS.Earn) ? enterpriseService.setOffersModelPoynts(enterpriseData.promotions)
                        : enterpriseData.redemptions //ToDo: promotions poynt calculation, move to service
                };

                function filterOutEarnedOffers(dataItems) {
                    return $filter('filter')(dataItems, function (item) {
                        return (!item.user_earned || item.promo_freq == 0)
                    })
                };

                self.joynEnterprise = function () {
                    enterpriseService.joynEnterprise(self.enterprise).then(function (response) {
                        if (response.success) {
                            notificationService.success("You have joyned this enterprise successfully.");
                            self.isEnterpriseMember.status = true;
                        }
                    }, function error() {
                        notificationService.error("Some error occured: try again");
                    });
                };

                self.submitEnterpriseRating = function (reviewData) {
                    var dfd = $q.defer();
                    angular.extend(reviewData, { 'entId': self.ent_id });
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

                init();
            }])
}());