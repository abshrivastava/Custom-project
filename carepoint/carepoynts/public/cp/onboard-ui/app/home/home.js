'use strict';

angular.module('home', ['app.onboard-service'])

.controller('homeCtrl', ['$scope', '$q', '$http', '$window', 'onboardService', function($scope, $q, $http, $window, onboardService) {
    const vm = $scope;

    vm.configData = {};

    init();

    // ******************************

    function init() {

        onboardService.getConfigData()
            .then( function(response) {
                console.log(response);
                vm.configData = response;
            });
            
            console.log($window.location);
    }

}]);


// just save it here for now in case we need it
// {
//   "dosgets": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgets",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook1.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetsf1": {
//     "landingPage": false,
//     "type": "3s",
//     "name": "dosgetsf1",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook1.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetsf2": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgetsf2",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook2.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetsf3": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgetsf3",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook3.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetsf4": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgetsf4",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook4.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetsl1": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgetsl1",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook4.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetsl2": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgetsl2",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook4.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetst1": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgetst1",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook4.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetst2": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgetst2",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook4.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "dosgetst3": {
//     "landingPage": true,
//     "type": "3s",
//     "name": "dosgetst3",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook4.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "1s5cp": {
//     "landingPage": true,
//     "type": "1s",
//     "name": "1s5cp",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook4.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "2s5cp": {
//     "landingPage": true,
//     "type": "2s",
//     "name": "2s5cp",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook4.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   },
//   "pr5cp": {
//     "landingPage": true,
//     "type": "1p",
//     "name": "5prcp",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "607",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook1.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/national/target.png",
//       "/assets/onboard/img/national/amazon.png",
//       "/assets/onboard/img/national/starbucks.png",
//       "/assets/onboard/img/national/cvspharmacy.png"
//     ]
//   },
//   "pr10cp": {
//     "landingPage": true,
//     "type": "1p",
//     "name": "pr10cp",
//     "entId": "1",
//     "entName": "Carepoynt",
//     "promoId": "607",
//     "poynts": "1000",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/facebook1.jpg",
//     "giftCardUrls": [
//       "/assets/onboard/img/national/target.png",
//       "/assets/onboard/img/national/amazon.png",
//       "/assets/onboard/img/national/starbucks.png",
//       "/assets/onboard/img/national/cvspharmacy.png"
//     ]
//   },
//   "1s5pv": {
//     "landingPage": true,
//     "type": "ptnr",
//     "name": "1s5cp",
//     "entId": "3",
//     "entName": "PorroVita",
//     "promoId": "605",
//     "poynts": "500",
//     "dollars": "5",
//     "imgUrl": "/assets/onboard/img/local/porrovita.png",
//     "giftCardUrls": [
//       "/assets/onboard/img/local/amazon.png",
//       "/assets/onboard/img/local/hylunia.png",
//       "/assets/onboard/img/local/porrovita.png",
//       "/assets/onboard/img/local/target.png"
//     ]
//   }
// }

