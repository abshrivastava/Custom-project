(function () {
    angular.module('app.myProfile', [])
        .controller('myProfileController', ['$q', 'memberService', 'notificationService', 'cpUtils', 'memberDataItems',
            function ($q, memberService, notificationService, cpUtils, memberDataItems) {

                var self = this;

                var init = function () {
                    self.StateList = STATE_LIST;
                    self.features = memberDataItems.features;
                    getProfileData();
                };

                function getProfileData(needLatest) {
                    var arr = {
                        'interests': getInterests(),
                        'memberData': getMemberData(needLatest),
                    }
                    $q.all(arr);
                }

                function getInterests() {
                    var dfd = $q.defer();
                    memberService.getInterests().then(function (response) {
                        self.interests = response || {};
                        dfd.resolve(response);
                    }, function error(err) {
                        notificationService.error("Couldn't get your interests, try again");
                        dfd.reject(false);
                    });
                    return dfd.promise;
                };

                function getMemberData(needLatest) {
                    var dfd = $q.defer();
                    memberService.getMember(needLatest).then(function (response) {
                        if (response) {
                            var memberData = response;
                            memberData.dob = moment(memberData.dob).toDate();
                            self.member = memberData;
                            dfd.resolve(response);
                        }
                        else {
                            notificationService.error("Couldn't get your profile details, try again");
                            dfd.reject(false);
                        }
                    }, function error(err) {
                        notificationService.error("Couldn't get your profile details, try again");
                        dfd.reject(false);
                    });
                    return dfd.promise;
                };

                self.saveProfile = function () {
                    if (self.member && self.member.fname && self.member.lname && self.member.dob && self.member.mPhone && self.member.gender) {
                        self.member.name = self.member.fname + ' ' + self.member.lname;
                        var arr = {
                            member: memberService.saveProfile(self.member),
                            interests: memberService.saveInterests({ "interests": self.interests })
                        };
                        $q.all(arr).then(onSaveSuccess,
                            function error(err) {
                                notificationService.error("Unable to save profile. Please verify your information and try again.");
                            });
                    }
                    else {
                        notificationService.error("Please fill all the required fields.");
                    }
                };

                function onSaveSuccess(response) {
                    if (response.member && response.interests && response.member.success && response.interests.success) {
                        notificationService.success("Profile saved successfully");
                        getProfileData(true);
                    }
                    else {
                        notificationService.error("Unable to save profile. Please verify your information and try again.");
                    }
                };

                self.openHumanApi = function () {

                    memberService.getHumanApiProfile().then(function (response) {
                        var humanApiProfile = response;

                        var options = {
                            modal: 1,
                            mode: 'wellness', //or 'medical' (default if not specified)
                            clientUserId: self.member.memberid,
                            clientId: humanApiProfile.clientId, // grab it from app settings page
                            publicToken: humanApiProfile.publicToken,  // Leave blank for new users

                            finish: function (err, sessionTokenObject) {
                                $.post('/hapi/connect', sessionTokenObject, function (res) {
                                    loadMain();
                                });
                            },
                            close: function () {
                            },
                            error: function (err) {
                                errorGrowl("Error retrieving HumanAPI Page.", "Error");
                            }
                        };

                        HumanConnect.open(options);
                    });

                };

                init();
            }])
}());