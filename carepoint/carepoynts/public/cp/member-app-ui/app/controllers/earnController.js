(function () {
    angular.module('app.earn')
        .controller('earnController', ['earnService', 'notificationService', 'cacheService', 'cpUtils',
            function (earnService, notificationService, cacheService, cpUtils) {

                var self = this;

                function init() {
                    self.offerTabs = OFFERS_TABS;
                    self.tileDataLimit = TILE_DATA_LIMIT;
                    self.getEarnOffers(OFFERS_TABS.All);
                    self.localandNationalCount = TILE_DATA_LIMIT.AllTabLocalandNationalCount;
                    self.isSearchPerformed = false;
                };

                self.getEarnOffers = function (selectedTab) {
                    self.currentTab = selectedTab;
                    self.localandNationalCount = (selectedTab == OFFERS_TABS.All) ? 
                    TILE_DATA_LIMIT.AllTabLocalandNationalCount : TILE_DATA_LIMIT.LocalTabLocalCount
                    self.searchText = null;

                    earnService.getEarnOffers(self.currentTab).then(function (response) {
                        if (response) {
                            self.earnOffers = response;
                        }
                        else {
                            notificationService.error(ERROR_CODES.Null_Response_Error);
                        }
                    }, function error(err) {
                        notificationService.error(err);
                    });
                };

                self.searchEarnOffers = function () {
                    earnService.searchEarnOffers(self.searchText, self.currentTab).then(function (response) {
                        if (response) {
                            self.earnOffers = response;
                            self.isSearchPerformed = true;
                        }
                        else {
                            notificationService.error(ERROR_CODES.Null_Response_Error);
                        }
                    }, function error(err) {
                        notificationService.error(err);
                    });
                };

                self.reLoadCurrentState = function(){
                    cpUtils.goTo();
                    self.isSearchPerformed = false;
                };

                init();
            }])
}());