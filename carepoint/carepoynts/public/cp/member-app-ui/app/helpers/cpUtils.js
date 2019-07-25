(function () {
    angular.module('app.helpers', ['ngMap'])
        .factory('cpUtils', ['$window', '$document', '$state', '$q', '$timeout', 'NgMap',
            function ($window, $document, $state, $q, $timeout, NgMap) {

            function hasData(response) {
                return (response && response.data && response.data.length > 0);
            }

            function hasDetails(data) {
                return (data && Object.keys(data).length > 0);
            }

            function hasValue(data) {
                return (data && data.length > 0);
            }

            function toggleFlyout() {
                toggleClass(angular.element(document.querySelector("#left-sidebar")), "close-sidebar");
                toggleClass(angular.element(document.querySelector("#header")), "left-pannel");
                toggleClass(angular.element(document.querySelector("#member")), "left-pannel");
            }

            function closeFlyout() {
                if (!angular.element(document.querySelector("#left-sidebar")).hasClass('close-sidebar')) {
                    toggleFlyout();
                }
            };

            function loadScript() {
                angular.element(document.querySelector('.login-overlay')).hide();
                var window_height = $window.innerHeight;
                var headerHeight = angular.element(document.querySelector("header")).innerHeight();

                angular.element(document.querySelector('#content_wrapper')).css("padding-top", headerHeight);
                angular.element(document.querySelector('#left-sidebar')).css("height", window_height);
                angular.element(document.querySelector('#content_wrapper')).css("height", window_height);
            }

            function toggleClass(element, value) {
                (element.hasClass(value)) ? element.removeClass(value) : element.addClass(value);
            }
            
            //in goTo function if no "state" parameter is passed, it'll reload the current state.
            function goTo(state, params, isReload) {
                state ? $state.go(state, params, { reload: isReload }) : $state.reload();
            }

            function goBack() {
                $window.history.back();
            }

            function validateEmail(email) {
                if (!email) {
                    return false;
                }
                else {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                }
            }
            function validateNumber(num) {
                if (!num) {
                    return false;
                }
                else {
                    var re = /^[0-9]*$/;
                    return re.test(num);
                }
            }

            function isMobile() {
                let md = new MobileDetect(window.navigator.userAgent);
                return md.mobile() ? true : false;
            };

            function getErrorDetails(err) {
                return { error_code: err.status, error_message: err.statusText };
            };

            function parseDate(val){
               val =  val ? new Date(val.replace(/-/g,'/')) : "";
                 return (isValidDate(val) ? val : "") ;
            }
            /**
             * check whether param is valid or not
             * @param {*} d 
             */
            function isValidDate(d){
                if (Object.prototype.toString.call(d) === "[object Date]" ) {
                    return(isNaN(d.getTime()) ? false : true );
                  } else {
                    return false; // not a date
                  }
            }

             function timeOut(delayTime) {
                var dfd = $q.defer();
                $timeout(function () {
                        dfd.resolve(true);
                    }, delayTime);
                    return dfd.promise;
                };

            function resizeMap(mapId, latLong) {
                if (latLong) {
                    NgMap.getMap(mapId).then(function (map) {
                        let latLongArr = latLong.split(",");
                        let latLongObj = {'lat': parseFloat(latLongArr[0]), 'lng': parseFloat(latLongArr[1])};
                        google.maps.event.trigger(map, "resize");
                        map.markers[0].setPosition(latLongObj);
                        map.setCenter(latLongObj);
                    });
                }
            };

            return {
                hasData: hasData,
                hasDetails: hasDetails,
                hasValue: hasValue,
                loadScript: loadScript,
                toggleFlyout: toggleFlyout,
                goTo: goTo,
                goBack: goBack,
                closeFlyout: closeFlyout,
                validateEmail: validateEmail,
                validateNumber : validateNumber,
                parseDate : parseDate,
                isMobile: isMobile,
                getErrorDetails: getErrorDetails,
                timeOut: timeOut,
                resizeMap: resizeMap
            }
        }
        ])
})();

