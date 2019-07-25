/********************* Enum Decalaration ************************/

var PROMO_TYPE = {
    VariablePromotion: "variable_promotion"
};

var STATE_LIST = [
    { 'id': 'Alabama', 'value': "AL" },
    { 'id': 'Alaska', 'value': "AK" },
    { 'id': 'Arizona', 'value': "AZ" },
    { 'id': 'Arkansas', 'value': "AR" },
    { 'id': 'California', 'value': "AR" },
    { 'id': 'Colorado', 'value': "CO" },
    { 'id': 'Connecticut', 'value': "CT" },
    { 'id': 'Delaware', 'value': "DE" },
    { 'id': 'District Of Columbia', 'value': "DC" },
    { 'id': 'Florida', 'value': "FL" },
    { 'id': 'Georgia', 'value': "GA" },
    { 'id': 'Hawaii', 'value': "HI" },
    { 'id': 'Idaho', 'value': "ID" },
    { 'id': 'Illinois', 'value': "IL" },
    { 'id': 'Indiana', 'value': "IN" },
    { 'id': 'Iowa', 'value': "IA" },
    { 'id': 'Kansas', 'value': "KS" },
    { 'id': 'Kentucky', 'value': "LA" },
    { 'id': 'Maine', 'value': "ME" },
    { 'id': 'Maryland', 'value': "MD" },
    { 'id': 'Massachusetts', 'value': "MA" },
    { 'id': 'Michigan', 'value': "MI" },
    { 'id': 'Minnesota', 'value': "MN" },
    { 'id': 'Mississippi', 'value': "MS" },
    { 'id': 'Missouri', 'value': "MO" },
    { 'id': 'Montana', 'value': "MT" },
    { 'id': 'Nebraska', 'value': "NE" },
    { 'id': 'Nevada', 'value': "NV" },
    { 'id': 'New Hampshire', 'value': "NH" },
    { 'id': 'New Jersey', 'value': "NJ" },
    { 'id': 'New Mexico', 'value': "NM" },
    { 'id': 'New York', 'value': "NY" },
    { 'id': 'North Carolina', 'value': "NC" },
    { 'id': 'North Dakota', 'value': "ND" },
    { 'id': 'Ohio', 'value': "OH" },
    { 'id': 'Oklahoma', 'value': "OK" },
    { 'id': 'Oregon', 'value': "OR" },
    { 'id': 'Pennsylvania', 'value': "PA" },
    { 'id': 'Rhode Island', 'value': "RI" },
    { 'id': 'South Carolina', 'value': "SC" },
    { 'id': 'South Dakota', 'value': "SD" },
    { 'id': 'Tennessee', 'value': "TN" },
    { 'id': 'Texas', 'value': "TX" },
    { 'id': 'Utah', 'value': "UT" },
    { 'id': 'Vermont', 'value': "VT" },
    { 'id': 'Virginia', 'value': "VA" },
    { 'id': 'Washington', 'value': "WA" },
    { 'id': 'West Virginia', 'value': "WV" },
    { 'id': 'Wisconsin', 'value': "WI" },
    { 'id': 'Wyoming', 'value': "WY" },
];

var ERROR_CODES = {
    Null_Response_Error: "OOPS! Some server error occured. Please contact the administrator."
};

var CARERPLAN_LIST = [
    { name: "Eat Healthy", tag: "eat_healthy", cssClass: "fa fa-2x fa-cutlery" },
    { name: "Get Fit", tag: "get_fit", cssClass: "fa fa-2x fa-bicycle" },
    { name: "Relax & Renew", tag: "relax_and_renew", cssClass: "fa fa-2x fa-pagelines" },
    { name: "Healthcare", tag: "healthcare", cssClass: "fa fa-2x fa-heartbeat" },
    { name: "New", tag: "new", cssClass: "fa fa-2x fa-star" },
    { name: "Learn Carepoynt", tag: "learn", cssClass: "fa fa-2x fa-question" }
];

var TILE_DATA_LIMIT = {
    NoLimit: false,
    AllTabLocalandNationalCount: 4,
    LocalTabLocalCount:20,
    RedeemScreen: 3,
    EnterpriseScreen: 3,
    GiftCardMobileCount: 4,
    GiftCardDesktopCount: 3,
    EnterpriseAboutTab :1
};

var OFFERS_TABS = {
    All: 'all',
    Local: 'local'
};

var SHOW_BUTTONS= {
   ShowMore: "show more",
   ShowLess: "show less",
};

var STATE_NAMES = {
    Dashboard: 'member.dashboard',
    Earn: 'member.earn',
    Redeem: 'member.redeem',
    Careplan: 'member.careplan',
    Cliques: 'member.cliques',
    ReferFriend: 'member.referFriend',
    ReferralOffer: 'member.referralOffer',
    CurrentReferral: 'member.currentReferrals',
    EarnEnterprise: 'member.earn.enterprise'
};

var ENTERPRISE_TABS = {
    Earn: 'earn',
    Redeem: 'redeem',
    About: 'about'
};

var CLIQUE_INVITE_TYPE = {
    Email: 'email',
    Dependent: 'dependent'
}

var ENTERPRISE_TAGS = {
    Tag_Affiliate: "affiliate"
};

var Carepynt_Rewards_EntId = 1;

var ENTERPRISE_NAMES = {
    CarepoyntRewards: 'Carepoynt Rewards'
}