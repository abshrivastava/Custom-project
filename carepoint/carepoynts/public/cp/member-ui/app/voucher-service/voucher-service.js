(function(){
    angular
    .module('app.voucher-service',[])
    .factory('voucherService',voucherService);

    voucherService.$inject = ['$http', '$q'];
    function voucherService($http, $q){
        return{
            getVoucherDetail: getVoucherDetail,
            updateVoucherStatus: updateVoucherStatus,
            updateMemberTagForHidingVoucherModal: updateMemberTagForHidingVoucherModal,
            getVoucherModalBypassInfoFromMemberTag: getVoucherModalBypassInfoFromMemberTag
        };
        function getVoucherDetail(id){
            const REQUEST_URL = '/rewards/mem/get-voucher-detail/'+id;

            return $http
                .get(REQUEST_URL)
                .then(function success(response) {
                return response.data;
                }, function error() {
                return $q.reject();
                });
        }

    function updateVoucherStatus(data) {
      const REQUEST_URL = '/rewards/mem/update-voucher';

      return $http
        .post(REQUEST_URL, data)
        .then(function success(response) {
          return response.data;
        }, function error() {
          return $q.reject();
        });
    }

    function updateMemberTagForHidingVoucherModal(data){
        const REQUEST_URL = '/rewards/mem/update-voucher-memberTag';

        return $http
            .post(REQUEST_URL, data)
            .then(function success(response) {
            return response.data;
            }, function error() {
            return $q.reject();
            });
    }

    function getVoucherModalBypassInfoFromMemberTag(data){
            const REQUEST_URL = '/rewards/mem/get-voucher-memberTag';

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