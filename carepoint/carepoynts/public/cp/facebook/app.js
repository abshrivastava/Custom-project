'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [
  'app.facebook',
  'ezfb'
])

.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '1275109325868916'
  });  
});