<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
//require_once DIR_REWARDS_CONTROLLER.'session-controller.php';


$app->group('/session-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $sessionService = new SessionService();
        echo $sessionService->healthCheck();
    });

    // $app->get('/ent_reviews', function () use ($app) {
    //     $app->response()->headers->set('Content-Type', 'application/json');
    //     $adminController = new AdminUIController();
    //     echo $adminController->getReviewsByEnterpriseId();
    // });

    // $app->get('/reviews_promo_offer', function () use ($app) {
    //     $adminController = new AdminUIController();
    //     $adminController->reviews_promo_offer_form($app);
    // });


});

?>