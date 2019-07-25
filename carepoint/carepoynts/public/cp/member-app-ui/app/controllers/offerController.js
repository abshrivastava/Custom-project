(function () {
    angular.module('app.offer')

        .controller('offerController', ['$scope', '$q', '$filter', '$sce', '$state', '$stateParams', '$window',
            'memberService', 'offerService', 'notificationService', 'teleTubbyService', 'ezfb', 'enterpriseService', 'cpUtils',
            function ($scope, $q, $filter, $sce, $state, $stateParams, $window, memberService, offerService,
                notificationService, teleTubbyService, ezfb, enterpriseService, cpUtils) {
                const vm = $scope;
                vm.goTo = goTo;
                vm.goBack = goBack;
                vm.isEarn = isEarn;
                vm.earnClick = earnClick;
                vm.redeemClick = redeemClick;
                vm.showVideo = false;
                vm.showCompanyDetail = true;
                vm.videoEnded = videoEnded;
                vm.submitRating = submitRating;
                vm.socialShare = socialShare;
                vm.closeReview = closeReview;
                vm.closeReferral = closeReferral;
                $window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
                vm.openHumanApi = openHumanApi;
                vm.goToOnboard = goToOnboard;
                vm.showOffer = true;
                vm.showSocial = false;
                vm.authorizeFacebook = authorizeFacebook;
                vm.authorizeTwitter = authorizeTwitter;
                vm.submitSocialRating = submitSocialRating;
                vm.getTotalPoynts = getTotalPoynts;
                vm.handleTwitterResponse = handleTwitterResponse;
                vm.processDailyTasks = processDailyTasks;
                vm.cancelModal = cancelModal;
                // vm.isCheckin = isCheckin;
                vm.cancelReview = cancelReview;
                vm.delayRender = false;

                $scope.needEarnPopUp = false;
                $scope.needReedemPopUp = false;
                $scope.dailytaskPopup = true;
                //this is for special use for checkin and earn TGMD
                $scope.getCheckin = getCheckin;

                const CP_ACTION_CONST = {
                    WATCH_VIDEO: 'WATCH_VIDEO',
                    RATING: 'RATING',
                    IN_APP_ACTION: 'IN_APP_ACTION',
                    STAFF: 'STAFF',
                    DONATE: 'DONATE'
                };

                vm.cp_action = {
                    WATCH_VIDEO: false,
                    RATING: false,
                    IN_APP_ACTION: false,
                    STAFF: false
                };


                init();

                // ******************************

                function init() {
                    window.socialShare = vm.socialShare;
                    vm.loading = true;
                    vm.offerId = $stateParams.id;
                    vm.type = $stateParams.type;  // earn or redeem
                    vm.userEarned = false;
                    vm.showCompanyDetail = true;
                    vm.rating = 0;
                    vm.redeemSuccessful = false;
                    vm.showReviewScreen = false;
                    vm.showReferralScreen = false;
                    vm.showFacebookCheck = false;
                    vm.showFacebookAuth = false;
                    vm.showTwitterCheck = false;
                    vm.showTwitterAuth = false;
                    vm.isTypeSocialReview = false;
                    vm.humanApiProfile = true;
                    vm.facebookMessage = "";
                    vm.showAddToHomescreen = false;
                    vm.showCheckInButton = false;
                    vm.showVariable = false;
                    $scope.preferenceCheckbox = null;
                    $scope.purchasePreferenceCheckbox = null;


                    var q = {
                        member: memberService.getMember(),
                        purchaseShowInfo: offerService.getPurchaseShowAgainTag()
                    };
                    if (isEarn()) {
                        q.offer = offerService.getPromoDetail(vm.offerId);
                    }
                    else {
                        q.offer = offerService.getRedeemDetail(vm.offerId);
                    }

                    $q.all(q)
                        .then(function (response) {
                            vm.member = response.member;
                            vm.offer = response.offer;
                            vm.offer.answer = "";

                            if (response && response.purchaseShowInfo) {
                                vm.showModalPurchase = response.purchaseShowInfo.show;
                            }
                            else {
                                notificationService.error("Error while fetching purchase warning modal user preference. Please try again.");
                            }
                            vm.poynts = getTotalPoynts();
                            if (isVariable()) {
                                vm.showVariable = true;
                            }

                            if (vm.offer.promo_type == 'review_social') {
                                vm.socialChecks = {
                                    facebook: true,
                                    twitter: true
                                }
                            } else {
                                vm.socialChecks = {
                                    facebook: false,
                                    twitter: false
                                }
                            }

                            if (!isEarn()) {
                                vm.offer.isRedeemable = false;
                                // if((vm.offer.pos_code) && (Date.parse(new Date()) <= Date.parse(new Date(vm.offer.enddate)))){
                                vm.offer.isRedeemable = hasEnoughtPoynts();
                                // }
                                // if(vm.offer.action) {
                                //   if(vm.offer.action.isRedeemable) {
                                //     vm.offer.isRedeemable = vm.offer.action.isRedeemable;
                                //   }
                                // }
                                vm.enoughPoynts = hasEnoughtPoynts();

                                if (vm.offer.promo_type == 'review_social') {
                                    vm.review = {
                                        rating: 5
                                    };
                                    vm.showRating = true;
                                    vm.showCompanyDetail = true;
                                    vm.showEarnButton = true;
                                    vm.isTypeSocialReview = true;
                                }
                            }

                            var md = new MobileDetect(window.navigator.userAgent);
                            if (vm.features['dark.member.add-to-homescreen-button'] && md.mobile()) {
                                vm.showAddToHomescreen = true;
                            }

                            // if(!vm.offer.enterprise.profile_photo) {
                            //   vm.offer.enterprise.profile_photo = '/cp/img/cp/carepoynts-bg-banner.jpg';
                            // }

                            setAction();
                            vm.userEarned = vm.offer.user_earned;
                            vm.isAffiliate = isAffiliate();

                            // if(vm.cp_action.WATCH_VIDEO) {
                            //   vm.showVideo = true;
                            //   vm.showCompanyDetail = false;
                            // }
                            // if(vm.cp_action.RATING) {
                            //   vm.showRating = true;
                            //   vm.showCompanyDetail = false;
                            // }
                            // // console.log(vm.cp_action.DONATE);
                            if (vm.cp_action.DONATE) {
                                vm.showRating = false;
                                vm.showCompanyDetail = false;
                                vm.offer.isRedeemable = true;
                                vm.offer.donate = true;
                            }

                            if (vm.offer.promo_type == 'watch_video' || vm.cp_action.WATCH_VIDEO) {
                                vm.showVideo = true;
                                vm.showEarnButton = false;
                                vm.showCompanyDetail = false;

                                // white list the url
                                if (vm.offer.action.url.indexOf('enablejsapi') < 0) {
                                    vm.offer.action.url = vm.offer.action.url + '?enablejsapi=1&rel=0&showinfo=0&disablekb=1&fs=1&controls=0';
                                }
                                vm.offer.action.url = $sce.trustAsResourceUrl(vm.offer.action.url);
                                initYoutubeApi();
                            }

                            if (vm.offer.promo_type == 'review_goal') {
                                vm.review = {};
                                vm.showRating = true;
                                vm.showCompanyDetail = true;
                                vm.showEarnButton = true;
                                vm.isTypeReview = true;
                            }

                            if (vm.offer.promo_type == 'review_social') {
                                vm.review = {};
                                vm.showRating = true;
                                vm.showSocial = true;
                                vm.showCompanyDetail = true;
                                vm.showEarnButton = true;
                                vm.isTypeSocialReview = true;
                            }

                            if (vm.offer.promo_type == 'referral_member') {
                                vm.referral = {};
                                vm.isTypeReferral = true;
                                vm.showCompanyDetail = true;
                                vm.showEarnButton = true;

                            }

                            if (vm.offer.promo_type == 'REPUTATION_fb') {
                                vm.showFacebook = true;
                                vm.showCompanyDetail = true;
                                vm.showEarnButton = false;

                                vm.offer.enterprise.profile_rating_fb = vm.offer.enterprise.profile_rating_fb || 'https://www.facebook.com/carepoynt.connect';

                            }

                            if (vm.offer.promo_type == 'daily_reward') {
                                vm.showCompanyDetail = true;
                                vm.showEarnButton = true;

                            }

                            if (vm.offer.promo_type == 'daily_task') {
                                vm.showCompanyDetail = true;
                                vm.showEarnButton = true;

                            }

                            if (vm.offer.promo_type == 'complete_profile' && vm.offer.user_earned == false) {
                                vm.showEarnButton = true;
                                vm.offer.action.url = 'member.myProfile';
                            }

                            if (vm.offer.activity == 'profile_complete' && vm.offer.user_earned == false) {
                                getOnboardUrl();
                            }

                            if (vm.offer.promo_type == 'refer_business' && vm.offer.user_earned == false) {
                                vm.showEarnButton = true;
                                vm.offer.action.url = 'member.referBusiness';
                            }

                            if (isAffiliate()) {
                                vm.showRating = false;
                                vm.showCompanyDetail = true;
                                vm.showEarnButton = true;
                                vm.isTypeReview = false;
                                vm.offer.enterprise.profile_photo = false;
                                offerService.getAffiliateShowAgainTag()
                                    .then(function (response) {
                                        vm.showModal = response.show;
                                    }, function (error) {
                                        notificationService.error("Error while displaying modal confirmation at service. Please try again.");
                                    });
                            }

                            if (isCheckin()) {
                                vm.showCheckInButton = true;
                            }

                            if (vm.features['dark.member.steps-promo']) {
                                if (isTypeStep()) {
                                    getHumanApiProfile();

                                    memberService.getMemberStepsToday()
                                        .then(function (response) {
                                            vm.steps = response.steps;
                                        });

                                    // this is straight cheating, grab the first number in the description string
                                    var r = /\d+/;
                                    vm.stepThreshold = parseInt(vm.offer.description.replace(/\,/g, '').match(r));

                                    vm.isTypeStep = true;
                                    vm.showCompanyDetail = false;
                                    vm.showEarnButton = true;

                                }
                            }

                            vm.enterprise = response.offer.enterprise;
                            vm.addressUri = enterpriseService.getAddressUri(vm.enterprise);
                            $scope.latLong = enterpriseService.getLatLong(vm.enterprise);
                            cpUtils.resizeMap('offerMap', $scope.latLong);
                            vm.loading = false;

                            // if facebook begin
                            if (vm.showFacebook == true) {

                                var delay = (function () {
                                    var timer = 0;
                                    return function (callback, ms) {
                                        clearTimeout(timer);
                                        timer = setTimeout(callback, ms);
                                    };
                                })();

                                delay(function () {

                                    window.fbAsyncInit = function () {

                                        var page_like_or_unlike_callback = function (url, html_element) {
                                            console.log("page_like_or_unlike_callback");
                                            console.log(url);

                                            socialShare();

                                        }

                                        FB.Event.subscribe('edge.create', page_like_or_unlike_callback);
                                        FB.Event.subscribe('edge.remove', page_like_or_unlike_callback);

                                    };
                                    (function (d, s, id) {
                                        var js, fjs = d.getElementsByTagName(s)[0];
                                        if (d.getElementById(id)) return;
                                        js = d.createElement(s);
                                        js.id = id;
                                        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
                                        fjs.parentNode.insertBefore(js, fjs);
                                    }(document, 'script', 'facebook-jssdk'));

                                }, 1);
                            }  // if facebook end


                        });

                    // NgMap.getMap().then(function (map) {
                    //     map.setOptions({
                    //         gestureHandling: 'none',
                    //         scrollwheel: false,
                    //         draggable: false,
                    //         disableDefaultUI: true
                    //     });
                    //     console.log(map.getCenter());
                    //     console.log('markers', map.markers);
                    //     console.log('shapes', map.shapes);
                    // });

                }

                function getCheckin() {
                    teleTubbyService.checkin(vm).then(function (response) {
                        if (response && response.success) {
                            notificationService.success("check in successful.");
                        }
                        else {
                            notificationService.error(response.msg);
                        }
                    }, function error() {
                        notificationService.error("check in was not processed properly. Try again");
                    });
                }

                function isTypeStep() {
                    if (vm.offer.title.toLowerCase().indexOf('step') > -1) {
                        vm.isTypeStep = true;
                    }
                    return vm.isTypeStep;
                }

                function hasEnoughtPoynts() {
                    return (vm.member.reward.points >= vm.offer.redem_value) || (vm.member.reward.points >= vm.offer.reward_value);
                }

                function goTo(state, params) {
                    $state.go(state, params);
                }

                function goBack() {
                    $window.history.back();
                }

                function isEarn() {
                    return vm.type === 'earn';
                }

                function cancelModal() 
                {
                    toggleModal();
                };

                function toggleModal() {
                    angular.element(document.querySelector('#dailyTaskModal')).modal('toggle');
                };

                function earnClick() {



                    if (vm.cp_action.WATCH_VIDEO) {
                        vm.showVideo = true;
                        vm.showCompanyDetail = false;

                    }
                    if (vm.cp_action.RATING) {

                        // showRatingModal();
                        // vm.showRating = true;
                        // vm.showCompanyDetail = false;


                    }
                    if (vm.cp_action.IN_APP_ACTION) {
                        goTo(vm.offer.action.url);
                    }


                    if (vm.offer.promo_type == 'review_goal') {
                        vm.showOffer = false;
                        vm.showReviewScreen = true;
                        // showRatingModal();
                    }

                    if (vm.offer.promo_type == 'review_social') {
                        vm.showOffer = false;
                        vm.showReviewScreen = true;
                        vm.showSocial = true;

                        // Facebook Section
                        offerService.checkFBLoginStatus()
                            .then(function (response) {
                                if (response.success) {
                                    vm.showFacebookCheck = true;
                                    vm.showFacebookAuth = false;
                                    vm.socialChecks.Facebook = true;
                                }
                                else {
                                    vm.showFacebookAuth = true;
                                    vm.showFacebookCheck = false;
                                    vm.socialChecks.Facebook = false;
                                }
                            });

                        // Twitter Section
                        offerService.checkTwitterLoginStatus()
                            .then(function (response) {
                                if (response.success) {
                                    vm.showTwitterCheck = true;
                                    vm.showTwitterAuth = false;
                                    vm.socialChecks.Twitter = true;
                                }
                                else {
                                    vm.showTwitterAuth = true;
                                    vm.showTwitterCheck = false;
                                    vm.socialChecks.Twitter = false;
                                }
                                vm.showBusy = false;
                            });
                    }

                    if (vm.offer.promo_type == 'referral_member') {
                        goTo('member.referralOffer', { id: $stateParams.id });
                    }

                    if (vm.offer.promo_type == 'complete_profile') {
                        if (vm.offer.action.url != null) {
                            goTo(vm.offer.action.url);
                        }
                    }

                    if (vm.offer.promo_type == 'refer_business') {
                        if (vm.offer.action.url != null) {
                            goTo(vm.offer.action.url);
                        }
                    }

                    if (vm.offer.promo_type == 'daily_reward') {
                        processDailyReward();
                    }

                    if (vm.offer.promo_type == 'daily_task') {
                        angular.element(document.querySelector('#dailyTaskModal')).modal('toggle');
                        $scope.dailytaskPopup = true;  
                    }

                    if (vm.isTypeStep) {
                        if (!vm.userEarned) {
                            offerService.promoEarned(vm.offer)
                                .then(function (response) {
                                    if (response.success) {
                                        vm.member.reward.points = response.balanceReceiver;
                                        vm.enoughPoynts = hasEnoughtPoynts();
                                        vm.userEarned = true;
                                    }
                                });
                        }
                    }

                    if (isAffiliate()) {
                        if (!vm.showModal) {
                            $window.open(vm.offer.action.url, '_affiliate_' + vm.offer.id);
                        }
                        else {
                            $scope.needEarnPopUp = true;
                        }
                    }

                    if (isCheckin()) {
                        canEarn();
                        if (!vm.userEarned) {
                            getCheckin();
                        }
                    }
                }

                $scope.saveEarnPopupPreference = function () {
                    if ($scope.preferenceCheckbox) {
                        offerService.setAffiliateShowAgainTag().then(function (response) {
                            if (response && response.success) {
                                vm.showModal = false;
                                window.open(vm.offer.action.url, '_affiliate_' + vm.offer.id)
                            }
                            else {
                                notificationService.error("Unable to update user preference. Please try again.");
                            }
                        }, function (error) {
                            notificationService.error("Unable to update user preference at service. Please try again.");
                        })
                    }
                    else {
                        window.open(vm.offer.action.url, '_affiliate_' + vm.offer.id)
                    }
                };

                function processDailyReward() {
                    vm.showBusy = true;

                    if (!vm.userEarned) {
                        offerService.promoEarned(vm.offer)
                            .then(function (response) {
                                if (response.success) {
                                    vm.member.reward.points = response.balanceReceiver;
                                    vm.enoughPoynts = hasEnoughtPoynts();
                                    vm.userEarned = true;
                                    notificationService.success("Congratulations! Check back in tomorrow for more chances to earn poynts.");
                                }
                                else {
                                    notificationService.success("Sorry, it looks like you've already gotten that reward today. Try again tomorrow.");
                                }
                                vm.showBusy = false;
                            },
                            function (error) {
                                vm.showBusy = false;
                                notificationService.error("Uh oh, something went wrong with your reward. Please try again.");
                            });
                    }

                }

                function processDailyTasks()
                {
                        
                        if (vm.offer.answer && vm.offer.answer.length > 0) 
                        {

                            vm.showBusy = true;
                                
                            if (!vm.userEarned) {
                                offerService.promoEarned(vm.offer)
                                    .then(function (response) {
                                        if (response.success) {
                                            vm.member.reward.points = response.balanceReceiver;
                                            vm.enoughPoynts = hasEnoughtPoynts();
                                            vm.userEarned = true;
                                            notificationService.success("Congratulations! Check back in tomorrow for more chances to earn poynts.");
                                        }
                                        else
                                        {
                                            notificationService.success("Sorry, it looks like you've already gotten that reward today. Try again tomorrow.");   
                                        }
                                        toggleModal();
                                        vm.showBusy = false;
                                    }, 
                                    function (error) {
                                        vm.showBusy = false;
                                        notificationService.error("Uh oh, something went wrong with your reward. Please try again.");
                                        toggleModal();
                                    });
                            }
                        }
                        else
                        {
                            notificationService.error("For god sake, give some answer.");
                        }

                }

                function redeemClick() {
                    vm.showBusy = true;
                    vm.redeemSuccessful = false;
                    offerService.redeemOffer(vm.offer)
                        .then(function (response) {
                            if (response.success == false) {
                                if (response.status == 'zeroFriction') {
                                    // goTo('require-onboard');
                                    $window.location = response.onboardUrl;
                                }
                            }
                            else {
                                vm.redeem_response = response;
                                vm.member.reward.points = response.balanceGiver;
                                vm.enoughPoynts = hasEnoughtPoynts();
                                notificationService.success("Offer is successfully purchased.");
                                vm.redeemSuccessful = true;
                                if (vm.showModalPurchase) {
                                    $scope.needReedemPopUp = true;
                                }
                                else {
                                    goTo('member.dashboard');
                                }
                                vm.offer.count++;
                                canRedeem();
                                vm.showBusy = false;
                            }
                        }, function (error) {
                            vm.showBusy = false;
                            notificationService.error("Error while saving voucher details. Please try again.");
                        });
                };

                $scope.savePurchasePopupPreference = function (gotoPurchases) {
                    if (gotoPurchases) {
                        goTo('member.myPurchases');
                    }
                    else {
                        if ($scope.purchasePreferenceCheckbox) {
                            offerService.setPurchaseShowAgainTag().then(function (response) {
                                if (response && response.success) {
                                    vm.showModalPurchase = false;
                                    goTo('member.dashboard');
                                }
                                else {
                                    notificationService.error("Unable to update user preference. Please try again.");
                                }
                            }, function (error) {
                                notificationService.error("Unable to update user preference at service. Please try again.");
                            })
                        }
                        else {
                            goTo('member.dashboard');
                        }
                    }
                };

                function canRedeem() {
                    if (vm.offer.frequency == 0) {
                        return vm.userEarned = false;
                    }
                    return vm.userEarned = vm.offer.count >= vm.offer.frequency;

                }

                function canEarn() {
                    if (vm.offer.promo_freq == 0) {
                        return vm.userEarned = false;
                    }
                    return vm.userEarned = vm.offer.count >= vm.offer.promo_freq;
                }



                function videoEnded() {
                    if (!vm.userEarned) {
                        offerService.promoEarned(vm.offer).then(function (response) {
                            if (response.success) {
                                var poyntsEarned = response.balanceReceiver - vm.member.reward.points;
                                vm.member.reward.points = response.balanceReceiver;
                                vm.enoughPoynts = hasEnoughtPoynts();
                                vm.userEarned = true;
                            }
                        });
                    }
                };

                function submitRating() {
                    // vm.showBusy = true;
                    if (!vm.review || !vm.review.rating || vm.review.rating == 0) {
                        return false;
                    }
                    vm.offer.review = vm.review;
                    if (!vm.userEarned) {
                        offerService.promoEarned(vm.offer)
                            .then(function (response) {
                                if (response.success) {
                                    vm.member.reward.points = response.balanceReceiver;
                                    vm.offer.count++;
                                    canEarn();
                                    vm.showBusy = false;

                                    // submit rating
                                    offerService.promoRating(vm.offer)
                                        .then(function (response) {
                                            if (response.success) {
                                                vm.showReviewScreen = false;
                                                vm.showReviewDone = true;
                                            }
                                        });

                                }
                            });
                    }
                }


                /**
                 * Button used to check FB Authentication. First checks if logged in, then checks if the proper permissions have been granted.
                 * If they have been granted, displays the checkbox instead of the authentication button.
                 */
                function authorizeFacebook() {
                    FB.login(function (response) {

                        if (response.authResponse != null) {
                            // Check permissions
                            ezfb.api(
                                "/me/permissions",
                                function (res) {
                                    if (res && !res.error) {

                                        // Check to make sure you have the right permission
                                        var authorized = false;
                                        for (var i = 0; i < res.data.length; i++) {
                                            if (res.data[i].permission == "publish_actions" && res.data[i].status == 'granted') {
                                                authorized = true;
                                            }
                                        }

                                        if (authorized) {
                                            offerService.storeFBToken({ token: response.authResponse.accessToken });
                                            vm.showFacebookAuth = false;
                                            vm.showFacebookCheck = true;
                                        }
                                        else {
                                            console.log("you don't have the proper permissions :(");
                                        }
                                    }
                                }
                            );
                        }
                        // Login didn't work
                        else {
                            console.log("You didn't give us the proper permissions dude :/");
                        }
                    }, {
                            scope: 'publish_actions'
                        });
                }

                /**
                 * Button used to check Twitter Authentication. Checks if user has logged in while allowing proper permissions.
                 * If they have been granted, displays the checkbox instead of the authentication button.
                 */
                function authorizeTwitter() {
                    var callbackUrl = window.location.origin + "/social-media-service/twitter/callback";
                    offerService.post("/social-media-service/twitter/authorize", { 'callbackUrl': callbackUrl });
                }

                /**
                 * Function used to handle Twitter's authentication callback. True means the authentication process worked, false means it didn't.
                 */
                function handleTwitterResponse(success) {
                    if (success) {
                        vm.showTwitterCheck = true;
                        vm.showTwitterAuth = false;
                        vm.socialChecks.twitter = true;
                    }
                }

                function submitSocialRating() {

                    if (!vm.review || !vm.review.rating || vm.review.rating == 0) {
                        return false;
                    }
                    vm.offer.review = vm.review;
                    vm.showBusy = true;

                    // Add the names of the sub promos triggered to an array
                    vm.offer.subPromosEarn = ["Review"];
                    if (vm.socialChecks.facebook) {
                        vm.offer.subPromosEarn.push("Facebook");
                    }
                    if (vm.socialChecks.twitter) {
                        vm.offer.subPromosEarn.push("Twitter");
                    }

                    let facebookMessage = "";
                    let facebookLink = window.location.origin + "/social-media/Facebook/" + vm.offer.enterprise.ent_id;

                    vm.offer.facebookMessage = {
                        message: vm.review.comment,
                        link: facebookLink
                    }

                    // link: window.location.origin + "/social-media/Facebook/100/" + vm.review.rating

                    vm.offer.twitterMessage = "Carepoynt just rewarded me for healthy living at " + vm.offer.enterprise.ent_name + ". Check 'em out!\nHeart Rating: ";
                    vm.offer.twitterMessage += '💙'.repeat(vm.review.rating);
                    vm.offer.twitterMessage += "\n" + "http://carepoynt.com/consumers";

                    // Now give them poynts
                    if (!vm.userEarned) {
                        offerService.promoSocialRating(vm.offer)
                            .then(function (response) {
                                if (response.success) {
                                    vm.member.reward.points = response.balanceReceiver;
                                    vm.offer.count++;
                                    canEarn();

                                    // submit rating
                                    vm.offer.twitterMessage = "";
                                    vm.offer.facebookMessage = "";
                                    offerService.promoRating(vm.offer)
                                        .then(function (response) {
                                            if (response.success) {
                                                vm.showReviewScreen = false;
                                                vm.showReviewDone = true;
                                                vm.showBusy = false;
                                                // notificationService.success("You earned " + response.totalPoynts + " poynts for submitting a review.");
                                            }
                                        });
                                }
                            });
                    }
                    //}
                }

                function closeReview() {
                    vm.review = {};
                    vm.showOffer = true;
                    vm.showReviewScreen = false;
                    vm.showReviewDone = false;
                    vm.showSocial = false;
                }

                function closeReferral() {
                    vm.referral = {
                        email: ''
                    };
                    vm.showMemberInvited = false;
                    vm.showReferralScreen = false;
                }



                function socialShare() {
                    if (!vm.userEarned) {
                        vm.showBusy = true;
                        offerService.promoEarned(vm.offer)
                        offerService.promoEarned(vm.offer)
                            .then(function (response) {
                                if (response.success) {
                                    vm.member.reward.points = response.balanceReceiver;
                                    vm.enoughPoynts = hasEnoughtPoynts();
                                    vm.userEarned = true;
                                    vm.showBusy = false;
                                }
                            });
                    }
                }


                function isActionable() {
                    vm.offer.action = vm.offer.action || {};
                    vm.isActionable = vm.offer.action.type != CP_ACTION_CONST.STAFF;
                }

                function setAction() {
                    isActionable();
                    if (vm.offer.action.type == CP_ACTION_CONST.STAFF) {
                        vm.cp_action.STAFF = true;
                    }
                    else if (vm.offer.action.type == CP_ACTION_CONST.WATCH_VIDEO) {
                        vm.cp_action.WATCH_VIDEO = true;
                    }
                    else if (vm.offer.action.type == CP_ACTION_CONST.RATING) {
                        vm.cp_action.RATING = true;
                    }
                    else if (vm.offer.action.type == CP_ACTION_CONST.IN_APP_ACTION) {
                        vm.cp_action.IN_APP_ACTION = true;
                    }
                    else if (vm.offer.action.type == CP_ACTION_CONST.DONATE) {
                        vm.cp_action.DONATE = true;
                    }
                    else {
                        vm.cp_action.STAFF = true;
                    }
                }


                /*
                ******* youtube player functions ************
                */
                function initYoutubeApi() {
                    var tag = document.createElement('script');
                    tag.id = 'iframe-demo';
                    tag.src = 'https://www.youtube.com/iframe_api';
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                };

                var yt_player_iframe;
                function onYouTubeIframeAPIReady() {
                    //creates the player object
                    yt_player_iframe = new YT.Player('yt_player_iframe', {
                        events: {
                            'onReady': onYouTubePlayerReady,
                            'onStateChange': onYouTubePlayerStateChange
                        }
                    });
                }

                function onYouTubePlayerReady() {
                    // console.log('Video is ready to play');
                }

                function onYouTubePlayerStateChange(event) {

                    switch (event.data) {
                        case YT.PlayerState.UNSTARTED:
                            // console.log('unstarted');
                            break;
                        case YT.PlayerState.ENDED:
                            videoEnded();
                            break;
                        case YT.PlayerState.PLAYING:
                            // console.log('playing');
                            break;
                        case YT.PlayerState.PAUSED:
                            // console.log('paused');
                            break;
                        case YT.PlayerState.BUFFERING:
                            // console.log('buffering');
                            break;
                        case YT.PlayerState.CUED:
                            // console.log('video cued');
                            break;
                    }
                };



                function openHumanApi() {

                    if (vm.features['dark.member.link-acct-fitbit']) {
                        var options = {
                            modal: 1,
                            mode: 'wellness', //or 'medical' (default if not specified)
                            clientUserId: vm.member.memberid,
                            clientId: vm.humanApiProfile.clientId, // grab it from app settings page
                            publicToken: vm.humanApiProfile.publicToken,  // Leave blank for new users

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
                    }

                }

                function getHumanApiProfile() {

                    if (vm.features['dark.member.link-acct-fitbit']) {
                        memberService.getHumanApiProfile()
                            .then(function (response) {
                                vm.humanApiProfile = response;

                            });
                    }
                }

                function getOnboardUrl() {

                    offerService.getOnboardUrl()
                        .then(function (response) {
                            vm.onboardUrl = response.onboardUrl;
                        });
                }

                function goToOnboard() {
                    $window.location = vm.onboardUrl;
                }

                function getTotalPoynts() {
                    let poynts = 0;
                    if (vm.offer.hasOwnProperty('subPromos')) {
                        vm.offer.subPromos.forEach(function (promo) {
                            poynts += parseInt(promo.reward_value);
                        });
                    } else {
                        poynts = parseInt(vm.offer.reward_value);
                    }

                    return poynts;
                }


                // function confirmEarn(action) {
                //   close(action, 500);
                // }





                function isAffiliate() {
                    return vm.offer.action.type == 'affiliate';
                }

                function isCheckin() {
                    return vm.offer.promo_type == 'scanToEarn';
                }

                function isVariable() {
                    return vm.offer.promo_type == 'variable_promotion';
                }

                function cancelReview() {
                    vm.showOffer = true;
                    vm.showReviewScreen = false;
                    vm.showSocial = false;
                }

            }])

        .controller('ModalController', function ($scope, close) {


            $scope.dontShowAgainCheckbox = $scope.dontShowAgainPurchaseCheckbox = false;

            $scope.confirmEarn = function (result) {
                var data = {};
                data.result = result;
                data.check = $scope.dontShowAgainCheckbox;
                if (result) {
                    window.open(window.affiliateUrl);
                }
                close(data, 500);

                // close, but give 500ms for bootstrap to animate
            };

            $scope.confirmPurchase = function (result) {
                var data = {};
                data.result = result;
                data.check = $scope.dontShowAgainPurchaseCheckbox;
                close(data, 500);
            };

        });
}());
var handleTwitterResponse = (success) => {
    var scope = angular.element($("#twitterCheck")).scope();
    scope.$apply(function () {
        scope.handleTwitterResponse(success);
    });
}