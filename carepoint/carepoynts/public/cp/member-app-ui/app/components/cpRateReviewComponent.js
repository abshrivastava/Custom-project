(function () {
    function rateReviewController(notificationService) {
        var self = this;
        function initReviewModel() {
            self.review = {
                'rating': null,
                'comment': null
            }
            self.overStar = null;
        };

        self.submitRating = function () {
            if (self.review.rating > 0) {
                self.onSubmitCallback({ reviewData: self.review }).then(function (response) {
                    if (response) { // this response expects a boolean value
                        toggleModal();
                    }
                }, function (err) {
                    //do nothing, don't close the modal pop up.
                });
            }
            else {
                notificationService.error("Please select rating in order to submit review.");
            }
        };

        self.cancelModal = function () {
            toggleModal();
        };

        function toggleModal() {
            initReviewModel();
            angular.element(document.querySelector('#' + self.reviewModalId)).modal('toggle');
        };

        self.hoveringOver = function (value) {
            self.overStar = value;
        };

        initReviewModel();
    }

    var app = angular.module("app.components");
    app.component('cpRateReview', {
        bindings: {
            reviewModalId: '@',
            onSubmitCallback: '&',
            title: '@'
        },
        templateUrl: "views/rate-review/index.html",
        controller: ['notificationService', rateReviewController],
        controllerAs: 'ctrl'
    })

}());