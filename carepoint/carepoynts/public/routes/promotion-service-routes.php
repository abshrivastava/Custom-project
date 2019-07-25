<?
require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'promotion-service.php';

// API group
$app->group('/promotion-service', function () use ($app) {
    // application/json by default, set differently otherwise
    //$app->response()->headers->set('Content-Type', 'application/json');

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $promotionService = new PromotionService();
        echo $promotionService->healthCheck();
    });

    $app->get('/promotion/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getAllPromotions();
    });

    $app->post('/promotion', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotion = json_decode($app->request()->getBody(), true);
        $promotionService = new PromotionService();
        echo $promotionService->createPromotion($promotion);
    });

    $app->post('/carepoynt-promotion', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        //$promotion = json_decode($app->request()->getBody(), true);
        $promotion = $app->request()->getBody();
        $promotionService = new PromotionService();
        echo $promotionService->createCarepoyntPromotion($promotion);
    });

    $app->put('/carepoynt-promotion', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotion = $app->request()->getBody();
        $promotionService = new PromotionService();
        echo $promotionService->updateCarepoyntPromotion($promotion);
    });

    $app->get('/promotion/:id', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getPromotion($id);
    });

    $app->post('/createVariablePromo',function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promo = $app->request()->getBody();
        $promotionService = new PromotionService();
        echo $promotionService->createVariablePromo($promo);
    });
// {FOR VARIABLE PROMO
//     "promoBase_id": 18,
//     "promo_type": "variable_promotion",
//     "pgroup": "member",
//     "priority": 1,
//     "promo_freq": 10,
//     "title": "Custom variable promotion",
//     "description": "Custom variable promotion description",
//     "sdate": "08/02/2017",
//     "edate": "11/02/2017",
//     "carepoynts":0,
//     "minimum":50,
//     "entid":280,
//     "percentage":10
// }


    /**
     *  @SWG\Get(
     *      path="getAllHighPriorityPromotions/{entid}",
     *      summary="Get High Priority Promotions by enterprise id",
     *      description="Returns array of promotion objects for the given enterprise id",
     *      @SWG\Response(response="200", description="Get High Priority Promotions by enterprise id"),
     *      @SWG\Parameter(
     *          description="ID of enterprise to return",
     *          in="path",
     *          name="id",
     *          required=true,
     *          type="integer",
     *          format="int64"
     *      )
     *  )
     */
    $app->get('/getAllHighPriorityPromotions/:entid', function ($entid) use ($app) {
        $promotionService = new PromotionService();
        echo $promotionService->getAllHighPriorityPromotions($entid);
    });

    $app->get('/getPriorityOffers/:mid', function ($mid) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getPriorityOffers($mid);
    });


    $app->put('/carepoynt-promotion', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotion = $app->request()->getBody();
        $promotionService = new PromotionService();
        echo $promotionService->updateCarepoyntPromotion($promotion);
    });



    $app->put('/promotion/deactivate', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotion = $app->request()->getBody();
        $promotionService = new PromotionService();
        echo $promotionService->deactivatePromotion($promotion);
    });

    $app->get('/promotion/promotion-rule/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getAllPromotionRules();
    });

    $app->post('/promotion/promotion-rule', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionRule = json_decode($app->request()->getBody(), true);
        $promotionService = new PromotionService();
        echo $promotionService->createPromotionRule($promotionRule);
    });

    $app->get('/promotion/rule/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getAllRules();
    });

    $app->post('/promotion/rule', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $rule = json_decode($app->request()->getBody(), true);
        $promotionService = new PromotionService();
        echo $promotionService->createRule($rule);
    });

    $app->get('/promotion/rule-criteria/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getAllRuleCriterias();
    });

    $app->post('/promotion/rule-criteria', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $ruleCriteria = $app->request()->getBody();
        $promotionService = new PromotionService();
        echo $promotionService->createRuleCriteria($ruleCriteria);
    });

    $app->get('/segment/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getAllSegments();
    });

    $app->post('/segment', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $segment = json_decode($app->request()->getBody(), true);
        $promotionService = new PromotionService();
        echo $promotionService->createSegment($segment);
    });

    $app->get('/segment-criteria/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getAllSegmentCriterias();
    });

    $app->post('/segment-criteria', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $segmentCriteria = json_decode($app->request()->getBody(), true);
        $promotionService = new PromotionService();
        echo $promotionService->createSegmentCriteria($segmentCriteria);
    });

    $app->get('/segment-domain/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getAllSegmentDomains();
    });

    $app->post('/segment-domain', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $segmentDomain = json_decode($app->request()->getBody(), true);
        $promotionService = new PromotionService();
        echo $promotionService->createSegmentDomain($segmentDomain);
    });

    // just a helper method to for development
    $app->post('/query', function() use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $q = urlencode(json_decode($app->request()->getBody(), true)['query']);
        $promotionService = new PromotionService();

        echo $promotionService->doQuery($q);
    });

    $app->get('/enterprise/:id/promotions', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getPromotionsByEnterpriseId($id);
    });

    $app->get('/qofday', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promotionService = new PromotionService();
        echo $promotionService->getDailyQuestion();
    });

    $app->post('/save-answer', function() use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $data = $app->request()->getBody();
        $promotionService = new PromotionService();
        echo $promotionService->saveAnswer($data);
    });   

});

?>