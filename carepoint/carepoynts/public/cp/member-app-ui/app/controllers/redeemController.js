(function () {
    angular.module('app.redeem')
        .controller('redeemController', ['redeemService', 'notificationService', 'cpUtils', '$filter', 
            function (redeemService, notificationService, cpUtils, $filter) {

                let self = this;

                function init() {
                    self.offerTabs = OFFERS_TABS;
                    self.showButton = SHOW_BUTTONS;
                    self.tileDataLimit = TILE_DATA_LIMIT;
                    self.limitCount = self.tileDataLimitGiftCard = (cpUtils.isMobile()) ? TILE_DATA_LIMIT.GiftCardMobileCount : TILE_DATA_LIMIT.GiftCardDesktopCount;
                    self.redeemData = [];
                    self.showEnterprises(self.offerTabs.All);
                    self.localCount = TILE_DATA_LIMIT.AllTabLocalandNationalCount;
                    self.isSearchPerformed = false;
                };

                self.showEnterprises = function (selectedTab) {
                    self.currentTab = selectedTab;
                    self.localCount = (selectedTab == OFFERS_TABS.All) ?
                        TILE_DATA_LIMIT.AllTabLocalandNationalCount : TILE_DATA_LIMIT.LocalTabLocalCount;
                    LoadRedeemData(selectedTab);
                };

                function LoadRedeemData(location) {
                    redeemService.getRedeemData(location).then(
                        function (response) {
                            if (response) {
                                self.redeemData = response;
                                if (response.tango_cards && response.tango_cards.length > 0) {
                                    self.redeemData.tango_cards = $filter('filter')(response.tango_cards, function (value, index, array) {
                                        return (value.carepoynt_value > 0);
                                    });
                                }
                            }
                            else {
                                notificationService.error(ERROR_CODES.Null_Response_Error);
                            }
                        }, function error(err) {
                            notificationService.error(err.error_message);
                        })
                };

                self.showMore = function () {
                    self.limitCount = (self.tileDataLimitGiftCard == self.limitCount) ? false : self.tileDataLimitGiftCard;
                };

                self.searchRedeemData = function () {
                    redeemService.searchRedeemData(self.currentTab, self.searchText).then(
                        function (response) {
                            if (response) {
                                self.redeemData = response;
                                self.isSearchPerformed = true;
                            }
                            else {
                                notificationService.error(ERROR_CODES.Null_Response_Error);
                            }
                        }, function error(err) {
                            notificationService.error(err.error_message);
                        })
                };

                self.reLoadCurrentState = function(){
                    cpUtils.goTo();
                    self.isSearchPerformed = false;
                };

                init();

            }])
})()