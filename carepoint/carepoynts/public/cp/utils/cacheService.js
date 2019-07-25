angular.module('app.utils')
    .factory('cacheService', ['localStorageService', function (localStorageService) {

        function set(key, value) {
            return localStorageService.set(key, value);
        };

        function get(key) {
            return localStorageService.get(key);
        };

        function remove(key) {
            return localStorageService.remove(key);
        };

        return {
            set: set,
            get: get,
            remove: remove
        };
    }]);