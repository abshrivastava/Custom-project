<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'social-media-service.php';


$app->group('/social-media-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $socialMediaService = new SocialMediaService();
        echo $socialMediaService->healthCheck();
    });

    $app->get('/getToken', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['id'];
        $socialMediaService = new SocialMediaService();
        echo $socialMediaService->getToken(json_encode(array('id' => $id)));
    });

    $app->post('/setToken', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $token = $app->request()->getBody();
        $socialMediaService = new SocialMediaService();
        echo $socialMediaService->setToken($token);
    });

    $app->post('/updateToken', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $token = $app->request()->getBody();
        $socialMediaService = new SocialMediaService();
        echo $socialMediaService->updateToken($token);
    });

    // Twitter Routes

    // Checks if they're logged in
    $app->get('/twitter/login', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $memberId = $_SESSION['loginMember']['memberid'];
        $socialMediaService = new SocialMediaService();
        echo $socialMediaService->checkTwitterLoginStatus($memberId);
    });

    // Attempts to acquire credentials
    $app->post('/twitter/authorize', function () use ($app) {
        $callbackUrl = $_POST['callbackUrl'];
        $socialMediaService = new SocialMediaService();
        $socialMediaService->authorizeTwitterUser($callbackUrl);
    });

    // Handles callback from twitter
    $app->get('/twitter/callback', function () use ($app) {
        $response = $_REQUEST;
        $memberId = $_SESSION['loginMember']['memberid'];
        $socialMediaService = new SocialMediaService();
        $socialMediaService ->handleTwitterResponse($memberId, $response);
        exit();
    });

    // Facebook Routes

    $app->get('/facebook/login', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $memberId = $_SESSION['loginMember']['memberid'];
        $socialMediaService = new SocialMediaService();
        echo $socialMediaService->checkFBLoginStatus($memberId);
    });

    $app->post('/facebook/store', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $token = $app->request()->getBody();
        $memberId = $_SESSION['loginMember']['memberid'];
        $socialMediaService = new SocialMediaService();
        echo $socialMediaService->storeFBToken($memberId, $token);
    });
});

?>