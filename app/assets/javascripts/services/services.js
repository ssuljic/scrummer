// CRUD services for application resources
var services = angular.module('services', ['ngResource']);


// Factory for users
services.factory('usersFactory', function ($resource) {
  return $resource('api/users', {}, {
    create: { method: 'POST' }
  })
});

// Factory for dashboard
services.factory('dashboardFactory', function ($http, $q, $rootScope, $location, flash) {
  return {
    get: function() {
      var d = $q.defer();
      $http.get('api/dashboard', {}).success(function(resp) {
        if(resp.status.message == "OK") { $rootScope.content = resp; }
        else { flash.setMessage(resp.status.message); $location.path('/'); }
      }).error(function(resp) {
        flash.setMessage(resp.status.message);
        $location.path('/');
      });
      return d.promise;
    }
  };
});