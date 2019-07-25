<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'payment-service.php';

$app->group('/payment-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $paymentService = new PaymentService();
        echo $paymentService->healthCheck();
    });

    $app->post('/paypal/ipn', function () use ($app) {
        $paymentService = new PaymentService();
        parse_str($app->request()->getBody(), $ipn);
        $status = $paymentService->process_paypal_ipn(json_encode($ipn));

        if(json_decode($status, true)['success'] == true) {
            // Reply with an empty 200 response to indicate to paypal the IPN was received correctly.
            header("HTTP/1.1 200 OK");
        }
    });

    $app->get('/paypal/pdt', function () use ($app) {
        $paymentService = new PaymentService();
        $tx = $app->request()->params('tx');
        echo $paymentService->process_paypal_pdt($tx);
    });

});

?>