<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";



$app->group('/affiliate', function () use ($app) {
    require_once DIR_PLATFORM_SERVICES.'affiliate-service.php';

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $affiliateService = new AffiliateService();
        echo $affiliateService->healthCheck();
    });

    $app->get('/query/:affiliate', function ($affiliate) use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $affiliateService = new AffiliateService();
        $affiliateService->affiliate_query($affiliate);
    });

});
?>