(function () {
    function cpEnterpriseTileController($state, cpUtils, enterpriseService) {
        var self = this;

        self.showButton = SHOW_BUTTONS;
        var transitionToState = $state.current.name + '.enterprise';

        self.showMore = function () {
            self.limitCount = (self.limitCount == self.defaultLimitCount) ? false : self.defaultLimitCount;
        };

        self.$onChanges = function (changes) {
            self.limitCount = changes.defaultLimitCount.currentValue;
        };

        self.onTileButtonClick = function (entId, num_of_offers, isAffiliated) {
            if (isAffiliated && (num_of_offers == 1)) {
                enterpriseService.getEnterpriseOffers(entId).then(function (response) {
                    if (response) {
                        cpUtils.goTo('member.earn.affiliatedOffer', { 'type': ENTERPRISE_TABS.Earn, 'id': response[0].id });
                    }
                })
            }
            else {
                cpUtils.goTo(transitionToState, { 'entId': entId });
            }
        };

    };
    angular.module("app.components").component('cpEnterpriseTile', {
        bindings: {
            tileId: '@',
            tileTitle: '@',
            offerList: '=',
            defaultLimitCount: '@',
            buttonText: '@'
        },
        templateUrl: 'views/shared/enterprise-tile/index.html',
        controller: ['$state', 'cpUtils', 'enterpriseService', cpEnterpriseTileController],
        controllerAs: 'ctrl'
    })
}());
