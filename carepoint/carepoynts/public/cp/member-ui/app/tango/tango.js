'use strict';

angular.module('app.tango', ['ngRoute', 'app.tango-service'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  	.when('/tango', {
	    templateUrl: 'tango/index.html',
	    controller: 'TangoCtrl'
	});
}])

.controller('TangoCtrl', ['$scope', '$q', 'tangoService', '$filter', function($scope, $q, tangoService, $filter) {
    const vm = $scope;
    vm.account;
    vm.getRewardsList = getRewardsList;
    vm.createAcct = createAcct;
    vm.getAccount = getAccount;
    vm.registerCC = registerCC;
    vm.unregistherCC = unregistherCC;
    vm.addFunds = addFunds;
    vm.createOrder = createOrder;
    vm.getOrder = getOrder;
    vm.getOrderList = getOrderList;
    vm.emailResend = emailResend;
    vm.clearOrderForm = clearOrderForm;
    vm.tangoCardFilter = tangoCardFilter;
    vm.rewardsAvailableUS = rewardsAvailableUS;
    vm.getCPTangoOptions = getCPTangoOptions;
    vm.saveTangoConfig = saveTangoConfig;

    vm.account = {
      'identifier': 'Account1',
      'customer': 'CompanyA',
      'email': 'email@companya.com',
      'available_balance': 0
    };


    // vm.acctRetrievedResponse = {
    //   "customer": "CompanyA",
    //   "account_identifier": "Account1",
    //   "client_ip": "127.0.0.1",
    //   "credit_card": {
    //     "number": "4111111111111111",
    //     "security_code": "123",
    //     "expiration": "2016-01",
    //     "billing_address": {
    //       "f_name": "FName",
    //       "l_name": "LName",
    //       "address": "Address",
    //       "city": "Seattle",
    //       "state": "WA",
    //       "zip": "98116",
    //       "country": "USA",
    //       "email": "test@example.com"
    //     }
    //   }
    // };

    

    // vm.ccFund = {
    //   "customer": "CompanyA",
    //   "account_identifier": "Account1",
    //   "cc_token": "33465088"
    // };

    // vm.ccFund = {
    //   "customer": "CompanyA",
    //   "account_identifier": "Account1",
    //   "amount": 1000,
    //   "client_ip": "127.0.0.1",
    //   "cc_token": "33465088",
    //   "security_code": "123"
    // };

  	init();

    // ******************************

  	function init() {
      vm.loading = true;
      $q.all({
        initialData: tangoService.getInitialData(),
        cpTangoOptions: tangoService.getCPTangoOptions()
      })
      .then(function (response) {
        vm.initialData = response.initialData;
        vm.cpTangoOptions = response.cpTangoOptions;
      });

    }

    function getRewardsList() {
      tangoService.getRewardsList()
        .then(function (response) {
          vm.rewardsList = response.brands;
          tangoCardFilter();
        });
    }

    function tangoCardFilter() {
      vm.rewardsList = $filter('filter')(vm.rewardsList, function(value, index, array){
         var rewardsArray = $filter('filter')(value.rewards, function (val, i, a){
            return (val.available == true && val.countries.indexOf('US') > -1);
         });
         return rewardsArray.length >0;
      });
    }

    function rewardsAvailableUS(val, i, a) {
      return (val.available == true && val.countries.indexOf('US') > -1);
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

    function registerCC() {
      vm.ccRegister.credit_card.expiration = vm.ccRegister.credit_card.exp_year + '-' + vm.ccRegister.credit_card.exp_month
      vm.ccRegister.client_ip = '127.0.0.1';
      tangoService.registerCC(vm.ccRegister)
        .then(function (response) {
          vm.ccRegisterResponse = response; //JSON.stringify(response, null, 4);
        });
    }

    function unregistherCC() {
      tangoService.unregistherCC(vm.acctRetrieve)
        .then(function (response) {
          vm.acctRetrievedResponse = response; //JSON.stringify(response, null, 4);
        });
    }

    function addFunds() {
      vm.ccFund.amount =  parseFloat(vm.ccFund.amount);
      tangoService.addFunds(vm.ccFund)
        .then(function (response) {
          vm.ccFundResponse = response; //JSON.stringify(response, null, 4);
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

    function clearOrderForm(){
      vm.order = {};
    }

    function getCPTangoOptions(){
      vm.cpTangoOptions = tangoService.getCPTangoOptions()
        .then(function (response) {
            vm.cpTangoOptions = response; //JSON.stringify(response, null, 4);
          });
    }

    function saveTangoConfig(){
      tangoService.saveTangoConfig(vm.cpTangoOptions)
        .then(function (response) {
          vm.resendEmailResponse = response; //JSON.stringify(response, null, 4);
        });
    }

}]);