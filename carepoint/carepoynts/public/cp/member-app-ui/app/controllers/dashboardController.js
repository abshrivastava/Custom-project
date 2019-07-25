(function () {
  angular.module('app.dashboard', ['app.offer', 'googleAnalytics'])
    .controller('dashboardController', ['$scope', 'offerService', '$filter', 'notificationService', 'googleAnalyticsService',
      function ($scope, offerService, $filter, notificationService, googleAnalyticsService) {

        var vm = $scope;
        vm.promo_type = PROMO_TYPE.VariablePromotion;

        function init() {
          offerService.getOffersWithPoynts().then(function (response) {
            if (response && response.length > 0) {

              //leaving these separate for readability
              vm.offers = $filter('filter')(response, function (value, index, array) {
                return (value.user_earned == false || value.promo_freq == 0);
              });
            }
          },
            function (error) {
              notificationService.error('Some error occured while getting member-offer-poynts. Please try again');
            })
        };

        init();

      }])
})();
