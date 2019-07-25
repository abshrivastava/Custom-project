<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'dev/dev-service.php';


$app->group('/dev-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $devService = new DevService();
        echo $devService->healthCheck();
    });


    $app->get('/yelp/search', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $location = $_REQUEST['location'];
        $term = $_REQUEST['term'];
        $devService = new DevService();
        echo $devService->searchYelp($location, $term);
    });

    $app->get('/yelp/business/:id', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $devService = new DevService();
        echo $devService->getBusinessYelp($id);
    });

    $app->get('/feature-toggle', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $devService = new DevService();
        echo $devService->getFeatureToggles();
        
    });

    $app->post('/feature-toggle/update', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $features = $app->request()->getBody();
        $devService = new DevService();
        echo $devService->updateFeatureToggles($features);
    });

    $app->get('/promos/hpos/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        require_once DIR_PLATFORM_SERVICES.'promotion-service.php';
        $promoService = new PromotionService();
        echo $promoService->getPriorityOffers();
    });

    $app->group('/enterprise', function () use ($app) {
        $app->get('/:name', function ($name) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            require_once DIR_PLATFORM_SERVICES.'promotion-service.php';
            $enterpriseService = new EnterpriseService();
            echo $enterpriseService->getActiveEnterprisesByNameOrId($name);
        });

        $app->get('/all', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $enterpriseService = new EnterpriseService();
            echo $enterpriseService->getAllEnterprises();
        });
    
        $app->post('/update', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $enterprise = $app->request()->getBody();
            $enterpriseService = new EnterpriseService();
            echo $enterpriseService->updateEnterprise($enterprise);
        });
    });

    $app->group('/promotion', function () use ($app) {
        $app->get('/:name', function ($name) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            require_once DIR_PLATFORM_SERVICES.'promotion-service.php';
            $promoService = new PromotionService();
            echo $promoService->getActivePromosByNameOrId($name);
        });

        $app->post('/priority', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $promo = $app->request()->getBody();
            require_once DIR_PLATFORM_SERVICES.'promotion-service.php';
            $promoService = new PromotionService();
            echo $promoService->setPromoPriority($promo);
        });

        $app->get('/stickies/all', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            require_once DIR_PLATFORM_SERVICES.'promotion-service.php';
            $promoService = new PromotionService();
            echo $promoService->getStickyPriorityOffers('2486');
        });
    });

    $app->group('/rank', function () use ($app) {

        $app->post('/inactivate', function() use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $promo = $app->request()->getBody();
            require_once DIR_PLATFORM_SERVICES.'rank-service.php';
            $rankService = new RankService();
            echo $rankService->inactivateRank($promo);
        });

        $app->group('/promotion', function () use ($app) {
            $app->post('/update', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $promo = $app->request()->getBody();
                require_once DIR_PLATFORM_SERVICES.'rank-service.php';
                $rankService = new RankService();
                echo $rankService->updatePromoRank($promo);
            });
        
            $app->post('/create', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $rank = $app->request()->getBody();
                $rankService = new RankService();
                echo $rankService->createPromoRank($rank);
            });

            $app->get('/all', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                require_once DIR_PLATFORM_SERVICES.'rank-service.php';
                $rankService = new RankService();
                echo $rankService->getAllActivePromoRanks();
            });
        });

        $app->group('/enterprise', function () use ($app) {
            $app->post('/update', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $enterprise = $app->request()->getBody();
                require_once DIR_PLATFORM_SERVICES.'rank-service.php';
                $rankService = new RankService();
                echo $rankService->updateEnterpriseRank($enterprise);
            });
        
            $app->post('/create', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $rank = $app->request()->getBody();
                $rankService = new RankService();
                echo $rankService->createEnterpriseRank($rank);
            });

            $app->get('/all', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                require_once DIR_PLATFORM_SERVICES.'rank-service.php';
                $rankService = new RankService();
                echo $rankService->getAllActiveEnterpriseRanks();
            });
        });
    });

    

    // $app->post('/enterprise/promo-tx', function () use ($app) {
    //     $app->response()->headers->set('Content-Type', 'application/json');
    //     $promo = $app->request()->getBody();
    //     $enterpriseService = new EnterpriseService();
    //     echo $enterpriseService->createPromoTx($promo, 1654);
    // });

});

?>