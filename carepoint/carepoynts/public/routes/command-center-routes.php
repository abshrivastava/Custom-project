<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_REWARDS_CONTROLLER.'command-center-controller.php';

$app->group('/command-center', function () use ($app) {

    $app->get('/healthcheck', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'text/plain');
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->healthCheck();
    });

    $app->get('/islogin', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->isLogin();
    });

    $app->post('/command-login', function () use ($app) {  
        $app->response()->headers->set('Content-Type', 'application/json');
        $creds = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->login($creds);
    });

    $app->get('/yelp/search', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $location = $_REQUEST['location'];
        $term = $_REQUEST['term'];
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->searchYelp($location, $term);
    });

    $app->get('/yelp/business/:id', function ($id) use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->getBusinessYelp($id);
    });

    $app->post('/invite/phone/', function () use ($app) {
        //$app->response()->headers->set('Content-Type', 'application/json');
        $commandCenterCtrl = new CommandCenterController();
        //file_put_contents(DIR_LOG . '/PDOErrors.txt', $app->request()->getBody(), FILE_APPEND);
        $phone = json_decode($app->request()->getBody(), true);
        echo $commandCenterCtrl->onb_carepoynt_by_phone($phone['phone']);
    });

    $app->post('/member/deactivate/', function () use ($app) {
        //$app->response()->headers->set('Content-Type', 'application/json');
        $commandCenterCtrl = new CommandCenterController();
        //file_put_contents(DIR_LOG . '/PDOErrors.txt', $app->request()->getBody(), FILE_APPEND);
        $uid = json_decode($app->request()->getBody(), true);
        echo $commandCenterCtrl->deactivateMember($uid['uid']);
    });

    $app->post('/transfer', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $transfer = $app->request()->getBody();
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->transferPoynts($transfer);
        });

    $app->post('/transferPoyntsMemToEnt', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $transfer = $app->request()->getBody();
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->transferPoyntsMemToEnt($transfer);
        });
    

    $app->post('/ent-transfer', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $transfer = $app->request()->getBody();
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->transferEntPoynts($transfer);
        });

    $app->post('/sendreport', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $data = $app->request()->getBody();
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->sendInviteReport($data);
        });

    $app->get('/getreferralstatuses', function () use ($app) {
        //$app->response()->headers->set('Content-Type', 'application/json');
        $email = $_REQUEST['email'];
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->getReferralStatuses(json_encode(array('email' => $email)));
    });

    $app->get('/sendEmailsByCsv', function () use ($app) {
        //$app->response()->headers->set('Content-Type', 'application/json');
        $name = $_REQUEST['name'];
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->sendEmailsByCsv($_REQUEST['name']);
    });   
                   
    $app->post('/variablePointEarn', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $data = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->variablePromotionEarnForMemberId($data);
    }); 

    $app->post('/send-out-email', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $data = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->sendOutEmail($data);
    }); 

    // {
    // "entid": 280, 
    // "promo_type": "variable_promotion",
    // "amount": 5,
    // "mid": 2076
    // }
    
    $app->post('/get-ranged-report', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $data = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->getRangedReport($data);
    }); 

    $app->post('/send-ranged-report', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $data = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->sendVariableReportEmail($data);
    }); 



    $app->group('/enterprise', function () use ($app) {

        $app->get('/all', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getAllEnterprisesAllTypes();
        });      

        $app->post('/add', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $enterprise = $app->request()->getBody();
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->addEnterprise($enterprise);
        });

        $app->post('/update', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $enterprise = $app->request()->getBody();
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->updateEnterprise($enterprise);
        });

        $app->get('/promotions', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $id = $_REQUEST['id'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getPromotionsByEnterpriseId($id);
            exit();
        });

        $app->get('/redemptions', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $id = $_REQUEST['id'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getRedemptionsByEnterpriseId($id);
            exit();
        });

        $app->get('/members', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $eid = $_REQUEST['eid'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getEnterpriseMembers($eid);
            exit();
        });

        $app->post('/photo-upload', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            // $enterprise = json_decode($app->request()->getBody(), true);
            $entid = $_REQUEST['entid'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->enterprisePhotoUpload($entid);

        });

        $app->post('/profile-photo-upload', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            // $enterprise = json_decode($app->request()->getBody(), true);
            $entid = $_REQUEST['entid'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->enterpriseProfilePhotoUpload($entid);
        });

        $app->post('/logo-photo-upload', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            // $enterprise = json_decode($app->request()->getBody(), true);
            $entid = $_REQUEST['entid'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->enterpriseLogoPhotoUpload($entid);
        });
    });

    $app->get('/feature-toggle', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->getFeatureToggles();
        
    });

    $app->post('/feature-toggle/update', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $features = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->updateFeatureToggles($features);
    });

    $app->get('/barcode', function () use ($app) {
        // $app->response()->headers->set('Content-Type', 'application/json');
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->generateUserBarcode();
        
    });

    $app->post('/promotion/scan', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');

        $promoScan = json_decode($app->request()->getBody(), true);
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->promotionEarnForMemberId(json_encode($promoScan['promo']), $promoScan['mid']);
    });


    $app->post('/promotion/update', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $promo = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->updateCarepoyntPromotion($promo);
    });

    $app->post('/redemption/update', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $redemption = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->updateCarepoyntRedemption($redemption);
    });

    $app->get('/app-config/all', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        // $promo = json_decode($app->request()->getBody(), true);

        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->getAppConfigAll();
    });

    $app->post('/app-config/add', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $config = $app->request()->getBody();
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->addAppConfig($config);
    });

    $app->post('/app-config/update', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $config = $app->request()->getBody();
        
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->updateAppConfig($config);
    });
    
    $app->post('/send-bulk-sms', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $smsBulk = $app->request()->getBody();
        
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->sendBulkSms($smsBulk);
    });

    $app->post('/send-bulk-email', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $emailBulk = $app->request()->getBody();
        
        $commandCenterCtrl = new CommandCenterController();
        echo $commandCenterCtrl->sendBulkInvites($emailBulk);
    });


    $app->group('/member', function () use ($app) {

        $app->get('/detail/:mid', function ($mid) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getMemberDetail($mid);
        });

        $app->get('/transactions/:mid', function ($mid) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getMemberTransactions($mid);
        });
    });

    $app->group('/report', function () use ($app) {

        $app->get('/members/data', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $eid = $_REQUEST['eid'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getReportMembersDetail($eid);
        });

        $app->get('/referral/data', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getReferralData();
        });

        $app->get('/transaction/data', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            $eid = $_REQUEST['eid'];
            echo $commandCenterCtrl->getTransactionData($eid);
        });

        $app->get('/promotion/data', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getMemberDetail();
        });

        $app->get('/redemption/data', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getMemberDetail();
        });

        $app->get('/giftcard/data', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getMemberTransactions();
        });

        $app->get('/member-poynts/data', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getReportMemberData();
        });

        $app->get('/poynts/data', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $eid = $_REQUEST['eid'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getTotalPoynts($eid);
        });

        $app->post('/enterprise/poynts', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $data = $app->request()->getBody();
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getEnterpriseDayWisePoynts($data);
        });

        $app->get('/reports', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getReports();
        });

        $app->get('/metadata', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getReportMetadata();
        });

        $app->get('/members/daily', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $eid = $_REQUEST['eid'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getMemberReportLast2Weeks($eid);
        });

        $app->get('/send-daily', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            $email = $_REQUEST['email'];
            $entid = $_REQUEST['entid'];
            echo $commandCenterCtrl->sendMeDailyReport($email, $entid);
        });
        
        $app->get('/send-daily-week', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            $data = $app->request()->getBody();
            $email = $_REQUEST['email'];
            $entid = $_REQUEST['entid'];
            echo $commandCenterCtrl->sendDailyReportWeek($email, $entid);
        });

        $app->get('/logins/daily/all', function () use ($app) {
            
            $app->response()->headers->set('Content-Type', 'application/json');
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getAllDailyMemberLogins();
        });

        $app->get('/get-ent-report', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $entid = $_REQUEST['entid'];
            $day = $_REQUEST['day'];
            $commandCenterCtrl = new CommandCenterController();
            echo $commandCenterCtrl->getEnterpriseReportDetails($entid, $day);
        });

        $app->group('/promotions/particular', function () use ($app) {
            
            $app->get('/yesterday/:promoId', function ($promoId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getParticularPromotionCompletedYesterday($promoId);
            });

            $app->get('/week/:promoId', function ($promoId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getParticularPromotionCompletedWeek($promoId);
            });

            $app->get('/month/:promoId', function ($promoId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getParticularPromotionCompletedMonth($promoId);
            });

            $app->get('/range/:start/:end/:promoId', function ($start, $end, $promoId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getParticularPromotionCompletedRanged($promoId, $start, $end);
            });
        });

        $app->group('/promotions/all', function () use ($app) {
            
            $app->get('/yesterday/:entId', function ($entId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getPromotionsCompletedYesterday($entId);
            });

            $app->get('/week/:entId', function ($entId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getPromotionsCompletedWeek($entId);
            });

            $app->get('/month/:entId', function ($entId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getPromotionsCompletedMonth($entId);
            });

            $app->get('/range/:start/:end/:entId', function ($start, $end, $entId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getPromotionsCompletedRanged($entId, $start, $end);
            });
        });

        $app->group('/redemptions/particular', function () use ($app) {
            
            $app->get('/yesterday/:redemId', function ($redemId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getParticularRedemptionCompletedYesterday($redemId);
            });

            $app->get('/week/:redemId', function ($redemId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getParticularRedemptionCompletedWeek($redemId);
            });

            $app->get('/month/:redemId', function ($redemId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getParticularRedemptionCompletedMonth($redemId);
            });

            $app->get('/range/:start/:end/:redemId', function ($start, $end, $redemId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getParticularRedemptionCompletedRanged($redemId, $start, $end);
            });
        });

        $app->group('/redemptions/all', function () use ($app) {
            
            $app->get('/yesterday/:entId', function ($entId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getRedemptionsCompletedYesterday($entId);
            });

            $app->get('/week/:entId', function ($entId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getRedemptionsCompletedWeek($entId);
            });

            $app->get('/month/:entId', function ($entId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getRedemptionsCompletedMonth($entId);
            });

            $app->get('/range/:start/:end/:entId', function ($start, $end, $entId) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getRedemptionsCompletedRanged($entId, $start, $end);
            });
        });

        $app->group('/members/new', function () use ($app) {

            $app->get('/yesterday/:entid', function ($entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getDailyNewMembersYesterday($entid);
            });

            $app->get('/week/:entid', function ($entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getDailyNewMembersWeek($entid);
            });

            $app->get('/month/:entid', function ($entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getDailyNewMembersMonth($entid);
            });

            $app->get('/range/:start/:end/:entid', function ($start, $end, $entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getDailyNewMembersRanged($entid, $start, $end);
            });
        });

        $app->group('/transactions/all', function () use ($app) {

            $app->get('/yesterday/:entid', function ($entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getAllTransactionsYesterday($entid);
            });

            $app->get('/week/:entid', function ($entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getAllTransactionsWeek($entid);
            });

            $app->get('/month/:entid', function ($entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getAllTransactionsMonth($entid);
            });

            $app->get('/range/:start/:end/:entid', function ($start, $end, $entid) use ($app) {
                $app->response()->headers->set('Content-Type', 'application/json');
                $commandCenterCtrl = new CommandCenterController();
                echo $commandCenterCtrl->getAllTransactionsRanged($entid, $start, $end);
            });
        });
    });
    

});

?>