<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_REWARDS_CONTROLLER.'admin-ui-controller.php';


$app->group('/admin-ui', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $adminService = new AdminService();
        echo $adminService->healthCheck();;
    });

    $app->get('/ent_reviews', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $adminController = new AdminUIController();
        echo $adminController->getReviewsByEnterpriseId();
    });

    $app->get('/reviews_promo_offer', function () use ($app) {
        $adminController = new AdminUIController();
        $adminController->reviews_promo_offer_form($app);
    });


});

?>