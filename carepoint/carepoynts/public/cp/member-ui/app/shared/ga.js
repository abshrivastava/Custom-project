/* global WalkMeAPI */
angular.module('google-analytics', []).provider('GoogleAnalytics', [
  function () {


    this.$get = [ function () {


        //The type of hit. Must be one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
        
        //set page value that gets sent when calling sendPage()
        function setPage(page) {
          ga('set', 'page', page);
        }

        //send a pageview with page value set from above
        function sendPageview() {
          ga('send', 'pageview');
        }

        //add an event of type hitType don't know what fieldobjects is. 
        //hittype/eventcategory/eventaction required. 
        function sendEvent(hitType, eventCategory, eventAction, eventLabel, eventValue) {
          ga('send', hitType, eventCategory, eventAction, eventLabel, eventValue);
        }



        var service = {
          setPage: setPage,
          sendPageview: sendPageview,
          sendEvent: sendEvent
        };
        return service;
      }];
  }]);