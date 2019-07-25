<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'referral-service.php';


$app->group('/referral-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $referralService = new ReferralService();
        echo $referralService->healthCheck();
    });

    $app->get('/getReferral', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['id'];

        $referralService = new ReferralService();
        echo $referralService->getReferral(json_encode(array('id' => $id)));

    });

    $app->post('/createReferral', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $referral = $app->request()->getBody();
        $referralService = new ReferralService();
        echo $referralService->createReferral($referral);
        //some json referral
    });

    $app->post('/updateReferral', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $referral = $app->request()->getBody();
        $referralService = new ReferralService();
        echo $referralService->updateReferral($referral);
    });

    $app->get('/sendReferral', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $referralService = new ReferralService();
        echo $referralService->sendReferral();
    });

    $app->get('/acceptReferral', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $ref_id = $_REQUEST['id'];
        $referralService = new ReferralService();
        echo $referralService->acceptReferral(json_encode(array('id' => $ref_id)));
    });

});



?>