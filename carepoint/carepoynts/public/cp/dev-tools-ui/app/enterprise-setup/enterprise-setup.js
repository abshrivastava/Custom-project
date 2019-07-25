angular.module('app.enterprise-setup', ['app.dev-tools-service'])


.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}])

.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, entid){

        var fd = new FormData();
        console.log(file);
        fd.append('file', file);
        fd.append('entid', entid);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(response){
         // console.log(response.name);   

        })
        .error(function(response){
           // console.log('ERR-img-uploaded');
           // console.log(response);
        });
    }
}])



.controller('EnterpriseSetupCtrl', ['$scope',  'fileUpload', '$q', '$state', 'devToolsService', '$filter', function($scope, fileUpload,  $q, $state, devToolsService, $filter) {
    const vm = $scope;
    vm.account;
    vm.doSearch = doSearch;
    vm.setEnterpriseData = setEnterpriseData;
    vm.selectEnt = selectEnt;
    vm.goBackToList = goBackToList;
    vm.cancelAdd = cancelAdd;
    vm.isLogin = isLogin;
    vm.goTo = goTo;
    vm.saveEnterprise = saveEnterprise;
    vm.getEnterprisePromotions = getEnterprisePromotions;
    vm.selectPromoData = selectPromoData;
    vm.updatePromotion = updatePromotion;
    vm.getEnterpriseRedemptions = getEnterpriseRedemptions;
    vm.selectRedemptionData = selectRedemptionData;
    vm.updateRedemption = updateRedemption;
    vm.addEnterprise = addEnterprise;
    vm.showAdd = showAdd;
    vm.onFileSelect = onFileSelect;
    vm.getEnterpriseTags = getEnterpriseTags;
    vm.createEnterpriseTag = createEnterpriseTag;
    vm.removeEnterpriseTag = removeEnterpriseTag;
    vm.makeAffiliate = makeAffiliate;


    init();


    // ******************************

    function init() {
      isLogin();
      // this is to highlight the nav bar
      vm.navValue = 'enterprise-setup';
      vm.showAddEnt = false;
      vm.showBusy = true;
      vm.search = {};
      vm.selectedEnt = null;
      vm.tags = {};
      $q.all({
        // initialData: tangoService.getInitialData(),
        enterprises: devToolsService.getAllEnterprises(),
        appConfigs : devToolsService.getAppConfigAll()
      })
      .then(function (response) {
        // vm.initialData = response.initialData;
        vm.enterprises = response.enterprises;
        vm.showBusy = false;
        vm.promoConfigs = $filter('filter')(response.appConfigs, {'name' : 'cp-custom-promos'});
        // vm.promosAppConfig = $filter('filter')(response.appConfigs, {'name' : 'cp-custom-promos'})[0];
        console.log(vm.appConfigs);
      });

    }

    function onFileSelect(type) {
      //var type = 'profile';
      var file = $scope.myFile;
      // devToolsService.entPhotoUpload(file)
      // .then(function (response) {
      vm.file = file;
      var ext = file.name.split('.').pop();
      // console.dir(file);
      // console.log(file.name);
      var uploadUrl = "";

      if (type == 'profile') {
        uploadUrl = "/command-center/enterprise/profile-photo-upload";
      }
      if (type == 'logo') {
        uploadUrl = "/command-center/enterprise/logo-photo-upload";
      }

      fileUpload.uploadFileToUrl(vm.file, uploadUrl, vm.selectedEnt.ent_id);

      // vm.selectedEnt.profile_photo = '/cp/img/company/' + vm.selectedEnt.ent_id +'_profile-photo.' + ext;



      // });    

    }

    function isLogin() {
      devToolsService.isLogin()
        .then(function(response){
          if(response.isLogin == false){
            if($state.$current.name != 'command-login'){
              goTo('command-login');
            }
          }
        });
    }

    function goTo(state) {
      $state.go(state);
    }

    function doSearch() {
      vm.showBusy = true;
      devToolsService.searchYelp(vm.search)
        .then(function (response) {
          vm.businesses = response.businesses;
          vm.showBusy = false;
        });
    }

    function getAllEnterprises() {
      devToolsService.getAllEnterprises()
        .then(function (response) {
          vm.enterprises = response;
        });
    }

    function setEnterpriseData(ent){

      vm.selectedEnt.ent_address = ent.location.address1;
      vm.selectedEnt.ent_city = ent.location.city;
      vm.selectedEnt.ent_state = ent.location.state;
      vm.selectedEnt.ent_zip = ent.location.zip_code;
      vm.selectedEnt.geo_long = ent.coordinates.longitude;
      vm.selectedEnt.geo_lat = ent.coordinates.latitude;
      vm.selectedEnt.ent_phone = ent.display_phone;
    }

    function selectEnt(ent) {
      vm.selectedEnt = ent;
    }

    function goBackToList(){
      vm.selectedEnt = null;
      vm.selectedPromo = null;
      vm.promos = null;
    }

    function cancelAdd(){
      vm.addEnt = null;
      vm.showAddEnt = false;
    }

    function showAdd(){
      vm.showAddEnt = true;
    }

    function addEnterprise(addEnt) {
      vm.addEnt = addEnt;
      vm.showBusy = true;
      devToolsService.addEnterprise(addEnt)
        .then(function (response) {
          vm.showBusy = false;
          console.log(response);
        });
      //console.log(addEnt);
    }

    function saveEnterprise() {
      vm.showBusy = true;
      devToolsService.updateEnterprise(vm.selectedEnt)
        .then(function (response) {
          // vm.enterprises = response;
          vm.showBusy = false;
        });
    }

    function getEnterprisePromotions(id) {
      vm.showBusy = true;

      devToolsService.getEnterprisePromotions({'id':id})
        .then(function (response) {
          vm.promos = response;
          vm.showBusy = false;
        });
    }


    function selectPromoData(promo){
      vm.selectedPromo = angular.copy(promo);
    }

    function updatePromotion() {
      vm.showBusy = true;
      devToolsService.updatePromotion(vm.selectedPromo)
        .then(function (response) {
          vm.enterprises = response;
          vm.showBusy = false;
        });
    }

    function getEnterpriseRedemptions(id) {
      vm.showBusy = true;

      devToolsService.getEnterpriseRedemptions({'id':id})
        .then(function (response) {
          vm.redemptions = response;
          vm.showBusy = false;
        });
    }

    function selectRedemptionData(redemption){
      vm.selectedRedemption = angular.copy(redemption);
    }


    function updateRedemption() {
      vm.showBusy = true;
      devToolsService.updateRedemption(vm.selectedRedemption)
        .then(function (response) {
          vm.enterprises = response;
          vm.showBusy = false;
        });
    }

    function getEnterpriseTags(id) {
      vm.showBusy = true;
      devToolsService.getEnterpriseTags({'ent_id':id})
        .then(function(response) {
          vm.tags = response;
          console.log(response);
          vm.showBusy = false;
        });
    }

    function createEnterpriseTag(id) {
      vm.showBusy = true;
      devToolsService.createEnterpriseTag({'ent_id':id, 'tag_name':vm.newTag.tagName})
        .then(function(response) {
          vm.showBusy = false;
        });
    }

    function removeEnterpriseTag(tag) {
      vm.showBusy = true;
      devToolsService.removeEnterpriseTag({'id':tag.id})
        .then(function(response) {
          vm.tags.splice(vm.tags.indexOf(tag), 1);
          vm.showBusy = false;
        });
    }

    function makeAffiliate() {
      if(vm.selectedPromo) {
        if(vm.selectedPromo.id) {
          if(vm.selectedPromo.affiliateNetwork) {
            if(vm.selectedPromo.affiliateLink) {
              vm.showBusy = true;
              if(vm.selectedPromo.affiliateNetwork == 'SAS') {
                if(vm.selectedPromo.affiliateLink.indexOf('?') !== -1) {
                  vm.selectedPromo.affiliateLink += "&afftrack=_sid_";
                }
                else {
                  vm.selectedPromo.affiliateLink += "?afftrack=_sid_";
                }
              }
              else if (vm.selectedPromo.affiliateNetwork == 'IR') {
                if(vm.selectedPromo.affiliateLink.indexOf('?') !== -1) {
                  vm.selectedPromo.affiliateLink += "&Subid1=_mid_&Subid2=_pid_&Subid3=_hid_";
                }
                else {
                  vm.selectedPromo.affiliateLink += "?Subid1=_mid_&Subid2=_pid_&Subid3=_hid_";
                }
              }
              else if (vm.selectedPromo.affiliateNetwork == 'RAK') {
                if(vm.selectedPromo.affiliateLink.indexOf('?') !== -1) {
                  vm.selectedPromo.affiliateLink += "&u1=_sid_";
                }
                else {
                  vm.selectedPromo.affiliateLink += "?u1=_sid_";
                }
              }              
              else {
                if(vm.selectedPromo.affiliateLink.indexOf('?') !== -1) {
                  vm.selectedPromo.affiliateLink += "&sid=_sid_";
                }
                else {
                  vm.selectedPromo.affiliateLink += "?sid=_sid_";
                }
              }


              vm.promoConfigs[0].value.push({
                "id": vm.selectedPromo.id,
                "action": {
                  "type": "affiliate",
                  "url": vm.selectedPromo.affiliateLink
                }
              });
              devToolsService.updateConfig({'name' : vm.promoConfigs[0]['name'] , 'value' : JSON.stringify(vm.promoConfigs[0]['value'], null, 2)})
                .then(function(response){
                  vm.showBusy = false;
                  vm.selectedPromo.affiliateNetwork = null;
                  
                });
            }
            else {
              alert("Put in a link");
            }
          }
          else {
            alert("Select a network.");
          }
        }
        else {
          alert("Refresh page and try again. There's no promoid");
        }
      }
      else {
        vm.showBusy = false;
        alert("Select a promo.");
      }
    }


}]);