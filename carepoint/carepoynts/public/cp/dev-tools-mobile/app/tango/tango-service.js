(function () {
  angular
    .module('app.tango-service', [])
    .factory('tangoService', tangoService);

  tangoService.$inject = ['$http', '$q'];

  function tangoService($http, $q) {
    return {
      getInitialData: getInitialData,
      getRewardsList: getRewardsList,
      createCustomer: createCustomer,
      createAcct: createAcct,
      getAccount: getAccount,
      registerCC:  registerCC,
      unregistherCC:  unregistherCC,
      addFunds:  addFunds,
      createOrder:  createOrder,
      getOrder:  getOrder,
      getOrderList:  getOrderList,
      resendEmail:  resendEmail,
      getCPTangoOptions: getCPTangoOptions,
      getTangoConfig: getTangoConfig,
      saveTangoConfig: saveTangoConfig,
      getCustomers : getCustomers,
      getAccounts : getAccounts
    };

    //-------------------------------------------

    function getInitialData() {
      const REQUEST_URL = '/redemption-service/tango/rewards-list';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getTangoConfig() {
      const REQUEST_URL = '/redemption-service/tango/config/get';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function saveTangoConfig(data) {
      const REQUEST_URL = '/redemption-service/tango/config/save';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getCPTangoOptions() {
      const REQUEST_URL = '/redemption-service/tango/cp-options';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    

    function getRewardsList() {
      const REQUEST_URL = '/redemption-service/tango/rewards-list';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function createCustomer(data) {
      const REQUEST_URL = '/redemption-service/tango/customer';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function createAcct(data) {
      const REQUEST_URL = '/redemption-service/tango/account';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getCustomers() {
      const REQUEST_URL = '/redemption-service/tango/customers';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getAccounts() {
      const REQUEST_URL = '/redemption-service/tango/accounts';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getOrderList(data) {
      const REQUEST_URL = '/redemption-service/tango/order-list';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getAccount(data) {
      const REQUEST_URL = '/redemption-service/tango/account?' + 'customer=' + data.customer + '&identifier='+ data.identifier;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function registerCC(data) {
      const REQUEST_URL = '/redemption-service/tango/cc_register';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function unregistherCC(data) {
      const REQUEST_URL = '/redemption-service/tango/unregistercc';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function addFunds(data) {
      const REQUEST_URL = '/redemption-service/tango/addfunds';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function createOrder(data) {
      const REQUEST_URL = '/redemption-service/tango/order';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getOrder(data) {
      const REQUEST_URL = '/redemption-service/tango/order/'+ data;

      return $http
        .get(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function resendEmail(data) {
      const REQUEST_URL = '/redemption-service/tango/resendemail';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }
    
  }
})();

