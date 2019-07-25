var isProduction = false;

var BUNDLE_SCRIPTS = {
    LibraryScript: ['/cp/library/node_modules/moment/moment.js',
        '/cp/library/node_modules/chart.js/dist/Chart.js',
        '/cp/library/node_modules/lodash/lodash.js',
        '/cp/library/node_modules/angular-modal-service/dst/angular-modal-service.js',
        '/cp/library/node_modules/mobile-detect/mobile-detect.js'],

    HelperScript: ['/cp/member-app-ui/app/helpers/enum.js',
        '/cp/member-app-ui/app/components/cpDatePickerComponent.js',
        '/cp/member-app-ui/app/components/cpEnterpriseTileComponent.js',
        '/cp/member-app-ui/app/components/cpRateReviewComponent.js',
        '/cp/member-app-ui/app/components/cpCommentRatingComponent.js'],

    FilterScripts: ['/cp/member-app-ui/app/filters/dateFilters.js',
        '/cp/member-app-ui/app/filters/phoneFilter.js'],

    MemberScripts: ['/cp/member-app-ui/app/services/teleTubbyService.js',
        '/cp/member-app-ui/app/helpers/addtohomescreen.js',
        '/cp/utils/googleAnalyticsService.js',
        '/cp/member-app-ui/app/services/careplanService.js',
        '/cp/member-app-ui/app/services/offerService.js',
        '/cp/member-app-ui/app/services/voucherService.js',
        '/cp/member-app-ui/app/services/earnService.js',
        '/cp/member-app-ui/app/services/redeemService.js',
        '/cp/member-app-ui/app/services/enterpriseService.js',
        '/cp/member-app-ui/app/services/giftCardService.js?v=1023',
        '/cp/member-app-ui/app/services/cliqueService.js',
        '/cp/member-app-ui/app/services/referralService.js',
        '/cp/member-app-ui/app/services/rateReviewService.js',
        '/cp/member-app-ui/app/controllers/memberController.js'
    ],

    DashboardScripts: ['/cp/member-app-ui/app/controllers/dashboardController.js'],

    MyProfileScripts: ['/cp/member-app-ui/app/controllers/myProfileController.js',
        'https://connect.humanapi.co/connect.js'],

    CliquesScripts: ['/cp/member-app-ui/app/controllers/cliquesController.js'],

    ContactUsScripts: ['/cp/member-app-ui/app/controllers/contactUsController.js'],

    ReferBusinessScripts: ['/cp/member-app-ui/app/controllers/referBusinessController.js'],

    MyPurchasesScripts: ['/cp/member-app-ui/app/controllers/myPurchasesController.js'],

    PoyntLogScripts: ['/cp/member-app-ui/app/controllers/poyntLogController.js'],

    EarnScripts: ['/cp/member-app-ui/app/controllers/earnController.js'],

    RedeemScripts: ['/cp/member-app-ui/app/controllers/redeemController.js'],

    OfferScripts: ['/cp/member-app-ui/app/controllers/offerController.js'],

    CareplanScripts: ['/cp/member-app-ui/app/controllers/careplanController.js'],

    CareplanTypeScripts: ['/cp/member-app-ui/app/controllers/careplanTypeController.js'],

    VoucherScripts: ['/cp/member-app-ui/app/controllers/voucherController.js'],

    RedeemScripts: ['/cp/member-app-ui/app/controllers/redeemController.js'],

    EnterpriseScripts: ['/cp/member-app-ui/app/controllers/enterpriseController.js'],

    GiftCardScripts: ['/cp/member-app-ui/app/filters/safeHTML.js',
        '/cp/member-app-ui/app/controllers/giftCardController.js'
    ],

    CliqueScripts: ['/cp/member-app-ui/app/controllers/cliqueController.js'],

    CliqueAddMemberScripts: ['/cp/member-app-ui/app/controllers/cliqueAddMemberController.js'],

    ReferralOfferScripts: ['/cp/member-app-ui/app/controllers/referralOfferController.js'],

    ReferFriendScripts: ['/cp/member-app-ui/app/controllers/referFriendController.js'],

    CurrentReferrals: ['/cp/member-app-ui/app/controllers/currentReferralController.js']

}

var SCRIPT_FILES = {
    HumanApiScript: ['https://connect.humanapi.co/connect.js'],
    bundleFile: ['/cp/library/externalBundle.js', '/cp/library/bundle.js'],
    GiftCardScripts: ['/cp/member-app-ui/app/filters/safeHTML.js']
};

var BundleAllMemberScripts;
if (isProduction) {
    BundleAllMemberScripts = [SCRIPT_FILES.HumanApiScript, SCRIPT_FILES.bundleFile, SCRIPT_FILES.GiftCardScripts];
} else {
    var BundleAllMemberScripts = [BUNDLE_SCRIPTS.LibraryScript, BUNDLE_SCRIPTS.HelperScript, BUNDLE_SCRIPTS.FilterScripts,
        BUNDLE_SCRIPTS.MemberScripts, BUNDLE_SCRIPTS.DashboardScripts, BUNDLE_SCRIPTS.MyProfileScripts,
        BUNDLE_SCRIPTS.CliquesScripts, BUNDLE_SCRIPTS.ContactUsScripts, BUNDLE_SCRIPTS.ReferBusinessScripts,
        BUNDLE_SCRIPTS.MyPurchasesScripts, BUNDLE_SCRIPTS.PoyntLogScripts, BUNDLE_SCRIPTS.EarnScripts,
        BUNDLE_SCRIPTS.RedeemScripts, BUNDLE_SCRIPTS.OfferScripts, BUNDLE_SCRIPTS.CareplanScripts,
        BUNDLE_SCRIPTS.CareplanTypeScripts, BUNDLE_SCRIPTS.VoucherScripts, BUNDLE_SCRIPTS.RedeemScripts, BUNDLE_SCRIPTS.EnterpriseScripts,
        BUNDLE_SCRIPTS.GiftCardScripts, BUNDLE_SCRIPTS.CliqueScripts, BUNDLE_SCRIPTS.CliqueAddMemberScripts,
        BUNDLE_SCRIPTS.ReferralOfferScripts, BUNDLE_SCRIPTS.ReferFriendScripts, BUNDLE_SCRIPTS.CurrentReferrals];
}
