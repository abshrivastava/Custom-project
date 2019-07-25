<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'task-service.php';


$app->group('/task-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $taskService = new TaskService();
        echo $taskService->healthCheck();
    });

    $app->get('/getTask', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['id'];
        $taskService = new TaskService();
        echo $taskService->getTask(json_encode(array('id' => $id)));
    });

    $app->post('/createTask', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $task = $app->request()->getBody();
        $taskService = new TaskService();
        echo $taskService->createTask($task);
    });

    $app->post('/updateTask', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $task = $app->request()->getBody();
        $taskService = new TaskService();
        echo $taskService->updateTask($task);
    });
});

?>