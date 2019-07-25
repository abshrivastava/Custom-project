<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'member-service.php';
require_once DIR_REWARDS_CONTROLLER.'member-ui-controller.php';

// API group
$app->group('/member-service', function () use ($app) {
    // application/json by default, set differently otherwise
    //$app->response()->headers->set('Content-Type', 'application/json');

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $memberService = new MemberService();
        echo $memberService->healthCheck();
    });

    $app->post('/member', function () use ($app) {
        $member = $app->request()->getBody();
        $memberService = new MemberService();
        echo $memberService->createMember($member);
    });

    $app->post('/update-member', function () use ($app) {
        $member = $app->request()->getBody();
        $memberService = new MemberService();
        echo $memberService->updateMember($member);
    });

    $app->post('/enterprise-member', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $enterprise = $app->request()->getBody();
        $memberService = new MemberService();
        echo $memberService->createEnterpriseAsMember($enterprise);
    });

    $app->get('/member/:id/poynts', function ($id) use ($app) {
        $memberService = new MemberService();
        echo $memberService->getMemberPointsTotal($id);
    });

    $app->get('/member/:id', function ($id) use ($app) {
        $memberService = new MemberService();
        echo $memberService->getMember($id);
    });

    $app->post('/member/:id/transaction', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $transaction = $app->request()->getBody();
        $memberService = new MemberService();
        echo $memberService->createTransaction($transaction, $id);
    });

    $app->get('/member/:id/transactions', function ($id) use ($app) {
        $memberService = new MemberService();
        echo $memberService->getActivity(0, 100, $id);
    });

    $app->post('/member/transferPoynts', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $transfer = json_decode($app->request()->getBody(), true);
        $memberService = new MemberService();
        echo $memberService->transferPoynts($transfer['value'], json_encode($transfer['sender']), json_encode($transfer['receiver']));
    });

    $app->get('/member/getpwdtoken/:username', function ($username) use ($app) {
        $memberService = new MemberService();
        echo $memberService->generateResetPwdToken($username);
    });

    $app->post('/member/validateResetPwdToken', function () use ($app) {
        // $app->response()->headers->set('Content-Type', 'application/json');
        $user = json_decode($app->request()->getBody(), true);
        $memberService = new MemberService();
        echo $memberService->validateResetPwdToken($user['username'], $user['token']);
    });

    $app->post('/resetMembersToFTUE', function () use ($app) {
        $ldata = json_decode($app->request()->getBody(), true);
        $memberService = new MemberService();
        echo $memberService->resetMembersToFTUE($ldata['memberIds'], $ldata['testAccountId']);
    });

    $app->post('/resetCliques', function () use ($app) {
        $member = $app->request()->getBody();
        $memberService = new MemberService();
        echo $memberService->resetCliques($member);
    });

    $app->post('/resetMemberToSingleEnt', function () use ($app) {
        $ldata = json_decode($app->request()->getBody(), true);
        $memberService = new MemberService();
        echo $memberService->resetMemberToSingleEnt($ldata['memberIds'], $ldata['entid']);
    });

    $app->post('/resetTransactionLogsEnt', function () use ($app) {
    $ldata = json_decode($app->request()->getBody(), true);
    $memberService = new MemberService();
    echo $memberService->resetTransactionLogsEnt($ldata['memberIds'], $ldata['testAccountId']);
    });

    $app->post('/getMemberPoyntsbyid', function () use ($app) {
        $data = json_decode($app->request()->getBody(), true);
        $memberUICtrl = new MemberUIController();
        echo $memberUICtrl->getMemberPoyntsbyid($data);
        exit();
    });
    
});

?>