/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js" />

$(document).ready(function () {

   
    $('.modal-content').draggable({ handle: '.modal-header' });

    $('.dismissall').on('click', function () {
        $('.modal').modal('hide');
    });


    hideLeftMenu = function (comingFromMenuClick) {
        var wrapper = $("#wrapper");
        var left_sidepanel = $("#left_sidepanel");
        if (comingFromMenuClick) {
            wrapper.addClass("full_wrapper");
            left_sidepanel.addClass("aside_close");
        }
        else {
            wrapper.toggleClass("full_wrapper");
            left_sidepanel.toggleClass("aside_close");
            left_sidepanel.removeClass("full_aside");
        }
    }

    $('#hideMenuBtn').click(function () {
        hideLeftMenu();
    });

    $('#leftaside_toggle').click(function () {
        //..debugger;
        $("#left_sidepanel").toggleClass("full_aside");
        $("#left_sidepanel #leftaside_toggle").toggleClass("rotate180");
        $(".panel-footer").toggleClass("display_block");
        jQuery(window).bind('resize', function () {

            // Get width of parent container
            var targetContainer = $('#grid_container');
            var targetGrid = $('#ClinicsDetailsGrid');
            var width = jQuery(targetContainer).attr('clientWidth');
            if (width == null || width < 1) {
                // For IE, revert to offsetWidth if necessary
                width = jQuery(targetContainer).attr('offsetWidth');
            }
            width = width - 2; // Fudge factor to prevent horizontal scrollbars

            if (width > 0 &&
                // Only resize if new width exceeds a minimal threshold
                // Fixes IE issue with in-place resizing when mousing-over frame bars

                Math.abs(width - jQuery(targetGrid).width()) > 5) {
                jQuery(targetGrid).setGridWidth(width);
            }

        }).trigger('resize');
    });

    $('.right-sidebar-toggle').on('click', function (e) {
        setTimeout(function () {
            $('#right-sidebar').toggleClass('sidebar-open');
        }, 200);
        
        e.preventDefault();
        //var pk = $('#right-sidebar');
        //if (!pk.hasClass('sidebar-open')) {
        //    pk.addClass('sidebar-open');
        //}
        //else {
        //    pk.removeClass('sidebar-open');
        //}
    });

    $('.animate-panel').animatePanel();


    
   
    
});

$('#Book_Appointment').click(function () {
        debugger;
        $('#newpatient_model').modal('hide');

    })

$.fn['animatePanel'] = function () {
    var element = $(this);
    var effect = $(this).data('effect');
    var delay = $(this).data('delay');
    var child = $(this).data('child');

    if (!effect) {
        effect = 'zoomIn'
    }
    if (!delay) {
        delay = 0.01
    } else {
        delay = delay / 10
    }
    if (!child) {
        child = '.row > div'
    } else {
        child = "." + child
    }

    //if (window.loadPage == 'Current-Activity-Home') {
    //    delay = 0.01;
    //}

    var startAnimation = 0;
    var start = Math.abs(delay) + startAnimation;

    var panel = element.find(child);
    panel.addClass('opacity-0');
    
    panel = element.find(child);
    panel.addClass('stagger').addClass('animated-panel').addClass(effect);

    var panelsCount = panel.length + 20;
    var animateTime = (panelsCount * delay * 10000) / 10;
    
    panel.each(function (i, elm) {
        start += delay;
        var rounded = Math.round(start * 10) / 10;
        $(elm).css('animation-delay', rounded + 's');

        $(elm).removeClass('opacity-0');
    });

    setTimeout(function () {
        $('.stagger').css('animation', '');
        $('.stagger').removeClass(effect).removeClass('animated-panel').removeClass('stagger');
    }, animateTime)

};

hideSecondLeftMenu = function () {
    $('#secondLeftMenu')[0].style.display = 'none';
    $('#calendarPanel')[0].className = 'col-md-12';
},

$('#hideSecondLeftMenu').click(function () {
    hideSecondLeftMenu();
});


setSubMenuHrefActiveClass = function (id) {

    var links = $('.subMenuActive').find('li');
    for (var i = 0; i < links.length; i++) {
        var el = links[i].childNodes[0];
        if (id != el.getAttribute('id')) {
            el.classList.remove("active");
        } else {
            el.classList.add('active');
        }
    }
};

isiPadBrowser = function () {
    // device detection
    var isiPadBrowser = false;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
				|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        isiPadBrowser = true;
    }
    return isiPadBrowser;
};
setMenuForLink = function (firstList, secondList) {
    var activeTab = $(document.getElementsByClassName('nav nav-tabs'));
    var activeTabEl = $(activeTab[0]).find('.active').text();
    if (activeTabEl == 'Patient Search') {
        var subMenu = $('.subMenuActive li');
        for (var i = 0; i < subMenu.length; i++) {
            if (subMenu[i].getAttribute('name') != 'patientSearch') {
                subMenu[i].style.display = 'none';
            }
            if (subMenu[i].getAttribute('showforDifferent') == 'patientSearch') {
                subMenu[i].style.display = 'block';
            }
        }
    }
    else {
        var clinicItems = document.getElementsByName("clinicsItems");
        for (var i = 0; i < clinicItems.length; i++) {
            clinicItems[i].style.display = firstList;
        }
        var items = document.getElementsByName("theatresItems");
        for (var i = 0; i < items.length; i++) {
            items[i].style.display = secondList;
        }
        var fadeDiv = $('.modal-backdrop');
        for (var d = 0; d < fadeDiv.length; d++) {
            if (fadeDiv[d]) {
                fadeDiv[d].style.position = "relative";
            }
        }
    }

};

onHrefClick = function (el) {
    var subMenu = $('.subMenuActive li');
    for (var i = 0; i < subMenu.length; i++) {
        subMenu[i].style.display = 'block';
    }
    $("#hideSecondLeftMenu").css('display', 'block');
    var activeTab = $(document.getElementsByClassName('nav nav-tabs'));
    var activeTabName = $(activeTab.find('.active')[1]).text();/*Looking first element because my patient is on zero index*/
    if (activeTabName == 'Theatres' || activeTabName == 'Admissions') {
        setMenuForLink('none', 'block');
    } else if (activeTabName == 'Clinics') {
        setMenuForLink('block', 'none');
        if (el.getAttribute != undefined && el.getAttribute('openSideMenu')) {
            $('#secondLeftMenu')[0].style.display = 'block';
            $('#calendarPanel')[0].className = 'col-lg-10 col-md-9 col-sm-8';
        }
    }
    if (el[0] && el[0].getAttribute('openConsultantMenu')) {
        setMenuForLink('none', 'none');
        var consultantProfile = document.getElementsByName("consultantProfile");
        for (var i = 0; i < consultantProfile.length; i++) {
            $("#hideSecondLeftMenu").css('display', 'none');
            consultantProfile[i].style.display = el[0].getAttribute('openConsultantMenu') ? 'block' : 'none';
        }
        var otherMenuItem = document.getElementsByName("otherMenuItem");
        for (var i = 0; i < otherMenuItem.length; i++) {
            otherMenuItem[i].style.display = 'none';
        }
        var subMenu = $('.subMenuActive li');
        for (var i = 0; i < subMenu.length; i++) {
            if (subMenu[i].getAttribute('name') == 'patientSearch') {
                subMenu[i].style.display = 'none';
            }
        }
    }
    if (el.id) {
        var page = el.id;
        var mainContaint = $('#calendarPanel');
        window.loadPage = page;
        mainContaint.load(page + ".html");
        setTimeout(function () {
            $('.animate-panel').animatePanel();
        }, 100);

    } else {
       
        var page = el.attr('id');
        this.page = page;
        window.loadPage = this.page;
        var mainContaint = $('#calendarPanel');
        mainContaint.load(page + ".html");
        var rigthSideBar = $('#right-sidebar')[0];
        rigthSideBar.className = el.attr('sidebarmenuhide') == "true" ? $('#right-sidebar').removeClass('sidebar-open') : $('#right-sidebar').addClass('sidebar-open');
        var hideSecondLeftMenu = el.attr('hideSecondLeftMenu');

        el.attr('sidebarmenuhide') == "true" ? hideLeftMenu(true) : '';
        if (el.attr('secondLeftMenu')) {
            var wrapper = $("#wrapper");
            var left_sidepanel = $("#left_sidepanel");
            left_sidepanel.removeClass("aside_close");
            wrapper.removeClass("full_wrapper");
        }
        $('#secondLeftMenu')[0].style.display = el.attr('sidebarmenuhide') == "true" ? 'none' : 'block';
        var colCls = el.attr('sidebarmenuhide') == "true" ? 'col-md-12' : 'col-lg-10 col-md-9 col-sm-8';


        $('#calendarPanel')[0].className = colCls;
        setTimeout(function () {

            $('.animate-panel').animatePanel();

        }, 100, this);
        setSubMenuHrefActiveClass(page);

        if (hideSecondLeftMenu) {
            $('#secondLeftMenu')[0].style.display = 'none';
            $('#calendarPanel')[0].className = 'col-md-12';
        }
    }
    
    if (isiPadBrowser()) {
        hideLeftMenu(true);
    }
    subMenuHrefClick(el);
};

subMenuHrefClick = function (parentScope) {
    var pk = $("#left_sidepanel");
    pk.removeClass('full_aside');
    $('#appointmentOn')[0].style.display = 'none';

    var scope = parentScope[0] || parentScope;
    var appointmentOn = $('#appointmentOn')[0];
    $('#consultant_profile')[0].style.display = 'none';
    $('#profile')[0].style.display = 'block';
    if (scope.getAttribute('comingfromvisit')) {
        appointmentOn.style.display = 'block';
    }
    else {
        appointmentOn.style.display = 'none';
    }
    if (scope.getAttribute('openConsultantMenu')) {
        hideLeftMenu(true);
        $('#consultant_profile')[0].style.display = 'block';
        $('#profile')[0].style.display = 'none';
    }
    var consultantProfile = document.getElementsByName("consultantProfile");
    for (var i = 0; i < consultantProfile.length; i++) {
        consultantProfile[i].style.display = scope.getAttribute('openConsultantMenu') ? 'block' : 'none';
    }
    setTimeout(function () {
        setWindowScroll();
    }, 1000);
};

$('a.subMenuHref').click(function () {
    onHrefClick($(this));
});

setWindowScroll = function () {
    var height = window.innerHeight - $('.content_toolbar').height() - $(document.getElementsByTagName('header')).height() - $(document.getElementsByTagName('footer')).height() - 35;
    var scroll_outer = $('.scroll_outer')[0];
    if (scroll_outer) {
        scroll_outer.style.height = height + 'px';
    }


    var secondLeftMenuHeight = window.innerHeight - $(document.getElementsByTagName('header')).height() - $(document.getElementsByTagName('footer')).height();
    var menu_bg = $('.menu_bg')[0];
    if (menu_bg) {
        menu_bg.style.height = secondLeftMenuHeight + 'px';
    }

    var calendarPanelHeight = window.innerHeight - $(document.getElementsByTagName('header')).height() - $(document.getElementsByTagName('footer')).height() - 50;
    var calendarPanel = $('#calendarPanel')[0];
    if (calendarPanel) {
        // calendarPanel.style.height = calendarPanelHeight + 'px';
    }

};
$(window).resize(function () {
    setWindowScroll();
});




