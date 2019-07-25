angular.module('app', ['ui.router', 'app.utils', 'app.feature-toggle', 'app.member', 'ui.bootstrap', 'app.components',
    'ezfb', 'ngMap', 'ui.mask'])
    .config(['$stateProvider', '$urlRouterProvider', 'ezfbProvider', function ($stateProvider, $urlRouterProvider, ezfbProvider) {

        $stateProvider
            .state('member', {
                url: '/member',
                templateUrl: 'views/member/index.html',
                controller: 'memberController as ctrl',
                resolve: {
                    pinkyPromise: ['lazyLoader', function (lazyLoader) {
                        return lazyLoader.load(BundleAllMemberScripts);
                    }],
                    memberDataItems: ['$q', 'featureToggleService', 'memberService',
                        function ($q, featureToggleService, memberService) {
                            var dfd = $q.defer();
                            var prom = {
                                features: featureToggleService.getFeatureToggles(),
                                member: memberService.getMember(true)
                            };
                            $q.all(prom).then(function (response) {
                                if (response && response.features && response.member) {
                                    memberService.getMemberTags({ 'memberid': response.member.memberid })
                                        .then(function (memberTags) {
                                            response.memberTags = memberTags;
                                            dfd.resolve(response);
                                        }, function (error) {
                                            dfd.resolve(error);
                                        });
                                }
                                else {
                                    dfd.resolve("Some error occured: try again");
                                }
                            }, function (error) {
                                dfd.resolve(error);
                            });
                            return dfd.promise;
                        }]
                },

            })
            .state('member.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/index.html',
                controller: 'dashboardController',
                resolve: {

                }
            })
            .state('member.myProfile', {
                url: '/my-profile',
                templateUrl: 'views/my-profile/index.html',
                controller: 'myProfileController as ctrl',
            })
            .state('member.cliques', {
                url: '/cliques',
                templateUrl: 'views/cliques/index.html',
                controller: 'cliquesController as ctrl'
                // resolve: {
                //     cliques: ['cliqueService', function (cliqueService) {
                //         return cliqueService.getAllCliquesWithDetails().then({}, function (err) { return err; });
                //     }]
                // }
            })
            .state('member.cliques.clique', {
                url: '/clique',
                views: {
                    '@member': {
                        templateUrl: "views/clique/index.html",
                        controller: 'cliqueController as ctrl'
                    }
                }
            })
            .state('member.cliques.addMember', {
                url: '/add-member/:id/:created_by',
                views: {
                    '@member': {
                        templateUrl: "views/clique-member/index.html",
                        controller: "cliqueAddMemberController as ctrl"
                    }
                }
            })
            .state('member.contactUs', {
                url: '/contact-us',
                templateUrl: "views/contact-us/index.html",
                controller: 'contactUsController'
            })
            .state('member.faqs', {
                url: '/FAQs',
                templateUrl: "views/faqs/faqs.html",
            })
            .state('member.referBusiness', {
                url: '/refer-business',
                templateUrl: "views/refer-business/index.html",
                controller: 'referBusinessController as ctrl'
            })
            .state('member.myPurchases', {
                url: '/my-purchases',
                templateUrl: "views/my-purchases/index.html",
                controller: 'myPurchasesController as ctrl',
                resolve: {
                    purchases: ['memberService', 'memberDataItems', function (memberService, memberDataItems) {
                        return memberService.getPurchaseDetails(memberDataItems.member)
                            .then({}, function (err) {
                                return err;
                            });
                    }]
                }
            })
            .state('member.poyntLog', {
                url: '/poynt-log',
                templateUrl: 'views/poynt-log/index.html',
                controller: 'poyntLogController as ctrl',
                resolve: {
                    poyntLog: ['memberService', '$q', function (memberService, $q) {
                        var dfd = $q.defer(); // To do can create a single call in PHP to get update Member Poynt Log Details
                        memberService.getMember(true).then(function (member) {
                            if (member) {
                                memberService.getMemberPoyntsLogDetails(member)
                                    .then(function (response) {
                                        dfd.resolve(response);
                                    }, function (err) {
                                        dfd.resolve(err);
                                    })
                            } else {
                                dfd.resolve({ 'error_code': 'error', 'error_message': "Some error occured while getting member." });
                            }
                        }, function (err) {
                            dfd.resolve({ 'error_code': 'error', 'error_message': "Some error occured while getting member." });
                        })
                        return dfd.promise;
                    }]
                }
            })
            .state('member.earn', {
                url: '/earn',
                templateUrl: 'views/earn/index.html',
                controller: 'earnController as ctrl'
            })
            .state('member.redeem', {
                url: '/redeem',
                controller: 'redeemController as ctrl',
                templateUrl: 'views/redeem/index.html?v=1023'
            })
            .state('member.dashboard.offer', {
                url: '/offer/:type/:id',
                views: {
                    '@member': {
                        templateUrl: "views/offer/index.html",
                        controller: 'offerController',
                    }
                }
            })
            .state('member.earn.enterprise.offer', {
                url: '/offer/:type/:id',
                views: {
                    '@member': {
                        templateUrl: "views/offer/index.html?v=1103",
                        controller: 'offerController',
                    }
                }
            })
            .state('member.redeem.enterprise.offer', {
                url: '/offer/:type/:id',
                views: {
                    '@member': {
                        templateUrl: "views/offer/index.html",
                        controller: 'offerController',
                    }
                }
            })
            .state('member.referFriend', {
                url: '/refer-friend',
                templateUrl: "views/refer-friend/index.html",
                controller: 'referFriendController as ctrl',
            })
            .state('member.currentReferrals', {
                url: '/current-referrals',
                templateUrl: "views/current-referral/index.html",
                controller: 'currentReferralController as ctrl',
                resolve: {
                    currentReferrals: ['referralService', 'memberDataItems', function (referralService) {
                        return referralService.getCurrentReferrals()
                            .then({}, function (err) {
                                return err;
                            });
                    }]
                }
            })
            .state('member.referralOffer', {
                url: '/referralOffer/:id',
                templateUrl: "views/offer/referralOffer.html",
                controller: 'referralOfferController as ctrl',
            })
            .state('member.feedback', {
                url: '/feedback',
                templateUrl: "views/feedback/index.html",
                controller: 'offerController',
            })
            .state('member.careplan', {
                url: '/careplan',
                templateUrl: "views/careplan/index.html",
                controller: 'careplanController as ctrl',
                resolve: {
                    careplanList: ['careplanService', 'memberDataItems',
                        function (careplanService, memberDataItems) {
                            return careplanService.getCareplanList(memberDataItems.features);
                        }]
                }
            })
            .state('member.careplan.careplanType', {
                url: '/type/:careplanType',
                views: {
                    '@member': {
                        templateUrl: "views/careplan-type/index.html",
                        controller: 'careplanTypeController as ctrl'
                    }
                },
                resolve: {
                    enterpriseList: ['$stateParams', 'careplanService', function ($stateParams, careplanService) {
                        return careplanService.getEnterprisesByTagForMember($stateParams.careplanType)
                            .then({}, function (err) {
                                return err;
                            });
                    }]
                }
            })
            .state('member.voucher', {
                url: '/voucher/:id',
                templateUrl: 'views/voucher/index.html',
                controller: 'voucherController as ctrl'
            })
            .state('member.redeem.giftcard', {
                url: '/giftcard/:utid/:amt',
                views: {
                    '@member': {
                        templateUrl: "views/giftcard/index.html?v=1023",
                        controller: 'giftCardController as ctrl'
                    }
                },
                resolve: {
                    giftCardData: ['$stateParams', 'giftCardService', function ($stateParams, giftCardService) {
                        return giftCardService.getTangoCard($stateParams)
                            .then({}, function (err) {
                                return err;
                            });
                    }]
                }
            })
            .state('member.earn.enterprise', {
                url: '/enterprise/:entId',
                views: {
                    '@member': {
                        templateUrl: "views/enterprise/index.html",
                        controller: 'enterpriseController as ctrl',
                    }
                }
            })
            .state('member.earn.affiliatedOffer', {
                url: '/affiliated-offer/:type/:id',
                views: {
                    '@member': {
                        templateUrl: "views/offer/index.html",
                        controller: 'offerController',
                    }
                }
            })
            .state('member.redeem.enterprise', {
                url: '/enterprise/:entId',
                views: {
                    '@member': {
                        templateUrl: "views/enterprise/index.html",
                        controller: 'enterpriseController as ctrl',
                    }
                }
            })

        $urlRouterProvider
            .when('', 'member.dashboard')
            .otherwise('member/dashboard');

        ezfbProvider.setInitParams({
            appId: '1275109325868916',
            cookie: true
        });
    }])
    .run(['$rootScope', 'cpUtils', '$transitions', '$window', '$location',
        function ($rootScope, cpUtils, $transitions, $window, $location) {
            $transitions.onStart({}, function ($transition) {
                cpUtils.closeFlyout();
                angular.element(document.querySelector('#content_wrapper')).scrollTop(0, 0);
                $rootScope.currentStateIncludes = $transition.$to().includes;
                $window.ga('send', 'pageview', $location.path());
                window.scrollTo(0, 0);
            });
        }]);
