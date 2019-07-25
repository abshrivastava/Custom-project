<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_REWARDS_CONTROLLER.'onboard-ui-controller.php';


    $app->group('/joyn_page', function () use ($app) {

        $app->get('/', function () use ($app) {
            //render local form to capture email and POST to service
           $app->redirect("/joyn_page/1");
        });

        $app->get('/:entid', function ($entid) use ($app) {
            //render local form to capture email and POST to service
            $onboardUICtrl = new OnboardUIController();
            $onboardUICtrl->joyn_page($app,$entid);
        });

        $app->post('/:entid', function ($entid) use ($app) {
            //post form
            $onboardUICtrl = new OnboardUIController();
            $rj=$onboardUICtrl->post_joyn_page($app,$entid);
            $rv=json_decode($rj);
            if($rv->success)
            {
                $app->redirect("https://connect-carepoynt-site.squarespace.com/app-verify");
            }
            else
            {
                $app->redirect("https://connect-carepoynt-site.squarespace.com/app-welcome");
            }
            //returns ('success'=>T/F,'msg' => if false:  DBError/memberRoleExists )
        });
    });

    $app->group('/kiosk', function () use ($app) {

        $app->get('/ph', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $onboardUICtrl = new OnboardUIController();
            echo $onboardUICtrl->kioskInviteAndCheckin();
            exit();
        });
    });

    $app->group('/onboard', function () use ($app) {

        $app->group('/referral', function () use ($app) {

            $app->get('/healthcheck', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'text/plain');
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->healthCheck();
            });

            $app->get('/accept', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $ref_id = $_REQUEST['id'];
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->acceptReferral($app, json_encode(array('id' => $ref_id)));
                exit();
            });
        });

        $app->group('/profile', function () use ($app) {

            $app->get('/get', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->getProfileForOnboard();
                exit();
            });

            $app->post('/set', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $profile = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->setProfileForOnboard($profile);
                exit();
            });

            $app->get('/link_existingMember_toEnterprise/:memberid/:entid', function ($memberid,$entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $onboardUICtrl = new OnboardUIController();
                //echo "Testing...";
                echo $onboardUICtrl->test_link_existingMember_toEnterprise($memberid,$entid);
                exit();
            });

        });

        $app->group('/member', function () use ($app) {

            $app->get('/healthcheck', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'text/plain');
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->healthCheck();
            });

            $app->get('/dosgets', function () use ($app) {

                $onboardUICtrl = new OnboardUIController();
                $onboardUICtrl->goDosgets();

                $app->redirect('/cp/onboard-ui/app/index.html#/dosgets');
               
                exit();
            });

            $app->post('/dosgets-create-member', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsCreateMember($dosgets);
                exit();
            });

            $app->post('/dosgets-update-member', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsUpdateMember($dosgets);
                exit();
            });            

            $app->post('/dosgets-validate', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsPromoValidation($dosgets);
                exit();
            });

            $app->post('/dosgets-promo', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();                
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsPromo($dosgets);
                exit();
            });

            $app->get('/check-email', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'text/plain');
                $onboardUICtrl = new OnboardUIController();
                $email = json_encode($_REQUEST['email']);
                echo $onboardUICtrl->checkEmail($email);
            });

            $app->get('/check-phone', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'text/plain');
                $onboardUICtrl = new OnboardUIController();
                $phone = json_encode($_REQUEST['phone']);
                echo $onboardUICtrl->checkPhone($phone);
            });   


            $app->post('/dosgets-validate-1-step', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->goDosgetsValidate1Step($dosgets);
                exit();
            });

            $app->post('/dosgets-promo-1-step', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsPromo1Step($dosgets);
                exit();
            });

            $app->post('/dosgets-validate-2-step', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->goDosgetsValidate2Step($dosgets);
                exit();
            });

            $app->post('/dosgets-promo-2-step', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsPromo2Step($dosgets);
                exit();
            });

            $app->post('/dosgets-1-step-update', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsPromo1StepUpdate($dosgets);
                exit();
            });     


            $app->post('/dosgets-2-step-update', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsPromo2StepUpdate($dosgets);
                exit();
            }); 

            $app->post('/dosgets-create-roll', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsPromoRoll($dosgets);
                exit();
            });

            $app->post('/dosgets-update-roll', function () use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $dosgets = $app->request()->getBody();
                $onboardUICtrl = new OnboardUIController();
                echo $onboardUICtrl->dosgetsPromoRollUpdate($dosgets);
                exit();
            });                                    

        });

    });

    $app->get('/dosgets', function () use ($app) {

        $onboardUICtrl = new OnboardUIController();
        $onboardUICtrl->goDosgets('dosgets');
        if(isset($_REQUEST['t'])) {
            $onboardUICtrl->goMakeCookie($_REQUEST['t'], 'dosgets');
        }
        $app->redirect('/cp/onboard-ui/app/index.html#/dosgets');
       
        exit();
    });


    $app->get('/dosgets-1-step', function () use ($app) {

        $onboardUICtrl = new OnboardUIController();
        $onboardUICtrl->goDosgets('dosgets-1-step');
        if(isset($_REQUEST['t'])) {
            $onboardUICtrl->goMakeCookie($_REQUEST['t'], 'dosgets-1-step');
        }
        $app->redirect('/cp/onboard-ui/app/index.html#/dosgets-1-step');
       
        exit();
    });

    $app->get('/dosgets-2-step', function () use ($app) {

        $onboardUICtrl = new OnboardUIController();
        $onboardUICtrl->goDosgets('dosgets-2-step');
        if(isset($_REQUEST['t'])) {
            $onboardUICtrl->goMakeCookie($_REQUEST['t'], 'dosgets-2-step');
        }
        $app->redirect('/cp/onboard-ui/app/index.html#/dosgets-2-step');
       
        exit();
    });

    $app->group('/onb', function () use ($app) {

        $app->get('/getdata', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            echo $onboardUICtrl->getConfigData($_REQUEST['path']);
            exit();
        });        

        $app->get('/config', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $onboardUICtrl = new OnboardUIController();
            echo $onboardUICtrl->getAllConfigs();
            exit();
        });

        $app->get('/dosgetsf1', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetsf1?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetsf1');
            }
            exit();
        });

        $app->get('/dosgetsf2', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetsf2?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetsf2');
            }
            exit();
        });

        $app->get('/dosgetsf3', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetsf3?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetsf3');
            }
            exit();
        });

        $app->get('/dosgetsf4', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetsf4?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetsf4');
            }
            exit();
        });

        $app->get('/dosgetst1', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetst1?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetst1');
            }
            exit();
        });

        $app->get('/dosgetst2', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetst2?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetst2');
            }
            exit();
        });

        $app->get('/dosgetst3', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetst3?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetst3');
            }
            exit();
        });

        $app->get('/dosgetsl1', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetsl1?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetsl1');
            }
            exit();
        });

        $app->get('/dosgetsl2', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgetsl2?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgetsl2');
            }
            exit();
        });

        $app->get('/dosgets', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            if(isset($_REQUEST['t'])) {
                $app->redirect('/onb/dsgs/dosgets?t=' . $_REQUEST['t']);
            }
            else {
                $app->redirect('/onb/dsgs/dosgets');
            }
            // $app->redirect($onboardUICtrl->goMakeCookie($_REQUEST['t'], 'dosgets'));
            exit();
        });

        $app->get('/dosgets-1-step', function () use ($app) {

            $onboardUICtrl = new OnboardUIController();
            $onboardUICtrl->goDosgets('dosgets-1-step');
            if(isset($_REQUEST['t'])) {
                $onboardUICtrl->goMakeCookie($_REQUEST['t'], 'dosgets-1-step');
            }
            $app->redirect('/cp/onboard-ui/app/index.html#/dosgets-1-step');
           
            exit();
        });

        $app->get('/dosgets-2-step', function () use ($app) {

            $onboardUICtrl = new OnboardUIController();
            $onboardUICtrl->goDosgets('dosgets-2-step');
            if(isset($_REQUEST['t'])) {
                $onboardUICtrl->goMakeCookie($_REQUEST['t'], 'dosgets-2-step');
            }
            $app->redirect('/cp/onboard-ui/app/index.html#/dosgets-2-step');
           
            exit();
        });

        $app->get('/dosgetspr', function () use ($app) {
            $onboardUICtrl = new OnboardUIController();
            $onboardUICtrl->goDosgets('dosgetspr');
            if(isset($_REQUEST['t'])) {
                $app->redirect($onboardUICtrl->goMakeCookie($_REQUEST['t'], 'dosgetspr'));
            }
            else {
                $app->redirect('/cp/onboard-ui/app/index.html#/dosgetspr');
            }
            exit();
        });

        $app->get('/dsgs/:name', function ($name) use ($app) {
            $onboardUICtrl = new OnboardUIController();    
            if(isset($_REQUEST['t'])) {
                $app->redirect($onboardUICtrl->goDosgetsReferral($name, $_REQUEST['t']));
            }
            else {
                $app->redirect($onboardUICtrl->goDosgets($name));
            }             
            exit();
        });        

    });

?>