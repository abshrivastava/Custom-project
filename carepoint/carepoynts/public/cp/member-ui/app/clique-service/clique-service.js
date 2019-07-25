(function () {
  angular
    .module('app.clique-service', [])
    .factory('cliqueService', cliqueService);

  cliqueService.$inject = ['$http', '$q'];

  function cliqueService($http, $q) {
    return {
      createClique: createClique,
      getCliqueByMemberId: getCliqueByMemberId,
      getMyClique: getMyClique,
      getAllMyCliques: getAllMyCliques,
      getCliqueById: getCliqueById,
      addDependent: addDependent,
      inviteMember: inviteMember,
      removeMember: removeMember,
      transferPoynts: transferPoynts,
      deactivateClique: deactivateClique,
      acceptInvite: acceptInvite,
      denyInvite: denyInvite
      // getAllCliqueMembers: getAllCliqueMembers
    };

    // -------------------------------------------
    
    function createClique(data) {
      const REQUEST_URL = '/rewards/clique/create';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getCliqueByMemberId(id) {
      const REQUEST_URL = '/rewards/clique/member/' + id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getCliqueById(id) {
      const REQUEST_URL = '/rewards/clique/cid/' + id;

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getMyClique() {
      const REQUEST_URL = '/rewards/clique/my-clique';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function getAllMyCliques() {
      const REQUEST_URL = '/rewards/clique/my-cliques/all';

      return $http
        .get(REQUEST_URL)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function addDependent(data) {
      const REQUEST_URL = '/rewards/clique/add-dependent';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function inviteMember(data) {
      const REQUEST_URL = '/rewards/clique/member/invite';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function removeMember(data) {
      const REQUEST_URL = '/rewards/clique/member/remove';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function transferPoynts(data) {
      const REQUEST_URL = '/rewards/clique/transfer';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function deactivateClique(data) {
      const REQUEST_URL = '/rewards/clique/deactivate';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function acceptInvite(data) {
      const REQUEST_URL = '/rewards/clique/invite/accept';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function denyInvite(data) {
      const REQUEST_URL = '/rewards/clique/invite/deny';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    // function getAllCliqueMembers(data) {
    //   const REQUEST_URL = 'rewards/clique/getAllMembers';

    //   return $http
    //     .get(REQUEST_URL)
    //     .then(function success(response) {
    //       return response.data;
    //     }, function error() {
    //       return $q.reject();
    //     });
    // }

  }
})();
