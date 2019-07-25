<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'template-service.php';


$app->group('/template-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $templateService = new TemplateService();
        echo $templateService->healthCheck();
    });

    $app->get('/getTemplate', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['id'];
        $templateService = new TemplateService();
        echo $templateService->getTemplate(json_encode(array('id' => $id)));
    });

    $app->post('/createTemplate', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $template = $app->request()->getBody();
        $templateService = new TemplateService();
        echo $templateService->createTemplate($template);
    });

    $app->post('/updateTemplate', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $template = $app->request()->getBody();
        $templateService = new TemplateService();
        echo $templateService->updateTemplate($template);
    });
});

?>