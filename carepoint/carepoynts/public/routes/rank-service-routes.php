<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'rank-service.php';


$app->group('/rank-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $rankService = new RankService();
        echo $rankService->healthCheck();
    });

    $app->get('/getRank', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['id'];
        $rankService = new RankService();
        echo $rankService->getRank(json_encode(array('id' => $id)));
    });

    $app->get('/getAllRankings', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $rankService = new RankService();
        echo $rankService->getAllRankings();
    });

    $app->post('/createRank', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $rank = $app->request()->getBody();
        $rankService = new RankService();
        echo $rankService->createRank($rank);
    });

    $app->post('/updateRank', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $rank = $app->request()->getBody();
        $rankService = new RankService();
        echo $rankService->updateRank($rank);
    });
});

?>