<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_REWARDS_CONTROLLER.'/staff-portal-controller.php';


$app->group('/staff-portal', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $staffPortalCtrl = new StaffPortalController();
        echo $staffPortalCtrl->healthCheck();
    });
   

    $app->get('/enterprise-balance', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $staffPortalCtrl = new StaffPortalController();
        echo $staffPortalCtrl->getEnterpriseBalance();
    });

    $app->post('/add-member', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        // $data = $app->request()->getBody();
        $staffPortalCtrl = new StaffPortalController();
        $data = json_encode(array("email" => $_REQUEST['member_email']));
        echo $staffPortalCtrl->addMember($data);
        //body needs to have a json of email : email
    });

    $app->get('/find-member', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $data = json_encode(array("query" => $_REQUEST['earn_query']));
        $staffPortalCtrl = new StaffPortalController();
        echo $staffPortalCtrl->findMembers($data);
    });

    $app->get('/promos', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $staffPortalCtrl = new StaffPortalController();
        echo $staffPortalCtrl->findPromos();
    });

    $app->post('/promo-tx', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promo = json_encode(array("promo_id" => $_REQUEST['promo_id'], "memberid" => $_REQUEST['memberid']));
        $staffPortalCtrl = new StaffPortalController();
        echo $staffPortalCtrl->createPromoTx($promo);
    });

    $app->post('/redemption-tx', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemption = json_encode(array("voucher_code" => $_REQUEST['voucher_code']));
        $staffPortalCtrl = new StaffPortalController();
        echo $staffPortalCtrl->createRedemptionTx($redemption);
    });



});

?>