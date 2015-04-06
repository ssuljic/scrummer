// CRUD services for application resources
var services = angular.module('services', ['ngResource']);


// Factory for users
services.factory('usersFactory', function ($http, $q, $location, $rootScope, flash) {
  return {
    create: function(user) {
      return $http.post('api/users', { user: user });
    }
  };
});

// Factory for dashboard
services.factory('dashboardFactory', function ($http, $q, $location, $rootScope, flash) {
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

// Factory for dashboard
services.factory('boardFactory', function ($resource) {
  return $resource('/api/projects/1/board', {}, {
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