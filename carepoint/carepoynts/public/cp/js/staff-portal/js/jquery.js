var pusher;
var deferredEmail = {action: "none", mid: "", name: ""};
var loggedMemberid = '<? echo $_SESSION["loginMember"]["memberid"] ?>';
var helpMe = '<? echo $this->data["helpMe"] ?>';
var fancyEvent;
var tl_loadedPage;
var navPath= "<? echo $_SESSION['navPath'] ?>";
var ovPath;
var popState = false;
var fancyNeedRefresh = false;
var ustatus = parseInt('<? echo $_SESSION["selectedMember"]["roleid"] ?>');
var lstatus = parseInt('<? echo $_SESSION["loginMember"]["roleid"] ?>');
var grid;
var rdataStore;
var loadMainFlag = false;
var showpay = '<? echo $_SESSION["showpay"] ?>';
var phoneWindow;
var videoChatWindow;

String.prototype.format = function() {
    var str = this;
    for (var i = 0; i < arguments.length; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        str = str.replace(reg, arguments[i]);
    }
    return str;
}

$(document).ready(function () {
    $(document).ajaxSend(function (event, request, settings) {
        $('#loading-indicator').show();
    });

    $(document).ajaxComplete(function (event, request, settings) {
        $('#loading-indicator').hide();
    });

    $("#homeBtn").hide();
    $("div[title*='Timeline']").hide();
    //nav button array

    if (lstatus == 10) {
        $("div[title*='Dashboard']").hide();
        $("div[title*='Patients']").hide();
        $("div[title*='Reports']").hide();
        $("#workTimeBtn").hide();
        $("div[title*='Config']").hide();
        $("div[title*='Admin']").show();
    }
    //lstatus 4 is a different home page - member_home.tpl.html
    if (lstatus == 5) {  //cp front office staff
        $("#hotlineBtn").hide();
        $("#workTimeBtn").hide();
        $("#homeBtn").hide();
        $("div[title*='Dashboard']").show();
        $("div[title*='Members']").show();
        $("div[title*='Promotions']").show();
        $("div[title*='Redeem']").show();
        $("div[title*='Messages']").hide();
        $("div[title*='Medical']").hide();
        $("div[title*='CarePlan']").hide();
        $("div[title*='Case_Work']").hide();
        $("div[title*='CareTeam']").hide();
        $("div[title*='Config']").hide();
        $("div[title*='Admin']").hide();
    }
    if (lstatus == 9) {
        $("#hotlineBtn").hide();
        $("#workTimeBtn").hide();
        $("#homeBtn").hide();
        $("div[title*='Dashboard']").show();
        $("div[title*='Members']").show()
        $("div[title*='Promotions']").show();
        $("div[title*='Redeem']").show();
        $("div[title*='Medical']").hide();
        $("div[title*='CarePlan']").hide();
        $("div[title*='Case_Work']").hide();
        $("div[title*='CareTeam']").hide();
        $("div[title*='Config']").hide();
        $("div[title*='Admin']").show();
    }

    btnAction(navPath);

    //BOOTSTRAP # Modal refresh hack
    $('#myModal').on('hidden.bs.modal', function () {
        //tracking on close for education events
        if (typeof myModalClosing !== 'undefined')myModalClosing();
        $('#myModal').removeData('bs.modal');
        $('#myModal>.modal-dialog>.modal-content').empty();
        $('#myModal>.modal-dialog').width(550);//reset
        if (loadMainFlag) {
            loadMainFlag = false;
            loadMain();
        }
    });

    $('#myUploadModal').on('hidden.bs.modal', function () {
        $('#myUploadModal').removeData('bs.modal');
        $('#myUploadModal>.modal-dialog>.modal-content').empty();
        $('#myUploadModal>.modal-dialog').width(550);//reset
        if (loadMainFlag) {
            loadMainFlag = false;
            loadMain();
        };
    });

    $('.selMember').on('click', function () {
        var eid = $(this).attr("id");
        var entid = $(this).attr("entid");
        $.ajax({
            type: "POST",
            url: "/config/patients/recent",
            data: {ptid: eid,entid: entid},
            success: function (r) {
                window.location.reload();
            }
        });
        return false;
    });

    $(window).resize(function () {
        if (this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function () {
            $(this).trigger('resizeEnd');
        }, 500);
    });

    $(window).bind('resizeEnd', function () {

        var trim = $("#header").height() + $("#footer").height() + 30;
        var wrapperHt = $(window).height() - trim;
        $('#wrapper').height(wrapperHt);
        $("#overlay").width($('#wrapper').width());
        $("#overlay").height(wrapperHt);

        if (navPath == "patients") {
            $(".gridFrame").height(wrapperHt - 110);
            grid_localResize();
        }
        if (navPath == "members") {
            $(".gridFrame").height(wrapperHt - 90);
            grid_localResize();
        }
        if (navPath == "promotions") {
            $(".gridFrame").height(wrapperHt - 150);
            grid_localResize();
        }
        if (navPath == "redeem") {
            $(".gridFrame").height(wrapperHt - 90);
            grid_localResize();
        }

        if (navPath == "reports") {
            $(".gridFrame").height(wrapperHt - 100);
            grid_localResize();
        }

        if (navPath == "config") {
            $(".gridFrame").height(wrapperHt - 150);
            grid_localResize();
        }

        if (navPath == "admin") {
            $(".gridFrame").height(wrapperHt - 150);
            grid_localResize();
        }

        if (navPath == "dashboard") {
            //$(".gridFrame").height(wrapperHt - 10);
        }

        if (navPath == "casework") {
            $(".gridFrame").height(wrapperHt - 360-140);
            grid_localResize();
        }
        if (navPath == "messages") {
            $("#messagesCont").height(wrapperHt - 95);
            $("#myGrid1").height(wrapperHt - 330);
            $("#myGrid2").height(wrapperHt - 330);
            $("#myGrid3").height(wrapperHt - 330);
            if (typeof message_localResize !== 'undefined')message_localResize();
        }
        if (navPath == "careteam") {
            $("#cy").height(wrapperHt - 100);

        }

        if (ovPath == "settings") {
            $(".settings_gridFrame").height(wrapperHt - 95);
        }

        if (ovPath == "fav_macros") {
            macro_grid_localResize();
        }
        if (ovPath == "messages") {
            $("#messagesCont").height(wrapperHt - 105);
            $("#myGrid1").height(wrapperHt - 340);
            $("#myGrid2").height(wrapperHt - 340);
            $("#myGrid3").height(wrapperHt - 340);
            if (typeof message_localResize !== 'undefined')message_localResize();
        }
        if (ovPath == "calls") {
            $("#messagesCont").height(wrapperHt - 80);
            if (typeof calls_localResize !== 'undefined')calls_localResize();
        }
        if (ovPath == "paysimple") {
            $(".settingsCont").height(wrapperHt - 80);
        }
    });

    //button methods

    $("#homeBtn").click(function (e) {
        $.ajax({
            type: "POST",
            url: "/config/patients/recent",
            data: {ptid: "<? echo $_SESSION['loginMember']['memberid']; ?>"},
            success: function (r) {
                window.location.assign("/home/<? echo $_SESSION['loginMember']['memberid']; ?>/dashboard");
            }
        });
        return false;
    });

    $('.mNav').click(function () {
        btnAction($(this).attr('id'));
    });


    $("#emailBtn").click(function (e) {
        if (lstatus < 1) return;
        ovPath = "messages";
        loadOverlay();
        e.preventDefault();//stop bubble up whch will hide the dialog
        e.stopPropagation();
    });

    $("#rewardBtn").click(function (e) {
        if (lstatus < 5) return;
        $('#myModal').modal({
            show: true,
            backdrop: false,
            remote: '/promotions/rewardForm'
        });

        return false;
    });
    $("#redeemBtn").click(function (e) {
        if (lstatus < 5) return;
        $('#myModal').modal({
            show: true,
            backdrop: false,
            remote: '/redeem/redeemForm'
        });

        return false;
    });

    $("#hotlineBtn").click(function (e) {
        showPhone('','');
    });

    $("#workTimeBtn").click(function (e) {
        //callback to get selected patient info place in form
        showWorkPopup({ptid:""});
        e.preventDefault();//stop bubble up which will hide the dialog
        e.stopPropagation();
    });

    $("#chatBtn").click(function (e) {
        //callback to get selected patient info place in form
        showChatPopup();
        e.preventDefault();//stop bubble up which will hide the dialog
        e.stopPropagation();
    });




    if (lstatus < 6) $("#workTimeBtn").hide();

    $("body").click(function (e) {  //hide on any outside click
        if ($("#memberListSearch").is(':visible')) {

            if (!$(e.target).is(".selMember")) {
                $("#memberListSearch").hide();
                e.preventDefault();//stop bubble up whch will hide the dialog
                e.stopPropagation();
            }
        }
    });

    //fired by browser history api only supports back/fwd nav within page
    addEventListener('popstate', function (evt) {
        if (evt.state) {
            popState = true;
            if(evt.state.uri=="/home/<? echo $_SESSION['selectedMember']['memberid'] ?>/") //same pt diff module
            {
                btnAction(evt.state.button_id);
            }
            else  //change patient assume home and reset to default landing page
            {
                $.ajax({
                    type: "POST",
                    url: "/config/patients/recent",
                    data: {ptid: evt.state.memberid},
                    success: function (r) {
                        window.location.reload();
                    }
                });
            }
        }
        else  //if go back beyond page location change state is null
        {
            //window.location.reload();
        }

    });

    if (showpay == '1')showPay();
});//end load

window.onbeforeunload = function () {
    if(typeof(phoneWindow) != 'undefined' && !phoneWindow.closed)
    {
        //phoneWindow.close(); need to filter for patient load
    }
    if(typeof(videoChatWindow) != 'undefined' && !videoChatWindow.closed)
    {
        videoChatWindow.close();
    }
}

function pullChart(eid)
{
 var entid = '<? echo $_SESSION["loginMember"]["memberid"] ?>';
    $.ajax({
     type: "POST",
     url: "/config/patients/recent",
     data: {ptid: eid,entid: entid},
     success: function (r) {
         window.location.reload();
     }
    });
}

function showChatPopup()
{
       $("#chatWin").load("/chat/chatview",function(){$("#chatWin").animate({right: "0px"}, 400)});
}

function showWorkPopup(data)
{
    var pstr = $.param( data );
    $("#workTimeDiv").show();
    $("#workTimeDiv").load("/casework/taskForm?"+pstr);
}

function showPhone(callSid,lmid)
{
    if(typeof(phoneWindow) == 'undefined' || phoneWindow.closed){
        //create new
        phoneWindow=open("/contacts/showphone?lmid=" + lmid + "&callSid="+callSid, "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, top=100, left=100, width=300, height=540");
    } else {
        //it exists, load new content (if necs.)
        phoneWindow.location.href = "/contacts/showphone?lmid=" + lmid + "&callSid="+callSid;
        //give it focus (in case it got burried)
        phoneWindow.focus();
    }
}
function showPhoneCalling(ptid)
{
    if(typeof(phoneWindow) == 'undefined' || phoneWindow.closed){
        //create new
        phoneWindow=open("/contacts/showphonecalling?ptid=" + ptid, "_blank", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no, top=100, left=100, width=300, height=540");

    } else {
        //it exists, load new content (if necs.)
        phoneWindow.location.href = "/contacts/howphonecalling?ptid=" + ptid;
        //give it focus (in case it got burried)
        phoneWindow.focus();
    }
}

function showPay() {
    //$('#loading-indicator').show();
    //ovPath = "paysimple";
    //loadOverlay();
   // $('#loading-indicator').hide();
}

function btnAction(cnav) {
    console.log("btnActionv " + cnav);
    //clear last button
    var ctitle = $('#' + navPath).attr('title');
    var cimg = "img_" + ctitle;
    $('.' + cimg + '_white').toggleClass(cimg + '_white' + ' ' + cimg)

    ctitle = $('#' + cnav).attr('title');
    cimg = "img_" + ctitle;
    $('.itext_white').toggleClass('itext_white itext_grey');
    $('.tgbl_blue').toggleClass('tgbl_blue tgbl_grey');

    $("#" + cnav).toggleClass('tgbl_grey tgbl_blue');
    $("#" + cnav).children(':last').toggleClass('itext_grey itext_white');
    $("#" + cnav).children(':first').toggleClass(cimg + ' ' + cimg + '_white');
    navPath = cnav;
    tl_loadedPage = "/" + navPath;
    loadMain();
}

function loadMain() {
    if (ustatus >= 6) {
        $('#userRole').css({
            'color': '#FF9933'
        });
        $('#memberButton').css({
            'background-color': '#FF9933',
            'border-color': '#FFB366',
            'color': '#FFFFFF'
        });
    }
    console.log("loadmain w " + tl_loadedPage);

   $("#outer2").load(tl_loadedPage, function () {
        var bhref = "/home/<? echo $_SESSION['selectedMember']['memberid'] ?>/"+ navPath;
        var actionID = {
            memberid: "<? echo $_SESSION['selectedMember']['memberid'] ?>",
            uri: "/home/<? echo $_SESSION['selectedMember']['memberid'] ?>/",
            button_id: navPath
        };

       if (!popState) {
            history.pushState(actionID, '', bhref);
           console.log("pushed " + bhref);
        }
        if (popState) {
            popState = false;
        }

        $(window).resize();
    });
}

function loadOverlay() {
    //slide  and load overlay
    $("#overlayCont").load("/" + ovPath, function () {
        $(window).resize();
        $("#overlay").show();
        $("#overlay").animate({
            'margin-top': '80px'
        }, 500, function () {
            if (typeof animateDone !== 'undefined') animateDone(ovPath);
        });
    });
}

function hideOverlay() {
    $("#overlay").hide();
    $("#overlay").css("margin-top", "200px");
    $("#overlayCont").empty();
}

function referInvite() {
    //$("#predixWin").show();

    $('#myModal').modal({
        show: true,
        backdrop: false,
        remote: '/config/provider/invite'
    });

    return false;
}

function printContract() {
    var iuri = "/onboard/ptAgmt_Printer?eid=0";
    var myRef = window.open(iuri, '_blank', 'left=100,top=100,width=1100,height=700,toolbar=0,resizable=1,scrollbars=1');
    return false;
}


function showHelp() {
    $('#myModal').modal({
        show: true,
        backdrop: false,
        remote: '/help'
    });
    return false;
}

function hideRight() {
    $("#outer3").animate({
        width: 0
    }, 1000);
}
function showRight() {
    $("#outer3").animate({
        width: 240
    }, 1000);
}

//comfirm dialog handle
function _confirm(options) {
    if (!options) {
        options = {};
    }

    var show = function (el, text) {
        if (text) {
            el.html(text);
            el.show();
        } else {
            el.hide();
        }
    }

    var url = options.url ? options.url : '';
    var data = options.data ? options.data : '';
    var ok = options.ok ? options.ok : 'Ok';
    var cancel = options.cancel ? options.cancel : 'Cancel';
    var title = options.title
    var text = options.text;
    var dialog = $('#confirm-dialog');
    var header = dialog.find('.modal-header');
    var footer = dialog.find('.modal-footer');
    var hide_ok = options.hide_ok ? options.hide_ok : false;

    show(dialog.find('.modal-body'), text);
    show(dialog.find('.modal-header h4'), title);
    footer.find('.btn-danger').unbind('click').html(ok);
    footer.find('.btn-cancel').unbind('click').html(cancel);
    dialog.modal({backdrop: false});
    dialog.modal('show');
    footer.find('.btn-danger').show();
    if(hide_ok) footer.find('.btn-danger').hide();

    var $deferred = $.Deferred();
    var is_done = false;
    footer.find('.btn-danger').on('click', function (e) {
        is_done = true;
        dialog.modal('hide');
        if (url) {
            $.ajax({
                url: url,
                type: 'GET'
            }).done(function (result) {
                $deferred.resolve(result);
            }).fail(function () {
                $deferred.reject();
            });
        } else {
            $deferred.resolve();
        }
    });
    dialog.on('hide', function () {
        if (!is_done) {
            $deferred.reject();
        }
    })

    return $deferred.promise();
}

function chatGrowl(msg, from) {
    $.bootstrapGrowl(from + " - " + msg, {
        delay: 4000,
        allow_dismiss: true,
        type: 'info',
        align: 'left',
        offset: {from: 'bottom', amount: 20},
        width: 280
    });
}
function errorGrowl(msg, from) {
    $.bootstrapGrowl(from + " - " + msg, {
        delay: 5000,
        allow_dismiss: true,
        type: 'warning',
        align: 'right',
        offset: {from: 'top', amount: 20},
        width: 280
    });
}

function logout()
{
    top.location.href='/login';
}

function videochat_join(eid,sid)
{
    //open new window
    var ru="/tok_join/" + sid +"?eid="+eid;
    window.open(ru, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=640, height=480");
}

function showWebinarForm() {
    $('#myModal').modal('hide');
    setTimeout(function(){
        $('#myModal').modal({
            show: true,
            backdrop: false,
            remote: "/config/webinar/newForm"
        });
    }, 400);
    return false;
}

(function ($) {

    $.fn.watchChanges = function () {
        return this.each(function () {
            $.data(this, 'formHash', $(this).serialize());
        });
    };

    $.fn.hasChanged = function () {
        var hasChanged = false;

        this.each(function () {
            var formHash = $.data(this, 'formHash');

            if (formHash != null && formHash !== $(this).serialize()) {
                hasChanged = true;
                return false;
            }
        });

        return hasChanged;
    };

}).call(this, jQuery);