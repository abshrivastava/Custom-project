<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_PLATFORM_SERVICES.'tag-service.php';
require_once DIR_REWARDS_CONTROLLER.'plan-controller.php';

$app->group('/tag-service', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $tagService = new TagService();
        echo $tagService->healthCheck();
    });

    $app->get('/getTag', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['id'];
        $tagService = new TagService();
        echo $tagService->getTag(json_encode(array('id' => $id)));
    });

    $app->post('/createTag', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $tag = $app->request()->getBody();
        $tagService = new TagService();
        echo $tagService->createTag($tag);
    });

    $app->post('/updateTag', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $tag = $app->request()->getBody();
        $tagService = new TagService();
        echo $tagService->updateTag($tag);
    });

    // TODO: Start migrating old member tag routes to this group
    // Start Member Tags
    $app->group('/member', function () use ($app) {

        $app->post('/interests/save', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $interests = $app->request()->getBody();
            $planController = new PlanController();
            echo $planController->saveMemberInterests($interests);
        });

        $app->get('/interests/get', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $planController = new PlanController();
            echo $planController->getMemberInterests();
        });

        $app->post('/affiliate/warning/set', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $planController = new PlanController();
            echo $planController->setAffiliateShowAgainTag();
        });

        $app->get('/affiliate/warning/get', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $planController = new PlanController();
            echo $planController->getAffiliateShowAgainTag();
        });

        $app->post('/purchase/warning/set', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $planController = new PlanController();
            echo $planController->setPurchaseShowAgainTag();
        });

        $app->get('/purchase/warning/get', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $planController = new PlanController();
            echo $planController->getPurchaseShowAgainTag();
        });

        $app->post('/create', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $tag = $app->request()->getBody();
            $tagService = new TagService();
            echo $tagService->createMemberTag($tag);
        });

        $app->get('/get', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $id = $_REQUEST['member_id'];
            $tagService = new TagService();
            echo $tagService->getMemberTags(json_encode(array('memberid' => $id)));
        });

        $app->post('/update', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $tag = $app->request()->getBody();
            $tagService = new TagService();
            echo $tagService->updateMemberTag($tag);
        });

        $app->post('/remove', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $tag = $app->request()->getBody();
            $tagService = new TagService();
            echo $tagService->removeMemberTag($tag);
        });         

    });

    $app->post('/createMemberTag', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $tag = $app->request()->getBody();
        $tagService = new TagService();
        echo $tagService->createMemberTag($tag);
    });

    $app->get('/getMemberTags', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['memberid'];
        $tagService = new TagService();
        echo $tagService->getMemberTags(json_encode(array('memberid' => $id)));
    });

    $app->post('/updateMemberTag', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $tag = $app->request()->getBody();
        $tagService = new TagService();
        echo $tagService->updateMemberTag($tag);
    });

    //end member tags

//start enterprise tags
    $app->post('/createEnterpriseTag', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $tag = $app->request()->getBody();
        $tagService = new TagService();
        echo $tagService->createEnterpriseTag($tag);
    });

    $app->get('/getEnterpriseTags', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $id = $_REQUEST['ent_id'];
        $tagService = new TagService();
        echo $tagService->getEnterpriseTags(json_encode(array('ent_id' => $id)));
    });

    $app->post('/updateEnterpriseTag', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $tag = $app->request()->getBody();
        $tagService = new TagService();
        echo $tagService->updateEnterpriseTag($tag);
    });

    $app->post('/removeEnterpriseTag', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $tag = $app->request()->getBody();
        $tagService = new TagService();
        echo $tagService->removeEnterpriseTag($tag);
    });

    $app->get('/enterprises/:tag', function ($tag) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $planController = new PlanController();
        echo $planController->getEnterprisesByTagForMember(json_encode( array('tagName' => $tag)));
    });
//end enterprise tags
});

?>