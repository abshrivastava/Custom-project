
(function init ($, window, document) {
    // console.log("initializing");
    var earnBtn = $("#earnBtn");
    var redeemBtn = $("#redeemBtn");
    var memberBtn = $("#memberBtn");
    var earnWrapper = $(".earn-wrapper");
    var redeemWrapper = $(".redeem-wrapper");
    var memberWrapper = $(".member-wrapper");
    var memberEmailButton = $("#member-email-button");
    var sendPoyntsButton = $("#send-poynts-button");
    var enterprisePoynts = $("#enterprise-poynts");
    var memberResponseSuccess = $("#member-response-success");
    var memberResponseError = $("#member-response-error");
    var memberEmail = $("#member-email");
    var memberForm = $("#member-form");
    var earnForm = $("#earn-form");
    var redeemForm = $("#redeem-form");
    var redeemResponse = $("#redeem-response-section");
    var redeemCodeButton = $("#redeem-code-button");
    var earnResponseSuccess = $("#earn-response-success");
    var earnResponseError = $("#earn-response-error");
    var earnName = $("#earn-name");
    var redeemName = $("#redeem-name");
    var redeemOffer = $("#redeem-offer");
    var redeemDescription = $("#redeem-description");
    var redeemPos = $("#redeem-pos");
    var redeemError = $("#redeem-error");
    var redeemEnter = $("#redeem-enter-section");
    var redeemOkayButton = $("#redeem-okay-button");
    var redeemSuccess = $("#redeem-success");

    earnBtn.click(function() {
        showEarnForm();
        hideMemberForm();
        hideRedeemForm();
    });

    redeemBtn.click(function() {
        showRedeemForm();
        hideMemberForm();
        hideEarnForm();
    });

    memberBtn.click(function() {
        showMemberForm();
        hideEarnForm();
        hideRedeemForm();
    });

    $.ajaxSetup({
        beforeSend:function(){
            // show gif here, eg:
            $("#loading").show();
        },
        complete:function(){
            // hide gif here, eg:
            $("#loading").hide();
        }
    });

    getEnterprisePoynts();

    $.ajax({
        url: "/staff-portal/enterprise-balance",
        type: "GET",
        // global:false, 
        //uncomment to make busy spinner not work on this call.
        success: function (data) {
            setEnterprisePoynts(data.poynts);
        }
    });

    memberForm.validate({
        rules : {
            "member_email" : {
                required : true,
                email : true
            }
        },
        submitHandler : function (form) {
            $.ajax({
                url: "/staff-portal/add-member",
                type: "POST",
                data: memberForm.serialize(),

                success: function (data) {
                    if (data.success) {
                        memberResponseError.html("");
                        if(data.msg == "addMemberRole") {
                            memberResponseSuccess.html("Success! An email confirmation has been sent to the user to complete registration.");
                        }
                        else {
                            memberResponseSuccess.html("Success! Member has Joyned.")
                        }
                    } else {
                        memberResponseSuccess.html("");
                        memberResponseError.html("This member has already Joyned.");
                    }
                    resetForm(memberForm);
                }
            });
        }
        
    });

     $.validator.addMethod("valueNotEquals", function(value, element, arg){
      return arg !== value;
     }, "You must select a promotion to continue.");


    earnForm.validate({
        rules : {
            "earn_query" : {
                required : true
            },
            "promo_id" : {
                valueNotEquals: ""
            }
        },
        submitHandler : function (form) {
            $.ajax({
                url: "/staff-portal/promo-tx",
                type: "POST",
                data: $("#earn-form").serialize(),

                success: function (data) {
                    if (data.success) {
                        setEnterprisePoynts(data.balanceGiver);
                        earnResponseError.html("");
                        earnResponseSuccess.html("Success! " + data.reward_value + " Poynts were awarded to " + earnName.val() + ".");
                    } else {
                        earnResponseSuccess.html("");
                        if(data.message == "Insufficient Points") {
                            earnResponseError.html("You do not have enough Poynts for this promotion.");
                        }
                        else if (data.message == "Already given") {
                            earnResponseError.html("This promotion has already been earned.")
                        }
                        else {
                            earnResponseError.html("There was an error awarding this promotion.");
                        }

                    }
                    resetForm(earnForm);
                }
            });
        }
    });

    redeemForm.validate({
        rules : {
            "voucher_code" : {
                required : true
            }
        },
        submitHandler : function (form){
            $.ajax({
                url: "/staff-portal/redemption-tx",
                type: "post",
                data: redeemForm.serialize(),

                success: function (data) {
                    if (data.success) {
                        redeemResponse.removeClass("hide");
                        redeemEnter.addClass("hide");
                        redeemName.html(data.name);
                        redeemOffer.html(data.title);
                        redeemDescription.html(data.description);
                        redeemPos.html(data.pos_code);
                        redeemCodeButton.hide();
                        redeemOkayButton.show();
                        redeemSuccess.html("Success! Coupon has been redeemed.")
                    } else {
                        if(data.msg == 'invalid') {
                            redeemError.html("This code is not valid.");
                        }
                        else if (data.msg == 'used') {
                            redeemError.html("This voucher has already been redeemed.");
                        }
                        else {//error
                            redeemError.html("There was a problem redeeming this voucher.");
                        }
                    }
                    getEnterprisePoynts();
                    resetForm(redeemForm);
                }            
            });
        }
    });


    redeemOkayButton.click(function() {
        redeemName.html("");
        redeemOffer.html("");
        redeemDescription.html("");
        redeemPos.html("");
        redeemResponse.addClass("hide");
        redeemOkayButton.hide();
        redeemCodeButton.show();
        redeemSuccess.html("")
        redeemError.html("");
        redeemEnter.removeClass("hide");
        
    }) 

    $.typeahead({
        input: '.js-typeahead-user_v1',
        minLength: 1,
        order: "asc",
        dynamic: true,
        delay: 500,
        filter:false,
        backdrop: {
            "background-color": "#fff"
        },
        template: function (query, item) {
            var pf=formatPhone(item.mPhone);
            return '<span class="med_title">{{name}}</span><br><span class="sm_title">'+pf+'</span> | <span class="sm_title">{{email}}</span>';
        },
        emptyTemplate: "no result for {{query}}",
        source: {
            user: {
                display: "name",

                ajax: function (query) {
                    return {
                        type: "GET",
                        url: "/staff-portal/find-member",
                        path: "members",
                        data: earnForm.serialize()
                    }
                }
            }
        },
        callback: {
            onClick: function (node, a, item, event) {
                $("#promo_member_id").val(item.id);
            }
        },
        debug: true
    });

    function formatPhone(phonenum) {
        var regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (regexObj.test(phonenum)) {
            var parts = phonenum.match(regexObj);
            var phone = "";
            if (parts[1]) { phone += "(" + parts[1] + ") "; }
            phone += parts[2] + "-" + parts[3];
            return phone;
        }
        else {
            //invalid phone number
            return phonenum;
        }
    }

    function setEnterprisePoynts(poynts) {
        enterprisePoynts.html(poynts + " Poynts");
    }

    function showEarnForm() {
        earnWrapper.removeClass("hide");
        earnBtn.addClass("active");
        redeemOkayButton.hide();
        redeemCodeButton.show();
    }

    function hideEarnForm() {
        resetForm(earnForm);
        earnWrapper.addClass("hide");
        earnBtn.removeClass("active");
        earnResponseSuccess.html("");
        earnResponseError.html("");
    }

    function showMemberForm() {
        redeemOkayButton.hide();
        redeemCodeButton.show();
        memberWrapper.removeClass("hide");
        memberBtn.addClass("active");
    }

    function hideMemberForm() {
        resetForm(memberForm);
        memberWrapper.addClass("hide");
        memberBtn.removeClass("active");
        memberResponseSuccess.html("");
        memberResponseError.html("");
    }

    function showRedeemForm() {
        redeemOkayButton.hide();
        redeemCodeButton.show();
        redeemWrapper.removeClass("hide");
        redeemBtn.addClass("active");
    }

    function hideRedeemForm() {
        resetForm(redeemForm);
        redeemWrapper.addClass("hide");
        redeemBtn.removeClass("active");
        redeemEnter.removeClass("hide");
        redeemResponse.addClass("hide");
        redeemError.html("");
        redeemSuccess.html("");
    }

    function resetForm(form) {
        form[0].reset();
        form.validate().resetForm();
    }

    function getEnterprisePoynts() {
        $.ajax({
            url: "/staff-portal/enterprise-balance",
            type: "GET",
            // global:false, 
            //uncomment to make busy spinner not work on this call.
            success: function (data) {
                setEnterprisePoynts(data.poynts);
            }
        });
    }
        
}(window.jQuery, window, document));
