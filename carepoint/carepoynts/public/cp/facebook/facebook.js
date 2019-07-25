'use strict';

angular.module('app.facebook', [])

.controller('FacebookCtrl', ['$scope', '$q', 'ezfb', 
  function($scope, $q, ezfb) {
    const vm = $scope;
    vm.postToFacebook = postToFacebook;

    init();

    // ******************************

    function init() {
      console.log('Just Loaded FB Service');
    }

    function postToFacebook() {
      console.log("posting this content: " + vm.post.content);

      //ezfb.login( function() {
        ezfb.api('/me/feed', 'post',  
          {
            message: vm.post.content
          },
          function (res) {
            console.log(res);
          }
        )
      //}, {scope: 'publish_actions'});
      
    }

}]);