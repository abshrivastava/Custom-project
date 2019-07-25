(function () {
    angular.module("app.enterprise", [])
        .service('enterpriseService', ['$q', '$http', 'cpUtils', function ($q, $http, cpUtils) {

            this.getInitialData = function (entId) {
                const REQUEST_URL = '/rewards/ent/company-details/' + entId + '/init';
                let dfd = $q.defer();

                $http.get(REQUEST_URL).then(
                    function success(response) {
                        dfd.resolve(response.data);
                    }, function error(err) {
                        dfd.reject(cpUtils.getErrorDetails(err));
                    });
                return dfd.promise;
            };

            this.setOffersModelPoynts = function (offersDataItems) {
                if (offersDataItems) {
                    offersDataItems.map(function (item) {
                        var poynts = 0;
                        if (item.hasOwnProperty('subPromos')) {
                            item.subPromos.forEach(function (subItem) {
                                poynts += parseInt(subItem.reward_value);
                            });
                        } else {
                            poynts = parseInt(item.reward_value);
                        }
                        item.poynts = poynts;
                        return item;
                    });
                }
                return offersDataItems;
            };

            this.joynEnterprise = function (data) {
                const REQUEST_URL = '/rewards/ent/joyn';
                let dfd = $q.defer();

                $http.post(REQUEST_URL, data).then(
                    function success(response) {
                        dfd.resolve(response.data);
                    }, function error(err) {
                        dfd.reject(cpUtils.getErrorDetails(err));
                    });
                return dfd.promise;
            };

            this.getAddressUri = function (entData) {
                return entData ? ("http://maps.apple.com/?address=" + encodeURI(entData.ent_address + " " + entData.ent_city + " "
                    + entData.ent_city + " "
                    + entData.ent_zip)) : "";
            };

            this.getLatLong = function (entData) {
                return (entData && entData.geo_lat && entData.geo_long) ? (entData.geo_lat + "," + entData.geo_long) : '';
            };

            this.getEnterpriseOffers = function (id) {

                var REQUEST_URL = '/rewards/ent/offers?id=' + id;

                return $http.get(REQUEST_URL).then(
                    function success(response) {
                        return response.data;
                    }, function error() {
                        return $q.reject();
                    });
            };
            this.isEnterpriseAffiliated = function (enterprise){
                var isAffiliated = false ;
                if(enterprise && enterprise.tagData){
                    angular.forEach(enterprise.tagData, function (tagDataEntry) {
                        if(!isAffiliated){
                            isAffiliated = (tagDataEntry.tag_name === ENTERPRISE_TAGS.Tag_Affiliate) ? true : false;
                        }
                    });
                return isAffiliated
                }
            };

        }])
})();