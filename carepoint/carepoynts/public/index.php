<?php

require '../vendor/autoload.php';

$app = new \Slim\Slim(array(
    'debug' => true,
    'templates.path' => '../app/rewards/views'
));
// for logging
require_once '../app/app-logger.php';


//PUBLIC ROUTES
$app->get('/', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/rewards_login.php';
});

$app->get('/signup/:eid', function ($eid) use ($app) {
    $type = "signupstart_dialog";
    require_once '../app/rewards/controllers/rewards_home.php';
});
$app->get('/signupStart', function () use ($app) {
    $type = "signupStart";
    require_once '../app/rewards/controllers/rewards_home.php';
});
$app->get('/signupConfirm', function () use ($app) {
    $type = "signupConfirm";
    require_once '../app/rewards/controllers/rewards_home.php';
});


$app->get('/engage/signup/:eid', function ($eid) use ($app) {
    $type = "signupstart_dialog";
    require_once '../app/engage/controllers/engage_home.php';
});
$app->get('/engage/signupConfirm', function () use ($app) {
    $type = "signupConfirm";
    require_once '../app/engage/controllers/engage_home.php';
});
$app->get('/engage/signupStart', function () use ($app) {
    $type = "signupStart";
    require_once '../app/engage/controllers/engage_home.php';
});


$app->get('/newMember/:eid', function ($eid) use ($app) {
    $type = "newMember_dialog";
    require_once '../app/rewards/controllers/rewards_home.php';
});

$app->get('/activate/:eid', function ($eid) use ($app) {
    $type = "activate_dialog";
    require_once '../app/rewards/controllers/rewards_home.php';
});

$app->map('/refer/:rc', function ($rc) use ($app) {    
    $_REQUEST['rc']=$rc;
    require_once '../app/rewards/controllers/refer-friend-controller.php';
})->via('GET', 'POST');



$app->get('/onboard/:type', function ($type) use ($app) {
    $type = "onboard/" . $type;
    require_once '../app/rewards/controllers/app/onboard.php';
});

$app->post('/onboard/:type', function ($type) use ($app) {
    $type = "onboard/" . $type;
    require_once '../app/rewards/controllers/app/onboard.php';
});


$app->get('/engage/onboard/:type', function ($type) use ($app) {
    $type = "onboard/" . $type;
    require_once '../app/engage/controllers/app/onboard.php';
});
$app->post('/engage/onboard/:type', function ($type) use ($app) {
    $type = "onboard/" . $type;
    require_once '../app/engage/controllers/app/onboard.php';
});


$app->get('/bfqueue/:type', function ($type) use ($app) {
    $type = "bfqueue/" . $type;
    require_once '../app/rewards/controllers/app/bfqueue.php';
});
$app->post('/bfqueue/:type', function ($type) use ($app) {
    $type = "bfqueue/" . $type;
    require_once '../app/rewards/controllers/app/bfqueue.php';
});

$app->get('/logout', function () use ($app) {
    $type = "logout";
    require_once '../app/rewards/controllers/rewards_login.php';
});
$app->get('/engage/logout', function () use ($app) {
    $type = "logout";
    require_once '../app/engage/controllers/engage_login.php';
})->name('/engage/logout');

$app->get('/login', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/rewards_login.php';
});
$app->get('/engage/login', function () use ($app) {
    $type = "init";
    require_once '../app/engage/controllers/engage_login.php';
});

$app->get('/loginSel/:adoptionid', function ($adoptionid) use ($app) {
    $type = "loginSel";
    require_once '../app/rewards/controllers/rewards_login.php';
});
$app->get('/engage/loginSel/:entid', function ($entid) use ($app) {
    $type = "loginSel";
    require_once '../app/engage/controllers/engage_login.php';
});

$app->get('/loginList', function () use ($app) {
    $type = "loginList";
    require_once '../app/rewards/controllers/rewards_login.php';
});
$app->get('/engage/loginList', function () use ($app) {
    $type = "loginList";
    require_once '../app/engage/controllers/engage_login.php';
});

$app->get('/login/forgot', function () use ($app) {
    $type = "forgot";
    require_once '../app/rewards/controllers/rewards_login.php';
});
$app->get('/engage/login/forgot', function () use ($app) {
    $type = "forgot";
    require_once '../app/engage/controllers/engage_login.php';
});

$app->post('/login', function () use ($app) {
    $type = "initPost";
    require_once '../app/rewards/controllers/rewards_login.php';
});
$app->get('/:varname/login', function ($varname) use ($app) {
    $type = "initVar";
    require_once '../app/rewards/controllers/rewards_login.php';
});
$app->post('/:varname/login', function ($varname) use ($app) {
    $type = "initVar";
    require_once '../app/rewards/controllers/rewards_login.php';
});


$app->post('/engage/login', function () use ($app) {
    $type = "initPost";
    require_once '../app/engage/controllers/engage_login.php';
});
$app->post('/:varname/engage/login', function ($varname) use ($app) {
    $type = "initVar";
    require_once '../app/engage/controllers/engage_login.php';
});


$app->post('/login/forgot/creds', function () use ($app) {
    $type = "creds";
    require_once '../app/rewards/controllers/rewards_login.php';
});




//mobile routes for login/forgot password/reset password/signup

//shows the forgotCredentials form

$app->get('/joyn', function () use ($app) {
    $type = "mobileSignupTemp";
    require_once '../app/rewards/controllers/app/onboard.php';
});

$app->get('/onboard/mobile/signup', function () use ($app) {
    $app->redirect('/joyn');
    // $type = "mobileSignup";
    // require_once '../app/rewards/controllers/app/onboard.php';
});

$app->post('/onboard/mobile/signup/send', function () use ($app) {
    $type = "mobileSendEmail";
    require_once '../app/rewards/controllers/app/onboard.php';
});


// $app->get('/login/mobile/forgot', function () use ($app) {
//     $type = "mobileForgot";
//     require_once '../app/rewards/controllers/rewards_login.php';
// });

// //on submit send post data to send to the email
// $app->post('/login/mobile/forgot/creds', function () use ($app) {
//     $type = "mobileCreds";
//     require_once '../app/rewards/controllers/rewards_login.php';
// });



//clicked on link, so send them to the page with the form to enter in new password
// $app->get('/login/mobile/forgot/resetPassword', function () use ($app) {
//     $type = "mobileResetPassword";
//     require_once '../app/rewards/controllers/rewards_login.php';
// });



// $app->post('/login/mobile/forgot/submitNewPassword', function () use ($app) {
//     $type = "mobileNewPassword";
//     require_once '../app/rewards/controllers/rewards_login.php';
// });


// // if reset successful sent to this page
// $app->post('/login/mobile/forgot/resetSuccessful', function () use ($app) {
//     $type = "resetSuccessful";
//     require_once '../app/rewards/controllers/rewards_login.php';
// });






$app->get('/boxOauth', function () use ($app) {
    $type = "boxOauth";
    require_once '../app/rewards/controllers/rewards_login.php';
});

// member app login
$app->group('/cp/m', function () use ($app) {
    $app->get('/', function () use ($app) {
        $app->response()->redirect('/login');
    });
});

$app->get('/cp/member/dashboard', function () use ($app) {
    $app->response()->redirect('/cp/member-app-ui/index.html');
});


$app->get('/tok/:sessionName', function ($sessionName) use ($app) {
    $type = "start";
    require_once '../app/rewards/controllers/app/tokbox.php';
});
$app->get('/tok_join/:sessionId', function ($sessionId) use ($app) {
    $type = "join";
    require_once '../app/rewards/controllers/app/tokbox.php';
});

$app->get('/updoxTest/send', function () use ($app) {
    require_once '../lib/updoxMail.php';
    echo sendDirectMail(array("drtom@resmed.kareodirect.com"), "subject", "body text");//drtom@resmed.kareodirect.com,outbox@carecliques.direct.updoxqa.com
});
$app->get('/updoxTest/getList', function () use ($app) {
    require_once '../lib/updoxMail.php';
    var_dump(getDirectMailList("I","false"));//drtom@resmed.kareodirect.com,outbox@carecliques.direct.updoxqa.com
});
$app->get('/updoxTest/getItem/:id', function ($id) use ($app) {
    require_once '../lib/updoxMail.php';
    var_dump(getDirectMailItem($id));//drtom@resmed.kareodirect.com,outbox@carecliques.direct.updoxqa.com
});

$app->group('/rewards/member', function () use ($app) {

    $app->get('/dashboard', function () use ($app) {
        $type = "/rewards/member/dashboard";
        $app->response()->redirect('/cp/member-app-ui/index.html');
    })->name('member/dashboard');

});

//APP ROUTES- AUTHENTICATED & SECURE

$app->get('/dashboard', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/dashboard.php';
});
$app->get('/dashboard/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/dashboard.php';
});

$app->get('/core/remote', function () use ($app) {
    $app->redirect('http://www.readmissionscore.org/');
});

$app->get('/core/:type/:module', function ($type, $module) use ($app) {
    require_once '../app/rewards/controllers/app/core.php';
});

$app->post('/core/:type/:module', function ($type, $module) use ($app) {
    require_once '../app/rewards/controllers/app/core.php';
});

$app->get('/boost/:type', function ($type) use ($app) {
    $type = "/boost/" . $type;
    require_once '../app/rewards/controllers/app/boost.php';
});
$app->get('/adlK/:type', function ($type) use ($app) {
    $type = "/adlK/" . $type;
    require_once '../app/rewards/controllers/app/boost.php';
});

$app->get('/home/:memberid/:module', function ($memberid, $module) use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/home.php';
});


$app->get('/home/memberlist/:search', function ($search) use ($app) {
    $type = "search";
    require_once '../app/rewards/controllers/app/home.php';
});

$app->get('/casework', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/casework.php';
});
$app->post('/casework/:type', function ($type) use ($app) {
    $type = "post/" . $type;
    require_once '../app/rewards/controllers/app/casework.php';
});

$app->get('/casework/:type', function ($type) use ($app) {
    $type = "get/" . $type;
    require_once '../app/rewards/controllers/app/casework.php';
});
$app->get('/casework/:type/:id', function ($type, $id) use ($app) {
    $type = "get/" . $type;
    require_once '../app/rewards/controllers/app/casework.php';
});

$app->get('/caseinfo', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/caseinfo.php';
});
$app->post('/caseinfo/:type', function ($type) use ($app) {
    $type = "post/" . $type;
    require_once '../app/rewards/controllers/app/caseinfo.php';
});

$app->get('/caseinfo/:type', function ($type) use ($app) {
    $type = "get/" . $type;
    require_once '../app/rewards/controllers/app/caseinfo.php';
});


$app->get('/timeline', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/timeline.php';
});

$app->get('/timeline/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/timeline.php';
});

$app->get('/timeline/education/viewer/:eid', function ($eid) use ($app) {
    $type = "education/viewer";
    require_once '../app/rewards/controllers/app/timeline.php';
});

$app->get('/timeline/tracking/:eid', function ($eid) use ($app) {
    $type = "timeline/tracking";
    require_once '../app/rewards/controllers/app/timeline.php';
});


$app->get('/calendar', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/calendar.php';
});

$app->get('/carePlan', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/carePlan.php';
});

$app->get('/patients', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/patients.php';
});

$app->get('/members', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/cp_members.php';
});


$app->get('/reports', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/reports.php';
});

$app->get('/messages', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/messages.php';
});

$app->get('/promotions', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/promotions.php';
});
$app->get('/promotions/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/promotions.php';
});
$app->get('/promotions/:type/:id', function ($type,$id) use ($app) {
    require_once '../app/rewards/controllers/app/promotions.php';
});
$app->post('/promotions/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/promotions.php';
});

$app->get('/redeem', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/redemptions.php';
});
$app->get('/redeem/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/redemptions.php';
});
$app->get('/redeem/:type/:id', function ($type,$id) use ($app) {
    require_once '../app/rewards/controllers/app/redemptions.php';
});
$app->post('/redeem/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/redemptions.php';
});

//twilio call log is queried and displayed in messages feature:hotline
$app->get('/calls', function () use ($app) {
    $type = "init";
    require_once '../thirdParty/twilio.php';
});
$app->get('/calls/:type', function ($type) use ($app) {
    require_once '../thirdParty/twilio.php';
});
//

$app->get('/settings/:type/:id', function ($type, $id) use ($app) {
    require_once '../app/rewards/controllers/app/settings.php';
});

$app->post('/settings/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/settings.php';
});

$app->get('/settings', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/settings.php';
});

$app->get('/careteam', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/careteam.php';
});


$app->get('/fav_macros', function () use ($app) {
    $type = "fav_macros";
    require_once '../app/rewards/controllers/app/settings.php';
});


$app->get('/support', function () use ($app) {
    $app->redirect("https://support.zoho.com/portal/ccmregistry/home");
    //$tpl = new stdClass();
    //$app->render('support.tpl.html', get_object_vars($tpl));
});
$app->get('/help', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/help.php';
});

$app->post('/help/feedback', function () use ($app) {
    $type = "feedback";
    require_once '../app/rewards/controllers/app/help.php';
});

//hapi
$app->post('/hapi/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/hapi.php';
});

$app->get('/hapi/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/hapi.php';
});

//mobile

$app->get('/mobile/remoteToken/:token/:devid', function ($token, $devid) use ($app) {
    $type = "remoteToken";
    require_once '../app/rewards/controllers/app/mobile.php';
});

$app->post('/mobile/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/mobile.php';
});

$app->get('/mobile/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/mobile.php';
});

$app->get('/mobile/medAck/:medAckType/:med_id', function ($medAckType, $med_id) use ($app) {
    $type = "medAck";
    require_once '../app/rewards/controllers/app/mobile.php';
});

$app->get('/mobile/assets/photos/:oid', function ($oid) use ($app) {
    $type = "mobile/photos";
    require_once '../app/rewards/controllers/app/assets.php';
});

//calendar
$app->get('/calendar/getDates', function () use ($app) {
    $type = "getdates";
    require_once '../app/rewards/controllers/app/calendar.php';
});
$app->get('/calendar/getDate/:start/:end', function ($start, $end) use ($app) {
    $type = "getdate";
    require_once '../app/rewards/controllers/app/calendar.php';
});
//medical

$app->get('/medical', function () use ($app) {
    $type = "meds";
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->get('/medical/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/medical.php';;
});

$app->get('/medical/:type/:oid', function ($type, $oid) use ($app) {
    require_once '../app/rewards/controllers/app/medical.php';;
});

$app->get('/medical/druginfo/:cv/:cs', function ($cv, $cs) use ($app) {
    $type = "druginfo";
    require_once '../app/rewards/controllers/app/medical.php';;
});

$app->get('/medical/forms/upload/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/medical.php';
});

//get files for gallery and display
$app->get('/medical/file/:type/:oid', function ($type, $oid) use ($app) {
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->get('/medical/forms/link/:type', function ($type) use ($app) {
    $type = "formlink_" . $type;
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->post('/medical/forms/link/:type', function ($type) use ($app) {
    $type = "postformlink_" . $type;
    require_once '../app/rewards/controllers/app/medical.php';
});
//callback to upload selected files
$app->get('/medical/upload/:type/:oid', function ($type, $oid) use ($app) {
    require_once '../app/rewards/controllers/app/medical.php';
});


//prob
$app->get('/medical/forms/prob/:type', function ($type) use ($app) {
    $type = "forms/prob/" . $type;
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->get('/medical/forms/probedit/:pid', function ($pid) use ($app) {
    $type = "forms/probedit";
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->post('/medical/forms/prob/:type', function ($type) use ($app) {
    $type = "forms/prob/" . $type;
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->get('/medical/probname/search/:name', function ($name) use ($app) {
    $type = "probname/search";
    require_once '../app/rewards/controllers/app/medical.php';
});


//med forms
$app->get('/rxReminders/:rxrStatus', function ($rxrStatus) use ($app) {
    $type = "rxReminders";
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->post('/medical/boost/:type', function ($type) use ($app) {
    $type = "boost/" . $type;
    require_once '../app/rewards/controllers/app/boost.php';
});

$app->post('/medical/forms/med/:type', function ($type) use ($app) {
    $type = "medform_post" . $type;
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->post('/medical/forms/med/del/:oid', function ($oid) use ($app) {
    $type = "medform_del";
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->get('/medical/forms/med/:type', function ($type) use ($app) {
    $type = "medform_" . $type;
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->get('/medical/forms/medDSF/:oid', function ($oid) use ($app) {
    $type = "get_medDSF";
    require_once '../app/rewards/controllers/app/medical.php';
});

$app->get('/medical/medname/search/:name', function ($name) use ($app) {
    $type = "medname_search";
    require_once '../app/rewards/controllers/app/medical.php';
});

//payers
$app->get('/ins/:type', function ($type) use ($app) {
    $type = "ins/" . $type;
    require_once '../app/rewards/controllers/app/ins.php';
});
//messages
$app->post('/messages/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/messages.php';
});

$app->get('/messages/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/messages.php';
});

$app->get('/messages/list/:mbox', function ($mbox) use ($app) {
    $type = "list";
    require_once '../app/rewards/controllers/app/messages.php';
});

$app->get('/messages/:mbox/:msgid', function ($mbox, $msgid) use ($app) {
    $type = 'get';
    require_once '../app/rewards/controllers/app/messages.php';
});

$app->get('/tasks/:page/:type', function ($page, $type) use ($app) {
    require_once '../app/rewards/controllers/app/tasks.php';
});

$app->post('/tasks/:page/:type', function ($page, $type) use ($app) {
    require_once '../app/rewards/controllers/app/tasks.php';
});

$app->get('/vitalsTrend/:type/:id', function ($type, $id) use ($app) {
    require_once '../app/rewards/controllers/app/vitalsTrend.php';
});

$app->get('/2net/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/2net.php';
});

//assets
$app->post('/assets/:type', function ($type) use ($app) {
    $type = "post/" . $type;
    require_once '../app/rewards/controllers/app/assets.php';
});

$app->get('/assets/settings/uploadDialog', function () use ($app) {
    $type = "settings";
    require_once '../app/rewards/controllers/app/assets.php';
});
$app->get('/assets/patientForm/uploadDialog', function () use ($app) {
    $type = "patientform";
    require_once '../app/rewards/controllers/app/assets.php';
});
$app->get('/assets/uploadDialog/:eid', function ($eid) use ($app) {
    $type = "upload_dialog";
    require_once '../app/rewards/controllers/app/assets.php';
});

//cant have url with .jpg etc due to redirect rules
$app->get('/assets/viewer/:rsc_id/:type', function ($rsc_id, $type) use ($app) {
    $type = "viewer_" . $type;
    require_once '../app/rewards/controllers/app/assets.php';
});

$app->get('/assets/photos/:oid', function ($oid) use ($app) {
    $type = "photo";
    require_once '../app/rewards/controllers/app/assets.php';
});

$app->get('/assets/:path/:ftype', function ($path, $ftype) use ($app) {
    $type = "file";
    require_once '../app/rewards/controllers/app/assets.php';
});

$app->get('/assets/photos/delete/:oid', function ($oid) use ($app) {
    $type = "delete_photo";
    require_once '../app/rewards/controllers/app/assets.php';
});
$app->get('/assets/ptsumm/delete/:oid', function ($oid) use ($app) {
    $type = "delete_ptsumm";
    require_once '../app/rewards/controllers/app/assets.php';
});

$app->post('/assets/upload/:eid', function ($eid) use ($app) {
    $type = "postupload";
    require_once '../app/rewards/controllers/app/assets.php';
});

//careplan
$app->get('/carePlan/:type/:eid', function ($type, $eid) use ($app) {
    require_once '../app/rewards/controllers/app/carePlan.php';
});

$app->post('/carePlan/:type/:eid', function ($type, $eid) use ($app) {
    require_once '../app/rewards/controllers/app/carePlan.php';
});

$app->get('/carePlan/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/carePlan.php';
});

$app->post('/carePlan/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/carePlan.php';
});


//config
$app->get('/config', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/config.php';
});
$app->get('/admin', function () use ($app) {
    $type = "init";
    require_once '../app/rewards/controllers/app/config.php';
});

$app->get('/config/patientList/:subtype', function ($subtype) use ($app) {
    $type = "patientList/" . $subtype;
    require_once '../app/rewards/controllers/app/config.php';
});

$app->get('/config/:type/:subtype/:id', function ($type, $subtype, $id) use ($app) {
    $type = $type . "/" . $subtype;
    require_once '../app/rewards/controllers/app/config.php';
});

$app->get('/config/patients/:subtype/:id/:pid', function ($subtype, $id, $pid) use ($app) {
    $type = "patients/" . $subtype;
    require_once '../app/rewards/controllers/app/config.php';
});

$app->get('/config/:type/:subtype', function ($type, $subtype) use ($app) {
    $type = $type . "/" . $subtype;
    require_once '../app/rewards/controllers/app/config.php';
});

$app->post('/config/:type/:subtype', function ($type, $subtype) use ($app) {
    $type = $type . "/" . $subtype;;
    require_once '../app/rewards/controllers/app/config.php';
});

$app->get('/config/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/config.php';
});
$app->post('/config/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/config.php';
});

$app->post('/comments/:action', function ($action) use ($app) {
    $type="comments/".$action;
    require_once '../app/rewards/controllers/app/timeline.php';
});

//help
$app->post('/helpMe', function () use ($app) {
    $type = "post/helpMe";
    require_once '../app/rewards/controllers/app/home.php';
});

//services
$app->get('/survey/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/surveyMonkey.php';
});
$app->get('/survey/:type/:eid', function ($type, $eid) use ($app) {
    require_once '../app/rewards/controllers/app/surveyMonkey.php';
});
$app->get('/services/registry/:type/:eid', function ($type, $eid) use ($app) {
    require_once '../thirdParty/registry.php';
});

$app->get('/services/chron/:type', function ($type) use ($app) {
    require_once '../thirdParty/chron.php';
});

$app->get('/services/btRefresh', function () use ($app) {
    require_once '../thirdParty/btRefresh.php';
});


//chat
$app->get('/chat/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/chat.php';
});
$app->post('/chat/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/chat.php';
});

$app->get('/services/rxreminder', function () use ($app) {
    require_once '../thirdParty/rxreminders.php';
});

$app->post('/twilio/:type', function ($type) use ($app) {
    require_once '../thirdParty/twilio.php';
});
$app->get('/twilio/:type', function ($type) use ($app) {
    require_once '../thirdParty/twilio.php';
});

//meetings
$app->get('/joinme', function () use ($app) {
    $type="init";
    require_once '../app/rewards/controllers/app/joinme.php';
});
$app->get('/joinme/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/joinme.php';
});

//KAREO API

$app->get('/services/soap_en', function () use ($app) {
    try {
        $user = 'drtom@kareo.com';
        $password = 'kareo1234';
        $customerKey = 'd38nt62bq49s';

        $wsdl = 'https://webservice.kareo.com/services/soap/2.1/KareoServices.svc?wsdl';

        $client = new SoapClient($wsdl, array('trace' => 1, 'exceptions' => 1));
        //var_dump($client->__getFunctions());
        // Store data in the object of stdClass`enter code here`
        $requestHeader = new stdClass;
        $requestHeader->CustomerKey = $customerKey;
        $requestHeader->User = $user;
        $requestHeader->Password = $password;

        $newEncounter = new stdClass;


        $practice = new stdClass;
        $practice->PracticeName = "Frozen Lava Medical Center";

        $location = new stdClass;
        $location->LocationName = "Frozen Lava Medical Center";

        $patient = new stdClass;
        $patient->PatientID=3464;//jean Osak

        $serviceLine1 = new stdClass;
        $serviceLine1->ProcedureCode="99201";
        $serviceLine1->DiagnosisCode1 = "003.23";
        $serviceLine1->Units = 1;
        $serviceLine1->UnitCharge = 3.4;
        // **NOTE** the Specified fields need to be set for some fields! Visual Studio 2008
        // does not have this quirk!
        $serviceLine1->UnitsSpecified = true;
        $serviceLine1->UnitChargeSpecified = true;


        $provider = new stdClass;
        $provider->ProviderID= 150;


        $request = new stdClass;
        $request->RequestHeader = $requestHeader;

        $newEncounter->Patient = $patient;
        $newEncounter->Practice = $practice;
        $newEncounter->RenderingProvider = $provider;
        $newEncounter->ServiceLines = array($serviceLine1);
        $newEncounter->ServiceLocation = $location;
        $newEncounter->ServiceStartDate = "2015-03-30T21:45:00.000-05:00";//date("m/d/Y H:i:s A", strtotime("-1 days"));
        $newEncounter->PostDate = "2015-03-30T21:45:00.000-05:00";//date("m/d/Y H:i:s A", time());
        $newEncounter->ServiceEndDateSpecified = true;
        $newEncounter->PostDateSpecified = true;
        $newEncounter->ServiceEndDateSpecified = true;
        $newEncounter->PostDateSpecified = true;
        $request->Encounter = $newEncounter;
        // Call a SOAP function
         var_dump($request);
        $response = $client->CreateEncounter(array('request' => $request));
        var_dump($response);
        }
    catch (PDOException $e) {
        print $e->getMessage();
    }
});


$app->get('/services/kareo/:type', function ($type) use ($app) {
    $type="kareo/".$type;
    require_once '../app/rewards/controllers/app/extFacingServices.php';
});


$app->post('/inquiry/:type', function ($type) use ($app) {
    $type = "contacts/" . $type;
    require_once '../app/rewards/controllers/login.php';
});


$app->post('/contacts/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/contacts.php';
});
$app->get('/contacts/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/contacts.php';
});

$app->post('/workTime/:type', function ($type) use ($app) {
    $type = "workTime/" . $type;
    require_once '../app/rewards/controllers/app/workTime.php';
});

$app->get('/pdf/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/pdfTools.php';
});

$app->get('/paysimple', function () use ($app) {
    $type="init";
    require_once '../app/rewards/controllers/app/paysimple.php';
});
$app->get('/paysimpleupdate', function () use ($app) {
    $type="update";
    require_once '../app/rewards/controllers/app/paysimple.php';
});

$app->get('/paysimpledone', function () use ($app) {
    $type="done";
    require_once '../app/rewards/controllers/app/paysimple.php';
});
///test code
$app->get('/test1', function () use ($app) {
   // header("Access-Control-Allow-Origin: *");
    echo json_encode(array("success"=>true,"msg"=>"it works"));
    exit();
});

$app->get('/promis', function () use ($app) {
    require_once '../app/rewards/controllers/app/promis.php';
});

$app->get('/twilio', function () use ($app) {
    require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
    require_once DIR_VENDOR . '/twilio/sdk/Services/Twilio.php'; // Loads the library
    // Your Account Sid and Auth Token from twilio.com/user/account
    $sid = TWILIO_ACCOUNT;
    $token = TWILIO_TOKEN;
    try {
    $client = new Services_Twilio($sid, $token);
        $msg="Welcome to Carepoynt.  We have added points to your account just for signing up. Login to find out more. ".APP_HOST .CP_APP_LOGIN;
        $sms = $client->account->sms_messages->create(TWILIO_PHONE, "3104983024", $msg, array());
    } catch (PDOException $err) {
        $et = " twilio" .$err->getMessage() . "<br/>";
        file_put_contents(DIR_LOG . '/PDOErrors.txt', $et, FILE_APPEND);  // write some details to an error-log outside public_html
    }

});



//https://dev.carecliques.com/ringio/call?id={AccountId}&ringId={RingId}&contactId={ContactId}&contactNumber={ContactNumber}&dir={Direction}&selfNumber={SelfNumber}
$app->get('/23andme/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/23andme.php';
});

$app->post('/payment/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/payment.php';
});

$app->get('/esign/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/signnow.php';
});

$app->get('/ocr/:type', function ($type) use ($app) {
    require_once '../thirdParty/ocr.php';
});

$app->get('/cqm/:type', function ($type) use ($app) {
    $type="cqm/".$type;
    require_once '../thirdParty/cqm.php';
});

$app->get('/rxBottle_report', function () use ($app) {
    $tpl = new stdClass();
    $app->render('app/rxBottle.tpl.html', get_object_vars($tpl));
});

$app->get('/services/paypal', function () use ($app) {
    require_once '../thirdParty/paypal.php';
});
$app->post('/services/paypal', function () use ($app) {
    require_once '../thirdParty/paypal.php';
});

//mirth
$app->post('/mirth/:type/:entid', function ($type, $entid) use ($app) {
    require_once '../app/rewards/controllers/app/extFacingServices.php';
});

//nurture
//$app->get('/nurture/:type', function ($type) use ($app) {
//    require_once '../app/rewards/controllers/app/nurture.php';
//});

$app->post('/echo', function () use ($app) {
    require_once '../thirdParty/echo.php';
});


//mass email
//nurture
$app->get('/massmail/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/massmail.php';
});

//neo4j
$app->get('/graph_db/:type', function ($type) use ($app) {
    require_once '../app/rewards/controllers/app/graph_db.php';
});

$app->get('/geofence/:type', function ($type) use ($app) {
    if($type=="view")
    {
        $tpl = new stdClass();
        $app->render('app/checkin.tpl.html', get_object_vars($tpl));
        exit();
    }
    if($type=="checkin") {
        $addr = "1801 Port Renwick Place Newport Beach, Ca 92660";
        require_once '../thirdParty/GoogleMap.php';
        $Geocoder = new GoogleMapsGeocoder($addr);
        $Geocoder->setApiKey(GOOGLEMAPS_KEY);
        $response = $Geocoder->geocode();
        var_dump($response);
        exit();
    }
});

// Social Media
$app->get('/social-media/:type/:enterpriseId', function ($type, $enterpriseId) use ($app) {
    require_once '../app/rewards/controllers/app/social-media.php';
});

//require_once 'routes/message-ui-routes.php';
require_once 'routes/member-ui-routes.php';
require_once 'routes/member-service-routes.php';
require_once 'routes/promotion-service-routes.php';
require_once 'routes/enterprise-service-routes.php';
require_once 'routes/payment-service-routes.php';
require_once 'routes/redemption-service-routes.php';
require_once 'routes/admin-ui-routes.php';
require_once 'routes/command-center-routes.php';
require_once 'routes/onboard-ui-routes.php';
require_once 'routes/login-routes.php';
require_once 'routes/session-service-routes.php';
require_once 'routes/postmark-service-routes.php';
require_once 'routes/nurture-service-routes.php';
require_once 'routes/referral-service-routes.php';
require_once 'routes/tag-service-routes.php';
require_once 'routes/task-service-routes.php';
require_once 'routes/affiliate-service-routes.php';
require_once 'routes/message-ui-routes.php';
require_once 'routes/rank-service-routes.php';
require_once 'routes/dev-service-routes.php';
require_once 'routes/social-media-service-routes.php';
require_once 'routes/careplan-service-routes.php';
require_once 'routes/staff-portal-ui-routes.php';


use Swagger\Swagger;
$app->get('/swagger', function () use ($app) {
    $swagger = \Swagger\scan('routes');
    header('Content-Type: application/json');
    echo $swagger;
});

$app->run();

?>