(function () {
    angular
        .module('app.voucherService', ['app.utils'])
        .service('voucherService', voucherService);

    voucherService.$inject = ['$http', '$q', 'cacheService'];
    function voucherService($http, $q, cacheService) {
        return {
            getVoucherDetail: getVoucherDetail,
            updateVoucherStatus: updateVoucherStatus,
            updateMemberTagForHidingVoucherModal: updateMemberTagForHidingVoucherModal,
            getVoucherModalBypassInfoFromMemberTag: getVoucherModalBypassInfoFromMemberTag,
            getVoucherDetailWithShowModal: getVoucherDetailWithShowModal
        };

        function getVoucherDetail(id) {
            const REQUEST_URL = '/rewards/mem/get-voucher-detail/' + id;

            return $http
                .get(REQUEST_URL)
                .then(function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject();
                });
        };

        function updateVoucherStatus(data) {
            var reqData = {
                "voucherId": data.id,
                "poynts": data.poynts,
                "entId": data.ent_id,
                "memberId": data.memberid
            };
            const REQUEST_URL = '/rewards/mem/update-voucher';

            return $http
                .post(REQUEST_URL, reqData)
                .then(function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject();
                });
        };

        function updateMemberTagForHidingVoucherModal() {
            const REQUEST_URL = '/rewards/mem/update-voucher-memberTag';

            return $http
                .post(REQUEST_URL, cacheService.get('MemberData').memberid)
                .then(function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject();
                });
        };

        function getVoucherModalBypassInfoFromMemberTag(data) {
            const REQUEST_URL = '/rewards/mem/get-voucher-memberTag';

            return $http
                .post(REQUEST_URL, data)
                .then(function success(response) {
                    return response.data;
                }, function error() {
                    return $q.reject();
                });
        };

        function getVoucherDetailWithShowModal(id) {
            var arr = {
                voucherData: getVoucherDetail(id),
                voucherModalInfo: getVoucherModalBypassInfoFromMemberTag({ "memberId": cacheService.get('MemberData').memberid, "tagName": "bypassModalForVoucherRedeem" })
            }
            return $q.all(arr).then(function (response) {
                var voucherDetail = response.voucherData;
                voucherDetail.showModal = response.voucherModalInfo && response.voucherModalInfo.isActive ? false : true;
                return voucherDetail;
            }, function error() {
                return $q.reject();
            });
        };
    }
})();