(function () {
    function commentRatingController($scope, $rootScope, $state, rateReviewService, notificationService, cpUtils) {
        var self = this;

        this.$onInit = function () {
            getLatestReviews();
        };
        self.showButton = SHOW_BUTTONS;
        
        self.showMore = function () {
            self.limitCount = (self.limitCount == self.defaultLimitCount) ? false : self.defaultLimitCount;
        };

        self.$onChanges = function (changes) {
            self.limitCount = changes.defaultLimitCount.currentValue;
        };

        function getLatestReviews() {
            rateReviewService.getLatestReviewsByEntId(self.entId).then(function (response) {
                self.latestReviews = response.result || [];
            }, function (err) {
                notificationService.error(err.error_message);
            });
        };

        self.parseDate = function (date) {
            return cpUtils.parseDate(date);
        };

        var onSubmitRating = function (event, args) {
            if ($state.current.name == STATE_NAMES.EarnEnterprise) {
                getLatestReviews();
            }
        };

        var submitRatingListener = $scope.$on('submitRating', onSubmitRating);

        $scope.$on('$destroy', function () {
            submitRatingListener();
        });
    }

    var app = angular.module("app.components");
    app.component('cpCommentRating', {
        bindings: {
            entId: '@',
            defaultLimitCount: '@',            
        },
        templateUrl: 'views/component-views/comment-rating/index.html',
        controller: ['$scope', '$rootScope', '$state', 'rateReviewService', 'notificationService', 'cpUtils', commentRatingController],
        controllerAs: 'ctrl'
    })

}());