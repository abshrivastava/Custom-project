<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES .'careplan-service.php';
require_once DIR_REWARDS_CONTROLLER . 'plan-controller.php';

$app->group('/careplan-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $careplanService = new CareplanService();
        echo $careplanService->healthCheck();
    });

    $app->get('/getcareplan', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['id'];
        $careplanService = new CareplanService();
        echo $careplanService->getcareplan(json_encode(array('id' => $id)));
    });

    $app->post('/createcareplan', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $careplan = $app->request()->getBody();
        $careplanService = new CareplanService();
        echo $careplanService->createcareplan($careplan);
    });

    $app->post('/updatecareplan', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $careplan = $app->request()->getBody();
        $careplanService = new CareplanService();
        echo $careplanService->updatecareplan($careplan);
    });

    $app->get('/getCareplanEnterprises', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $careplan = $_REQUEST['careplan'];
        $careplanService = new CareplanService();
        echo $careplanService->getCareplanEnterprises($careplan);
    });

    $app->get('/:careplan/tags', function ($careplan) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $careplanService = new CareplanService();
        echo $careplanService->getCareplanTags($careplan);
    });

    $app->get('/:careplan/enterprise', function ($careplan) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $planController = new PlanController();
        $careplanJson = json_encode(array( 'careplan_name' => $careplan));
        echo $planController->getCareplanEnterprises($careplanJson);
    });   

    $app->group('/enterprise', function () use ($app) {

        $app->get('/:id/promos', function ($id) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $planController = new PlanController();
            echo $planController->getPromotionsCountByEnterpriseId($id);
        });

    });

});

?>