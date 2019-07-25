'use strict';

angular.module('app.dev-tools', ['app.dev-tools-service'])

.controller('DevToolsCtrl', ['$scope', '$q', '$state', 'devToolsService', '$cordovaFlashlight', '$cordovaVibration', '$cordovaCamera', '$cordovaBarcodeScanner', 
    function($scope, $q, $state, devToolsService, $cordovaFlashlight, $cordovaVibration, $cordovaCamera, $cordovaBarcodeScanner) {
    const vm = $scope;
    vm.isLogin = isLogin;
    vm.goTo = goTo;
    vm.toggleLight = toggleLight;
    vm.openCamera = openCamera;
    vm.vibrate = vibrate;
    vm.openScanner = openScanner;



  	init();

    // ******************************

  	function init() {
      // isLogin();
      // this is to highlight the nav bar
      vm.navValue = 'dev-tools';

      vm.toggle = false;
      
      $q.all({
        //initialData: devToolsService.getDevToolsInitialData()
      })
      .then(function (res) {
        //vm.initialData = res.initialData;
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
alert("Text: " + barcodeData.text);

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