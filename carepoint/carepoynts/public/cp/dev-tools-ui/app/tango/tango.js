'use strict';

angular.module('app.tango', ['app.tango-service'])

.controller('TangoCtrl', ['$scope', '$q', '$state', 'tangoService', 'devToolsService', '$filter', function($scope, $q, $state, tangoService, devToolsService, $filter) {
    const vm = $scope;
    vm.isLogin = isLogin;
    vm.goTo = goTo;
    vm.account;
    vm.getRewardsList = getRewardsList;
    vm.createCustomer = createCustomer;
    vm.createAcct = createAcct;
    vm.getAccount = getAccount;
    vm.registerCC = registerCC;
    vm.unregisterCC = unregisterCC;
    vm.addFunds = addFunds;
    vm.createOrder = createOrder;
    vm.getOrder = getOrder;
    vm.getOrderList = getOrderList;
    vm.emailResend = emailResend;
    vm.clearOrderForm = clearOrderForm;
    vm.tangoCardFilter = tangoCardFilter;
    vm.rewardsAvailableUS = rewardsAvailableUS;
    vm.compareDisplayOrder = compareDisplayOrder;
    vm.getCPTangoOptions = getCPTangoOptions;
    vm.saveTangoConfig = saveTangoConfig;
    vm.deleteTangoConfig = deleteTangoConfig;
    vm.addCardToCarepoynt = addCardToCarepoynt;
    vm.getAccounts = getAccounts;
    vm.getCustomers = getCustomers;
    vm.getCreditCards = getCreditCards;

    init();

    // ******************************

    function init() {
      isLogin();
      // this is to highlight the nav bar
      vm.navValue = 'tango-card';
      vm.creditCardsRetrieved = false;
      vm.newCard = {
        ipAddress: "24.248.96.170"
      };

      vm.loading = true;
      $q.all({
       // initialData: tangoService.getInitialData(),
        cpTangoOptions: tangoService.getCPTangoOptions(),
        tangoConfig: tangoService.getTangoConfig()
      })
      .then(function (response) {
       // vm.initialData = response.initialData;
        vm.cpTangoOptions = response.cpTangoOptions;
        vm.tangoConfig = response.tangoConfig;
        console.log(vm.tangoConfig);
      });

    }
//devtoolsservice not in this file. gives error. need to add to list at the top. 
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

    function getRewardsList() {
      tangoService.getRewardsList()
        .then(function (response) {
          vm.brands = response.brands;
          tangoCardFilter();
        });
    }

    function tangoCardFilter() {
      vm.brands = $filter('filter')(vm.brands, function(value, index, array){
            return (value.status == 'active' && value.items[0].countries.indexOf('US') > -1);
         });
    }

    function rewardsAvailableUS(val, i, a) {
      return (val.available == true && val.countries.indexOf('US') > -1);
    }


    function createCustomer() {
      tangoService.createCustomer(vm.customer)
        .then(function (response) {
          vm.customerCreated = response; //JSON.stringify(response, null, 4);
        });
    }

    function createAcct() {
      tangoService.createAcct(vm.account)
        .then(function (response) {
          vm.acctCreated = response; //JSON.stringify(response, null, 4);
        });
    }

    function getAccount() {
      tangoService.getAccount(vm.acctRetrieve)
        .then(function (response) {
          vm.acctRetrievedResponse = response; //JSON.stringify(response, null, 4);
        });
    }

    function getAccounts() {
      tangoService.getAccounts()
        .then(function (response) {
          vm.accountsRetrieved = response; //JSON.stringify(response, null, 4);
        });
    }

    function getCustomers() {
      tangoService.getCustomers()
        .then(function (response) {
          vm.customersRetrieved = response; //JSON.stringify(response, null, 4);
        });
    }

    function registerCC() {
      // vm.ccRegister.credit_card.expiration = vm.ccRegister.credit_card.exp_year + '-' + vm.ccRegister.credit_card.exp_month
      // vm.ccRegister.client_ip = '127.0.0.1';
      console.log(vm.newCard);
      tangoService.registerCC(vm.newCard)
        .then(function (response) {
          vm.newCardResponse = response; //JSON.stringify(response, null, 4);
        });
    }

    function unregisterCC(card) {
      let removedCard = {
        accountIdentifier: card.accountIdentifier,
        creditCardToken: card.token,
        customerIdentifier: card.customerIdentifier
      }

      console.log(removedCard);

      tangoService.unregisterCC(removedCard)
        .then(function (response) {
          vm.unregisterResponse = response; //JSON.stringify(response, null, 4);
        });
    }

    function addFunds(card) {
      let funds = {
        "accountIdentifier": card.accountIdentifier,
        "amount": parseFloat(card.amount),
        "creditCardToken": card.token,
        "customerIdentifier": card.customerIdentifier
      }
      
      console.log(funds);

      tangoService.addFunds(funds)
        .then(function (response) {
          vm.fundResponse = response;
        });
    }

    function createOrder(order) {
      if(!order){
        order = vm.order;
      }
      if(order.amount){
        order.amount = parseFloat(order.amount);
      }
      
      console.log(JSON.stringify(order));
      tangoService.createOrder(order)
        .then(function (response) {
          vm.orderResponse = response; //JSON.stringify(response, null, 4);
        });

        /*
          {
            "customer": "cpdev_customer",
            "account_identifier": "cpdev_account",
            "recipient": {
              "name": "wayne dev",
              "email": "cpdev.wd@gmail.com"
            },
            "amount": 2500,
            "sku": "TNGO-E-V-STD",
            "reward_from": "dev @ cp",
            "reward_subject": "Your Carepoynt Reward",
            "send_reward": true,
            "external_id": "cp_id"
          }

          {
            "customer": "cpdev_customer",
            "account_identifier": "cpdev_account",
            "recipient": {
              "name": "wayne dev",
              "email": "cpdev.wd@gmail.com"
            },
            "amount": 2500,
            "sku": "AMZN-E-V-STD",
            "reward_from": "dev @ cp",
            "reward_subject": "Your Carepoynt Reward",
            "send_reward": true,
            "external_id": "cp_id"
          }
        */
    }

    function getOrder() {
      tangoService.getOrder(vm.orderRequest.order_id)
        .then(function (response) {
          vm.orderResponse = response; //JSON.stringify(response, null, 4);
        });
    }

    function getOrderList() {
      tangoService.getOrderList(vm.orderListRequest)
        .then(function (response) {
          vm.orderListResponse = response; //JSON.stringify(response, null, 4);
        });
    }
    
    function emailResend() {
      tangoService.resendEmail(vm.resendEmail)
        .then(function (response) {
          vm.resendEmailResponse = response; //JSON.stringify(response, null, 4);
        });
    }

    function clearOrderForm() {
      vm.order = {};
    }

    function compareDisplayOrder(a, b) {
      return a.displayOrder - b.displayOrder;
    }

    function getCPTangoOptions() {
      vm.cpTangoOptions = tangoService.getCPTangoOptions()
        .then(function (response) {
            vm.cpTangoOptions = response; //JSON.stringify(response, null, 4);
            // vm.cpTangoOptions.sort(compareDisplayOrder);
          });
    }

    function saveTangoConfig() {
      vm.cpTangoOptions.sort(compareDisplayOrder);
      for(var i = 0; i < vm.cpTangoOptions.length; i++){
        vm.cpTangoOptions[i].displayOrder = i;
      }
      vm.tangoConfig.rewards = vm.cpTangoOptions;

      tangoService.saveTangoConfig(vm.tangoConfig)
        .then(function (response) {
          vm.resendEmailResponse = response; //JSON.stringify(response, null, 4);
        });
    }

    function deleteTangoConfig(reward) {
      vm.index = vm.cpTangoOptions.indexOf(reward);
      vm.cpTangoOptions.splice(vm.index,1);
      saveTangoConfig();
      console.log("success");
    }

    function getCreditCards() {
      tangoService.getCreditCards()
        .then(function (response) {
          vm.creditCards = response;
          vm.creditCardsRetrieved = true;
          console.log(response);
        });
    }

    function addCardToCarepoynt(brand, item) {
      //do a check before the faceValue gets passed in for variable values 
      //make sure it's between min/maxValue 
      vm.toAdd = {

        "brand": {
            "brandName": brand.brandName,
            "imageUrls": {
              "200w-326ppi": brand.imageUrls["200w-326ppi"],
              "1200w-326ppi": brand.imageUrls["1200w-326ppi"],
              "130w-326ppi": brand.imageUrls["130w-326ppi"],
              "300w-326ppi": brand.imageUrls["300w-326ppi"],
              "80w-326ppi": brand.imageUrls["80w-326ppi"],
              "278w-326ppi": brand.imageUrls["278w-326ppi"]
            }
        },
        "order": {
            "amount": item.faceValue,
            "sendEmail": true,
            "customerIdentifier": vm.tangoConfig.customerIdentifier,
            "accountIdentifier": vm.tangoConfig.accountIdentifier,
            "recipient": {
                "firstName": "cp",
                "lastName": "dev",
                "email": "cpdev.wd@gmail.com"
            },
            "utid": item.utid,
            "sender": {
                "firstName": "cp",
                "lastName": "dev",
                "email": "cpdev.wd@gmail.com"
            },
            "emailSubject": "Your Reward From CP",
            "message": "Enjoy it!",
            "notes": "",
            "externalRefID": ""
        },
        "displayOrder": vm.cpTangoOptions.length,
        "carepoynt_value": "0"
      };

      // vm.toAdd.brand = angular.copy(brand);
      // vm.toAdd.brand.items = [item];

      vm.cpTangoOptions.push(vm.toAdd);
      console.log(vm.toAdd);


      // if(brand.items[0].valueType == "FIXED_VALUE"){
      //   vm.toAdd["brand"] = brand;
      //   vm.toAdd["order"]["amount"] = amount;
      //   vm.toAdd["order"]["utid"] = utid;
      //   vm.cpTangoOptions.push(vm.toAdd);
      //   console.log("sucessful");
      // }
      // else {
      //   if(amount >= brand.items[0].minValue && amount <= brand.items[0].maxValue){
      //     vm.toAdd["brand"] = brand;
      //     vm.toAdd["order"]["amount"] = amount;
      //     vm.toAdd["order"]["utid"] = utid;
      //     vm.cpTangoOptions.push(vm.toAdd);
      //     console.log("successful");
      //   }
      //   else
      //     console.log("not successful");
      // }
      
    }

}]);