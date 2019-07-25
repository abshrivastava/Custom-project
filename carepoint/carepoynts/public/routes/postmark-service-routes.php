<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";



$app->group('/postmark', function () use ($app) {
    require_once DIR_PLATFORM_SERVICES.'postmark-service.php';

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $postmarkService = new PostmarkService();
        echo $postmarkService->healthCheck();
    });


    $app->post('/delivery', function () use ($app) {
        $postmarkService = new PostmarkService();
        $postmarkService->delivery();
    });
    $app->post('/open', function () use ($app) {
        $postmarkService = new PostmarkService();
        $postmarkService->delivery();
    });

    $app->get('/templateTest', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $postmarkService = new PostmarkService();
        echo $postmarkService->WelcomeEmailTest();
    });

});

?>