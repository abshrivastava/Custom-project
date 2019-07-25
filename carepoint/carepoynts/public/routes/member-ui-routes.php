<?php

require_once dirname($_SERVER["DOCUMENT_ROOT"]) . "/config/appConfig.php";
require_once DIR_REWARDS_CONTROLLER.'member-ui-controller.php';
require_once DIR_REWARDS_CONTROLLER.'review-ui-controller.php';



$app->group('/rewards', function () use ($app) {

    $app->group('/mem', function () use ($app) {  

        $app->get('/dashboard/init', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getDashboardInitialData();
            exit();
        });

        $app->get('/enterprises', function () use ($app) {

            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getMemberEnterprises();
            exit();
        });

        $app->post('/profile/save', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $member = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->updateCPMemberOnly($member);
            exit();
        });

        $app->get('/barcode', function () use ($app) {
            // $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->generateUserBarcode();
            exit();
        });

        $app->get('/get', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getMember();
            exit();
        });

        $app->get('/steps-today', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getMemberStepsToday();
            exit();
        });

        $app->get('/humanapi', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getHumanApiProfile();
            exit();
        });

        $app->get('/onboardUrl', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getOnboardUrl();
            exit();
        });

        $app->post('/help', function () use ($app) {
           // $app->response()->headers->set('Content-Type', 'application/json');
            $data = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->sendMemberEmail($data);
            exit();
        });

        $app->post('/getPoyntsLog', function () use ($app) {
            $data = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getMemberPoyntsLog($data);
            exit();
        });

        $app->post('/getMemberGiftCardData', function () use ($app) {
            $data = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getMemberGiftCardData($data);
            exit();
        });
        
        $app->post('/referbusiness', function () use ($app) {
           // $app->response()->headers->set('Content-Type', 'application/json');
            $data = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->sendReferralEmail($data);
            exit();
        });

        $app->get('/getMemberAddToHomescreenTag', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getMemberAddToHomescreenTag();
            exit();
        });

        $app->post('/createAddToHomeTag', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $tag = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->createAddToHomeTag($tag);
        });

        $app->get('/:id', function ($id) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getMember($id);
            exit();
        }); 

        /* For updating Voucher Status */
        $app->post('/update-voucher', function () use ($app) {
            $data = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->updateVoucherStatus($data);
            exit();
        });

        /* For Showing Up Voucher Activate Page */
            $app->get('/get-voucher-detail/:id', function ($id) use ($app) {
                $memberUICtrl = new MemberUIController();
                echo $memberUICtrl->getVoucherDetail($id);
                exit();
        });

         /* update user preference in cp_member_tags */    
        $app->post('/update-voucher-memberTag', function () use ($app) {
            $data = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->updateMemberTagForHidingVoucherModal($data);
            exit();
        });  

        /* For Bypassing Modal Pop Up while Voucher Redemption */
        $app->post('/get-voucher-memberTag', function () use ($app) {
            $data = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getVoucherModalBypassInfoFromMemberTag($data);
            exit();
        }); 

        $app->post('/referFriend', function () use ($app) {
                $data = $app->request()->getBody();
                $memberUICtrl = new MemberUIController();
                echo $memberUICtrl->referFriend($data);
                exit();
        }); 

        

    });


    $app->group('/ent', function () use ($app) {

        

        $app->get('/company-details/:id/init', function ($id) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getEnterpriseInitialData($id);
            exit();
        });

        $app->get('/offers', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $id = $_REQUEST['id'];
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getEnterpriseOffers($id);
            exit();
        });

        $app->get('/promotions', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $id = $_REQUEST['id'];
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getPromotionsByEnterpriseId($id);
            exit();
        });

        
        $app->get('/redemptions', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $id = $_REQUEST['id'];
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getRedemptionsByEnterpriseId($id);
            exit();
        });

        $app->post('/joyn', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $enterprise = $app->request()->getBody();
            $entid = json_decode($enterprise, true)['ent_id'];
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->joynEnterprise($entid);
            exit();
        });

        $app->get('/isMember', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $entid = $_REQUEST['entid'];
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->isEnterpriseMember($entid);
            exit();
        });


        

        // this has to go at the end otherwise it will match first and others will not get evaluated
        $app->get('/:id', function ($id) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getEnterprise($id);
            exit();
        });

    });

    $app->group('/promo', function () use ($app) {

        $app->get('/fetchinvite', function () use ($app) {            
            $app->response()->headers->set('Content-Type', 'application/json');            
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getInvitedMemberList();
            exit();
        });

        $app->get('/:id', function ($id) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getPromotion($id);
            exit();
        });

        $app->post('/earn', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $promo = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->promotionEarn($promo);
        });

        $app->post('/rating', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $promo = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->promotionRating($promo);
        });

        $app->post('/social-rating', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $promo = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->earnSocialReviewPromotion($promo);
        });

        $app->post('/referral', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $promoReferral = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->promotionReferral($promoReferral);
        });

             
    });

    $app->group('/redemption', function () use ($app) {

        $app->get('/:id', function ($id) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getRedemption($id);
            exit();
        });

        $app->post('/redeem', function () use ($app) {
            $memberUICtrl = new MemberUIController();

            $isOnboardFully = $memberUICtrl->isOnboardFully();
            if(json_decode($memberUICtrl->isOnboardFully(), true)['success'] == false){
                echo $isOnboardFully;
                exit();
            }

            $app->response()->headers->set('Content-Type', 'application/json');
            $redemption = $app->request()->getBody();
            echo $memberUICtrl->redemptionRedeem($redemption);
            exit();
        });

        $app->get('/gc/can-redeem', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->checkIsEligibleRedeemGiftCard();
            exit();
        });


        // $app->post('/earn', function () use ($app) {
        //     $app->response()->headers->set('Content-Type', 'application/json');
        //     $promo = $app->request()->getBody();
        //     $memberUICtrl = new MemberUIController();
        //     echo $memberUICtrl->promotionEarn($promo);
        // });

        $app->get('/tango/cp-options', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getCPTangoOptions();
        });

        $app->post('/tango/gc-offer', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $order = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();

            $isOnboardFully = $memberUICtrl->isOnboardFully();
            if(json_decode($memberUICtrl->isOnboardFully(), true)['success'] == false){
                echo $isOnboardFully;
                exit();
            }

            echo $memberUICtrl->redeemGiftCard($order);
            exit();
        });

    });

    $app->group('/clique', function () use ($app) {

        $app->get('/my-clique', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getMyClique();
            exit();
        });

        $app->get('/my-cliques/all', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getAllMyCliques();
            exit();
        });

        $app->get('/cid/:id', function ($id) use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getCliqueById($id);
            exit();
        });

        $app->post('/create', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $clique = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->createClique($clique);
        });

        $app->post('/add-dependent', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $dependent = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->addDependentToClique($dependent);
        });

        $app->post('/member/invite', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $invite = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->inviteMemberToClique($invite);
        });

        $app->post('/member/remove', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $cliqueMember = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->removeFromClique($cliqueMember);
        });

        $app->post('/transfer', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $transfer = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->transferCliquePoynts($transfer);
        });

        $app->post('/deactivate', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $clique = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->deactivateClique($clique);
        });

        $app->post('/invite/accept', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $clique = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->acceptCliqueInvite($clique);
        });

        $app->post('/invite/deny', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $clique = $app->request()->getBody();
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->denyCliqueInvite($clique);
        });
    });

    $app->get('/priority-offers', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $memberUICtrl = new MemberUIController();
        echo $memberUICtrl->getPriorityOffers();
        exit();
    });

    $app->get('/feature-toggles', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $memberUICtrl = new MemberUIController();
        echo $memberUICtrl->getFeatureToggles();
        exit();
    });

    $app->get('/logout', function () use ($app) {
        $memberUICtrl = new MemberUIController();
        $memberUICtrl->logout();
        header('location: /login');
        exit();
    });

    // Earn Page Code
    $app->get('/earn-offers', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getEarnOffers($location = $_REQUEST['location'], $keyword = "", $memberid = $_REQUEST['memberid']);
        });

    // Search Earn Page Code
    $app->get('/search-earn-offers', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $memberUICtrl = new MemberUIController();
        echo $memberUICtrl->getEarnOffers($location = $_REQUEST['location'], $keyword = $_REQUEST['keyword'], $memberid = $_REQUEST['memberid']);
        exit();
    });

    // Redeem Page Code
    $app->get('/redeem-offers', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getRedeemData($location = $_REQUEST['location'], $keyword = "", $memberid = $_REQUEST['memberid']);
        });
    
    // Search Redeem Page Code
    $app->get('/search-redeem-offers', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');
        $memberUICtrl = new MemberUIController();
        echo $memberUICtrl->getRedeemData($location = $_REQUEST['location'], $keyword = $_REQUEST['txtSearch'], $memberid = $_REQUEST['memberid']);
        exit();
    });

    $app->group('/referral', function () use ($app) {

        $app->get('/getReferralLink', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $memberUICtrl = new MemberUIController();
            echo $memberUICtrl->getReferralLink();
            exit();
        }); 

    $app->get('/generateReferralCode', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');        
        $referralService = new ReferralService();
        echo $referralService->actionGenerateReferralCode();
    });

    });

    $app->post('/sendReminderInvite', function () use ($app) {
        $app->response()->headers->set('Content-Type', 'application/json');  
        $postReq = json_decode($app->request()->getBody());      
        $memberUICtrl = new MemberUIController();        
        echo $memberUICtrl->sendReminderInviteAction($postReq);
        exit();
    });

    $app->group('/rateReview', function () use ($app){
        
        $app->post('/submitReview', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $reviewData = json_decode($app->request()->getBody(),true);
            $reviewUICtrl = new ReviewUIController();
            echo $reviewUICtrl->submitReview($reviewData['entId'], $reviewData['rating'], $reviewData['comment']);
        });

        $app->get('/getAverageRatingOfEnterprise', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $reviewUICtrl = new ReviewUIController();                 
            echo $reviewUICtrl->getAverageRatingOfEnterprise($_REQUEST);
        });
        
        $app->get('/getReviewsOfEnterprise', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $reviewUICtrl = new ReviewUIController();                 
            echo $reviewUICtrl->getReviewsOfEnterprise($_REQUEST);
        });

        $app->get('/migrateOldRateReviewData', function () use ($app) {
            $app->response()->headers->set('Content-Type', 'application/json');
            $reviewUICtrl = new ReviewUIController();                
            echo $reviewUICtrl->migrateOldRateReviewData();
        });
       
    }); 

});

?>