(function () {
    angular.module('app.teleTubby', ['app.member', 'app.utils'])
        .service('teleTubbyService', ['memberService', '$q', 'notificationService',
            function (memberService, $q, notificationService) {

                this.showAdd = function () {
                    var md = new MobileDetect(window.navigator.userAgent);
                    if (((md.os().indexOf("iOS") != -1) && (md.userAgent().indexOf("Safari") != -1)) ||
                        ((md.os().indexOf("AndroidOS") != -1) && (md.userAgent().indexOf("Chrome") != -1))) {
                        addToHomescreen().show(true);
                    }
                };

                this.createA2HTag = function (memberid) {
                    var dfd = $q.defer();
                    var tagData = { "member_id": memberid, "tag_name": "addToHomescreen", "is_deleted": 0, "is_active": 1, "type": "" };
                    memberService.createAddToHomeTag(tagData)
                        .then(function (response) {
                            if (response.success) {
                                dfd.resolve(response.success);
                            }
                            else {
                                dfd.resolve(false);
                            }
                        }, function (error) {
                            dfd.reject(error);
                        });
                    return dfd.promise;
                };

                //========== checkin
                var dashboardScope;

                this.checkin = function checkin(vm) {
                    var dfd = $q.defer();
                    //get coordinates
                    notificationService.info("To Increase Accuracy : </br> 1) Allow location services. </br> 2) Turn on Wi-fi/Bluetooth.", 'Warning');

                    dashboardScope = vm;
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(function (position) {
                            geoSuccess(position, dfd)
                        }, geoError, {
                                enableHighAccuracy: true,
                                timeout: 5000,
                                maximumAge: 0
                            });
                    } else {
                        notificationService.warning("Geolocation service for this browser is not supported, please update your browser in order to earn via Check-In.");
                    }
                    return dfd.promise;
                }


                function geoSuccess(position, qDefer) {
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
                    var qrdata = "";
                    //pass into server to validate and award poynts if valid location and code
                    return memberService.postCheckin(dashboardScope, { lat: lat, long: long, qr: qrdata }).then(
                        function (response) {
                            qDefer.resolve(response);
                        },
                        function (error) {
                            qDefer.reject(false);
                        })
                }


                function geoError(error) {
                    console.info(error);
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            notificationService.error("User denied the request for Geolocation. Please turn on Locations Services for the browser.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            notificationService.error("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            notificationService.error("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            notificationService.error("An unknown error occurred.");
                            break;
                    }

                }
            }])
})();