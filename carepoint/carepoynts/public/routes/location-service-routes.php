<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'location-service.php';

/**
 *  @SWG\Swagger(
 *      @SWG\Info(
 *          title="Carepoynt Services",
 *          version="0.1"
 *      ),
 *      basePath="/"
 *  )
 */

$app->group('/locationservice', function () use ($app) {

    /**
     *  @SWG\Get(
     *      path="/locationservice/healthcheck",
     *      summary="Simple get call to check the health of service",
     *      @SWG\Response(response="200", description="Health Check")
     *  )
     */
    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $locationService = new LocationService();
        echo $locationService->healthCheck();
    });

    $app->post('/location/yelpid', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $yelpId = json_decode($app->request()->getBody(), true)['id'];
        $locationService = new LocationService();
        echo $locationService->setYelpId($yelpId);
    });

    $app->post('/location/search', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $searchJson = $app->request()->getBody();
        $locationService = new LocationService();
        echo $locationService->searchYelp($searchJson);
    });

});

?>