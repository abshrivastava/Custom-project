(function(){
    angular.module("app.filters")
      .filter('safeHtml', ['$sce', function($sce){
          return function(val){
            return $sce.trustAsHtml(val);
          }
      }])
})();