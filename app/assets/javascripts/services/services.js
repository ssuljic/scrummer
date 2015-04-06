// CRUD services for application resources
var services = angular.module('services', ['ngResource']);


// Factory for users
services.factory('usersFactory', function ($resource) {
  return $resource('api/users', {}, {
    create: { method: 'POST' },
  })
});

// Factory for dashboard
services.factory('dashboardFactory', function ($resource) {
  return $resource('api/dashboard', {}, {
    get: { method: 'GET' }
  })
});

// Service for password reset
services.factory('resetFactory', function($http, $q, $rootScope, $location) {
  return {
    reset_password: function(email) {
      var d = $q.defer();
      $http.post('api/users/reset_password', {
        email: email
      }).success(function(resp) {
        if(resp.status.message == "OK") {alert("We have sent you mail with new password!"); $location.path('#/login'); }
      }).error(function(resp) {
        alert("There is no user with that email account");
        $location.path('#/reset');
      });
      return d.promise;
    }
  };
});