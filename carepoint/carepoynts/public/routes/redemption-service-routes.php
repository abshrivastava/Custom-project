<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'redemption-service.php';

$app->group('/redemption-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $redemptionService = new RedemptionService();
        echo $redemptionService->healthCheck();
    });

    $app->get('/cpoffers', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemptionService = new RedemptionService();
        echo $redemptionService->getCarepoyntOffers();
    });

    $app->get('/tango/config/get', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemptionService = new RedemptionService();
        echo $redemptionService->getTangoConfig();
    });

    $app->post('/tango/config/save', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $config = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->saveTangoConfig($config);
    });

    $app->get('/tango/cp-options', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemptionService = new RedemptionService();
        echo $redemptionService->getCPTangoOptions();
    });

    $app->get('/tango/rewards-list', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemptionService = new RedemptionService();
        echo $redemptionService->getTangoRewardsList();
    });

    $app->post('/tango/customer', function () use ($app) {
        $customer = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->createTangoCustomer($customer);
    });

    $app->post('/tango/account', function () use ($app) {
        $account = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->createTangoAccount($account);
    });

    $app->get('/tango/customers', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemptionService = new RedemptionService();
        echo $redemptionService->getTangoCustomers();
    });

    $app->get('/tango/accounts', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemptionService = new RedemptionService();
        echo $redemptionService->getTangoAccounts();
    });


    $app->post('/tango/order-list', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $orderSearchRequest = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->getOrderList($orderSearchRequest);
    });

    // routing method for metadata update
    $app->post('/tango/metadata-update', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $orderSearchRequest = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->updateTransactionLogForGiftCard($orderSearchRequest);
    });


    $app->get('/tango/account', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $account = json_encode(array("customer"=>$app->request()->params('customer'),
                         "identifier" => $app->request()->params('identifier')));
        $redemptionService = new RedemptionService();
        echo $redemptionService->getTangoAccount($account);
    });

    $app->post('/tango/cc_register', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $registerCC = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->registerCC($registerCC);
    });

    $app->post('/tango/addfunds', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $funds = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->addFunds($funds);
    });

    $app->get('/tango/order/:id', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemptionService = new RedemptionService();
        echo $redemptionService->getOrder($id);
    });

    $app->post('/tango/order', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $order = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->createOrder($order);
    });

    $app->get('/tango/gc/:utid/:amt', function ($utid, $amt) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $order = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->getTangoCard($utid, $amt);
    });

    $app->post('/tango/migrate/donnie', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $order = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->runDonnieTangoMigration();
    });

    $app->post('/tango/resendemail', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $resend = json_decode($app->request()->getBody(), true);

        $redemptionService = new RedemptionService();
        echo $redemptionService->resendEmail($resend['order_id']);
    });

    $app->get('/tango/cc/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemptionService = new RedemptionService();
        echo $redemptionService->getCreditCards();
    });

    $app->post('/tango/cc/register', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $card = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->registerCreditCard($card);
    });

    $app->post('/tango/cc/unregister', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $card = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->unregisterCreditCard($card);
    });

    $app->post('/redemption/:id', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $transaction = $app->request()->getBody();
        $redemptionService = new RedemptionService();
        echo $redemptionService->createRedemptionTx($transaction, $id);
    });

});

?>