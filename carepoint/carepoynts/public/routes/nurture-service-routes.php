<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";



$app->group('/nurture', function () use ($app) {
    require_once DIR_PLATFORM_SERVICES.'nurture-service.php';

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $nurtureService = new NurtureService();
        echo $nurtureService->healthCheck();
    });

    $app->get('/dailyNurture', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $nurtureService = new NurtureService();
        $nurtureService->dailyNurture();
    });

});

?>