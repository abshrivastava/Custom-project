(function () {
    angular.module('googleAnalytics', [])
        .service('googleAnalyticsService', [function () {
            this.setPage = function (page) {
                ga('set', 'page', page);
            }

            //send a pageview with page value set from above
            this.sendPageview = function () {
                ga('send', 'pageview');
            }

            //add an event of type hitType don't know what fieldobjects is. 
            //hittype/eventcategory/eventaction required. 
            this.sendEvent = function sendEvent(hitType, eventCategory, eventAction, eventLabel, eventValue) {
                ga('send', hitType, eventCategory, eventAction, eventLabel, eventValue);
            }
        }])
})();