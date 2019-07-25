angular.module('app.utils', ['oc.lazyLoad', 'LocalStorageModule', 'toastr'])
    .factory('lazyLoader', ['$ocLazyLoad', function (ocLazyLoad) {

        function load(scriptBundle) {
            return ocLazyLoad.load(scriptBundle, {serie: true});
        };

        return {
            load: load
        }
    }]);