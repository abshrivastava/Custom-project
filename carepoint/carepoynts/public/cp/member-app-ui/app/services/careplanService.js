(function () {
    angular.module('app.careplan', ['app.utils'])
        .factory('careplanService', ['$q', '$http', 'cpUtils', function ($q, $http, cpUtils) {

            function getCareplanList(features) {
                if (features['dark.member.alternative-medicine-view']) {
                    var careplanList = angular.copy(CARERPLAN_LIST);
                    careplanList.push({
                        name: "Wellness",
                        tag: "wellness",
                        cssClass: features['dark.member.pied-piper'] ? "fa fa-2x fa-pied-piper-alt" : "fa fa-2x fa-leaf"
                    });
                    return careplanList;
                }
                else {
                    return CARERPLAN_LIST;
                }
            };

            function getEnterprisesByTagForMember(data) {
                const REQUEST_URL = '/careplan-service/' + data + '/enterprise';

                return $http.get(REQUEST_URL, data).then(
                    function success(response) {
                        return response.data;
                    },
                    function error(err) {
                        return $q.reject(cpUtils.getErrorDetails(err));
                    }
                );
            };

            return {
                getCareplanList: getCareplanList,
                getEnterprisesByTagForMember: getEnterprisesByTagForMember
            }

        }]);
})();
