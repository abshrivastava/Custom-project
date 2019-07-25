(function () {
  angular
    .module('app.clique-service', [])
    .factory('cliqueService', cliqueService);

  cliqueService.$inject = ['$http', '$q'];

  function cliqueService($http, $q) {
    return {
      addClique: addClique,
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
      denyInvite: denyInvite,
      getMembers: getMembers,
      getAllCliquesWithDetails: getAllCliquesWithDetails
      // getAllCliqueMembers: getAllCliqueMembers
    };

    // -------------------------------------------

    function addClique(data) {
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

    function getAllCliquesWithDetails() {
      var dfd = $q.defer();      
      getAllMyCliques().then(function (response) {
        angular.forEach(response, function (member, idx) {          
          response[idx].poyntTotal = getPoyntTotal(member);
        });

        //return response;          
        // getMembers(cliques).then(function (response) {
        //   dfd.resolve(response);
        // }, function (err) {
        //   dfd.reject(err);
        // })

        dfd.resolve(response);
      }, function (err) {
        dfd.reject(err);
      });
      return dfd.promise;
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

    function getMembers(cliques) {
      //TODO: very bad code in method, should be removed and details must come in first request
      //instead of iterating and making multiple requests
      var arr = []
      angular.forEach(cliques, function (clique) {
        arr.push(getCliqueById(clique.clique_id));
      });
      return $q.all(arr).then(function (response) {
        angular.forEach(response, function (member, idx) {
          cliques[idx].members = member.members;
          cliques[idx].poyntTotal = getPoyntTotal(member);
        });
        return cliques;
      });
    }

    function getPoyntTotal(clique) {
      clique.poyntTotal = 0;
      angular.forEach(clique.members, function (member) {
        if (member.status == 'active')
          clique.poyntTotal = clique.poyntTotal + member.details.reward.points;
      });
      return clique.poyntTotal;
    };

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
