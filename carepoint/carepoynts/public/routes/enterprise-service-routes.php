<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'enterprise-service.php';
require_once DIR_PLATFORM_SERVICES.'admin-service.php';

$app->group('/enterprise-service', function () use ($app) {

    /**
     *  @SWG\Get(
     *      path="/enterprise-service/healthcheck",
     *      summary="Simple get call to check the health of service",
     *      @SWG\Response(response="200", description="Health Check")
     *  )
     */
    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->healthCheck();
    });

    /**
     *  @SWG\Get(
     *      path="/enterprise-member/{id}",
     *      summary="Get enterprise member by enterprise id",
     *      description="Returns the rewards member for the given enterprise id",
     *      @SWG\Response(response="200", description="Get enterprise member by enterprise id"),
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
    $app->get('/enterprise-member/:id', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->getEnterpriseRewardMember($id);
    });

    /**
     *  @SWG\Post(
     *      path="/enterprise-member",
     *      summary="Creates rewards member for the enterprise",
     *      description="Returns the rewards member for the given enterprise id",
     *      @SWG\Response(response="200", description="")
     *  )
     */
    $app->post('/enterprise-member', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $enterprise = $app->request()->getBody();
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->createEnterpriseAsMember($enterprise);
    });

    $app->post('/enterprise/:id/transaction', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $transaction = json_decode($app->request()->getBody(), true);
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->addPoynts($id, $transaction['value']);
    });


    $app->post('/webhook', function () use ($app) {
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->addPoynts("1663", 250);

    });

    $app->post('/enterprise/promo-tx', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promo = $app->request()->getBody();
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->createPromoTx($promo, 1654);
    });

    $app->post('/scan_earn', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $p = json_decode($app->request()->getBody(), true);
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->scanToEarn($p['long'],$p['lat']);
    });

    /*
    *****  Guard rails stuff 
    */

    $app->get('/enterprise/:entid/member/:memberid/check-guardrails', function ($entid, $memberid) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $adminService = new AdminService();
        echo $adminService->checkGivenGuardrails($entid, $memberid);
    });

    $app->get('/enterprise/:entid/member/:memberid/check-guardrails-redeem', function ($entid, $memberid) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $adminService = new AdminService();
        echo $adminService->checkReceivedGuardrails($entid, $memberid);
    });

    $app->get('/enterprise/:id/get-poynts-today', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $adminService = new AdminService();
        echo $adminService->getTotalGivenToday($id);
    });

    $app->get('/enterprise/:entid/member/:memberid/get-poynts-today-for-member', function ($entid, $memberid) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $adminService = new AdminService();
        echo $adminService->getTotalGivenMemberToday($entid, $memberid);
    });

    $app->get('/enterprise/:entid/get-poynts-today-received', function ($entid) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $adminService = new AdminService();
        echo $adminService->getTotalReceivedToday($entid);
    });

     $app->get('/enterprise/:entid/member/:memberid/get-poynts-today-received-member', function ($entid, $memberid) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $adminService = new AdminService();
        echo $adminService->getTotalReceivedMemberToday($entid, $memberid);
    });


    $app->get('/member/:id', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->getMemberEnterprises($id);
    });

    $app->get('/enterprise/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $enterpriseService = new EnterpriseService();
        echo $enterpriseService->getAllEnterprises();
    });
     


});

?>