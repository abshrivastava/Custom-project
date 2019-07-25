'use strict';

angular.module('app.dev-tools', ['app.dev-tools-service'])

.controller('DevToolsCtrl', ['$scope', '$q', '$state', 'devToolsService', 
    function($scope, $q, $state, devToolsService) {
    const vm = $scope;
    vm.isLogin = isLogin;
    vm.goTo = goTo;
    vm.toggleLight = toggleLight;
    vm.openCamera = openCamera;
    vm.vibrate = vibrate;
    vm.openScanner = openScanner;
    vm.updateConfig = updateConfig;
    vm.addConfig = addConfig;
    vm.sendBulkSms = sendBulkSms;
    vm.getReferralStatuses = getReferralStatuses;
    vm.sendBulkInvites = sendBulkInvites;
    vm.getPromos = getPromos;
    vm.getEnterprises = getEnterprises;
    vm.savePromoRank = savePromoRank;
    vm.saveEnterpriseRank = saveEnterpriseRank;
    vm.updatePromoPriority = updatePromoPriority;
    vm.sendDailyReport = sendDailyReport;
    vm.sendDailyReportWeek = sendDailyReportWeek;
    vm.inactivatePromoRank = inactivatePromoRank;
    vm.inactivateEnterpriseRank = inactivateEnterpriseRank;
    vm.sendOutEmail = sendOutEmail;
    vm.sendMeVariableReport = sendMeVariableReport;


  	init();

    // ******************************

  	function init() {
      // isLogin();
      // this is to highlight the nav bar
      vm.navValue = 'dev-tools';
      vm.reportmember = {};
      vm.reportmember.entid = 1;
      vm.toggle = false;
      vm.sendEmail = {};
      
      $q.all({
        //initialData: devToolsService.getDevToolsInitialData()
        enterprises: devToolsService.getAllEnterprises(),
        appConfigs : devToolsService.getAppConfigAll()
      })
      .then(function (res) {
        vm.enterprises = res.enterprises;
        //vm.initialData = res.initialData;
        vm.appConfigs = res.appConfigs;
      });

      devToolsService.getPromoRankings()
        .then(function(response) {
          vm.promoRankings = response;
        });
      devToolsService.getEnterpriseRankings()
        .then(function(response) {
          vm.enterpriseRankings = response;
        });
      devToolsService.getStickies()
        .then(function(response) {
          vm.stickies = response;
        });
    }


    function sendBulkSms() {

      devToolsService.sendBulkSms(vm.bulkSms)
        .then(function(response){
          if(response.success){
            // done
          }
          
        });
    }

    function getPromos() {

      devToolsService.getPromos(vm.promo.name)
        .then(function(response) {
          vm.promos = response;
        });
    }

    function getEnterprises() {

      devToolsService.getEnterprises(vm.enterprise.name)
        .then(function(response) {
          vm.enterprises = response;
        });
    }

    function savePromoRank(promo) {

      if (promo.rankCreated) {
        // If a prior rank exists for this promo
        devToolsService.updatePromoRank(promo)
        .then(function(response) {
          // Update list of ranks on page
          devToolsService.getPromoRankings()
            .then(function(response) {
              vm.promoRankings = response;
            });
        });
      } else {
        // If no prior rank exists for this promo

        // Sets rankCreated to true in the currently searched array
        vm.promos = vm.promos.map(function(promotion) {
          if (promotion.id == promo.id) promotion.rankCreated = true;
          return promotion;
        });

        console.log(vm.promos);
        var rank = {
          "priorityId": promo.id,
          "rank": promo.rank
        }
        devToolsService.createPromoRank(rank)
        .then(function(response) {
          // Update list of ranks on page
          devToolsService.getPromoRankings()
            .then(function(response) {
              vm.promoRankings = response;
            });
        });
      }
    }

    function inactivatePromoRank(promo) {
      console.log(promo);
      devToolsService.inactivateRank(promo)
        .then(function(response) {
          // Update list of ranks on page
          devToolsService.getPromoRankings()
          .then(function(response) {
            vm.promoRankings = response;
          });

          // Refresh the searched list values so rank is no longer created
          getPromos();
        });
    }

    function saveEnterpriseRank(enterprise) {
      
      if (enterprise.rankCreated) {

        // If a prior rank exists for this enterprise
        devToolsService.updateEnterpriseRank(enterprise)
        .then(function(response) {
          // Update list of ranks on page
          devToolsService.getEnterpriseRankings()
            .then(function(response) {
              vm.enterpriseRankings = response;
            });
        });
      } else {
        // If no prior rank exists for this enterprise

        // Sets rankCreated to true in the currently searched array
        vm.enterprises = vm.enterprises.map(function(ent) {
          if (ent.ent_id == enterprise.ent_id) ent.rankCreated = true;
          return ent;
        });

        var rank = {
          "priorityId": enterprise.ent_id,
          "rank": enterprise.rank
        }
        devToolsService.createEnterpriseRank(rank)
        .then(function(response) {
          // Update list of ranks on page
          devToolsService.getEnterpriseRankings()
            .then(function(response) {
              vm.enterpriseRankings = response;
            });
        });
      }
    }

    function inactivateEnterpriseRank(enterprise) {
      devToolsService.inactivateRank(enterprise)
        .then(function(response) {
          // Update list of ranks on page
          devToolsService.getEnterpriseRankings()
          .then(function(response) {
            vm.enterpriseRankings = response;
          });

          // Refresh the searched list values
          getEnterprises();
        });
    }

    function updatePromoPriority(promo, priority) {
      promo.priority = priority;
      devToolsService.updatePromoPriority(promo)
        .then(function(response) {
          devToolsService.getStickies()
          .then(function(response) {
            vm.stickies = response;
          });
        });
    }

    function isLogin(){
      devToolsService.isLogin()
        .then(function(response){
          if(response.isLogin == false){
            if($state.$current.name != 'command-login')
              goTo('command-login');
          }
          
        });
    }

    function goTo(state) {
      $state.go(state);
    }

    function updateConfig(config) {
      devToolsService.updateConfig(config)
        .then(function(response){

        });
    }

    function addConfig(config) {
      devToolsService.addConfig(config)
        .then(function(response){

        });
    }

    function getReferralStatuses() {
      devToolsService.getReferralStatuses(vm.member.email)
        .then(function(response){
          vm.referrals = response['referrals'];

        });
    }

    function sendBulkInvites() {
      devToolsService.sendBulkInvites(vm.bulkEmail)
        .then(function(response){
           //done

        });
    }

    function sendDailyReport() {
      vm.showBusy = true;
      devToolsService.sendDailyReport(vm.reportmember)
        .then(function (response) {
          vm.showBusy = false;
        });
    }

    function sendDailyReportWeek() {
      vm.showBusy = true;
      devToolsService.sendDailyReportWeek(vm.reportmember)
        .then(function (response) {
          vm.showBusy = false;
        });
    }    

    function sendOutEmail() {
      vm.showBusy = true;
      devToolsService.sendOutEmail(vm.sendEmail)
        .then(function (response) {
          vm.showBusy = false;
        })
    }

    function sendMeVariableReport() {
      // vm.showBusy = true;
      console.log(vm.report);

      var date = new Date(vm.report.start);
      vm.report.start = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime();

      date = new Date(vm.report.end);
      vm.report.end = (new Date(date.getFullYear(), date.getMonth(), date.getDate())).getTime();
      
      if(vm.report.start && vm.report.end && vm.report.entid) {
        devToolsService.getRangedReport(vm.report)
          .then(function (response) {
            vm.showBusy = false;
            console.log(response);
          })        
      }
    }



















    /*
    **************** mobile stuff below *********************************
    */

    function toggleLight(){
      vm.toggle = !vm.toggle;

      document.addEventListener("deviceready", function () {


        if(vm.toggle == true) {
          $cordovaFlashlight.switchOn()
            .then(
              function (success) { /* success */ },
              function (error) { /* error */ });
        }
        else {
           $cordovaFlashlight.switchOff()
            .then(
              function (success) { /* success */ },
              function (error) { /* error */ });
        }

      }, false);

    }


    function openScannerSms(){
      document.addEventListener("deviceready", function () {
          $cordovaBarcodeScanner
            .scan({
                showFlipCameraButton : true // iOS and Android
            })
            .then(function(barcodeData) {

              var p = {
                "promo" : {
                  "id" : "126",
                  "entid": "1",
                  "promo_type": "carepoynt1_5875172c20881",
                  
                },
                "mid" : barcodeData.text
              };

              devToolsService.scanPromotion(p)
                .then(function(response){

                });

              // Success! Barcode data is here
              // alert("Text: " + barcodeData.text);
              // alert("Format: " + barcodeData.format);
              // alert("Cancelled: " + barcodeData.cancelled);
               
            }, function(error) {
              alert(error);
              // An error occurred
            });

     

        }, false);

    }

    function openScanner(){
      document.addEventListener("deviceready", function () {
          $cordovaBarcodeScanner
            .scan({
                showFlipCameraButton : true // iOS and Android
            })
            .then(function(barcodeData) {

              var p = {
                "promo" : {
                  "id" : "126",
                  "entid": "1",
                  "promo_type": "carepoynt1_5875172c20881",
                  
                },
                "mid" : barcodeData.text
              };

              devToolsService.scanPromotion(p)
                .then(function(response){

                });

              // Success! Barcode data is here
              // alert("Text: " + barcodeData.text);
              // alert("Format: " + barcodeData.format);
              // alert("Cancelled: " + barcodeData.cancelled);
               
            }, function(error) {
              alert(error);
              // An error occurred
            });

      //       {
      //     preferFrontCamera : true, // iOS and Android
      //     showFlipCameraButton : true, // iOS and Android
      //     showTorchButton : true, // iOS and Android
      //     torchOn: true, // Android, launch with the torch switched on (if available)
      //     prompt : "Place a barcode inside the scan area", // Android
      //     resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      //     formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      //     orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      //     disableAnimations : true // iOS
      // }

        }, false);

    }


    function vibrate(){
      document.addEventListener("deviceready", function () {

          $cordovaVibration.vibrate(500);

        }, false);

    }

    function openCamera(){

      document.addEventListener("deviceready", function () {

        var options = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: true,
          encodingType: Camera.EncodingType.JPEG,
          targetWidth: 100,
          targetHeight: 100,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: false,
        correctOrientation:true
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
          var image = document.getElementById('myImage');
          image.src = "data:image/jpeg;base64," + imageData;
        }, function(err) {
          // error
        });

      }, false);


    }

    

}]);