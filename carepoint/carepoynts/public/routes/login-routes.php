<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_REWARDS_CONTROLLER.'login-controller.php';

$app->group('/login', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $loginController = new LoginController();
        echo $loginController->healthCheck();
        exit();
    });

    $app->group('/mobile', function () use ($app) {

        $app->get('/forgot', function () use ($app) {
            $loginController = new LoginController();
            $loginController->renderForgotPassword($app);
            exit();
        });

        //on submit send post data to send to the email
        $app->post('/forgot/creds', function () use ($app) { 
            $email = $_POST['email'];

            $loginController = new LoginController();
            $loginController->sendForgotEmail($app, $email);
            exit();
        });

        $app->get('/forgot/resetPassword', function () use ($app) {
            $loginController = new LoginController();
            $loginController->renderNewPasswordForm($app);
            exit();
        });
        
        $app->post('/forgot/submitNewPassword', function () use ($app) {
            $loginController = new LoginController();
            $loginController->submitNewPassword($app);
            exit();
        });
    });

});

?>