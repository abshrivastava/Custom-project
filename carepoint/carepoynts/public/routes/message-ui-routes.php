<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";



$app->group('/message-ui', function () use ($app) {
    require_once DIR_PLATFORM_SERVICES.'message-service.php';

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $messageService = new MessageService();
        echo $messageService->healthCheck();;
    });


    $app->post('/sms_in', function () use ($app) {
        $messageService = new MessageService();
        $messageService->get_twilio_inbound_sms();
    });


});

?>