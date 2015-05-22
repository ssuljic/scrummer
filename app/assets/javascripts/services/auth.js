// Services for authentification with JWT token
var auth = angular.module('auth', ['ngResource']);

// Factory for token CRUD in local storage
auth.factory('AuthToken', function() {
    return {
      get: function(key) {
        return sessionStorage.getItem(key);
      },
      set: function(key, value) {
        return sessionStorage.setItem(key, value);
      },
      unset: function(key) {
        return sessionStorage.removeItem(key);
      }
    };
  });

// Service for user login
auth.factory("AuthService", function($http, $q, $rootScope, AuthToken, $location) {
  return {
    login: function(email, password) {
      var d = $q.defer();
      $http.post('api/sessions', {
        email: email,
        password: password
      }).success(function(resp) {
        AuthToken.set('auth_token', resp.document.session_key);
        d.resolve(resp.response);
        if(resp.status.message == "OK") { $location.path('/dashboard'); }
        else { $location.path('/'); }
      }).error(function(resp) {
        alert(resp.status.message);
        $location.path('/');
      });
      return d.promise;
    }
  };
});

// Configuration of every outgoing http request
auth.factory("AuthInterceptor", function($q, $injector) {
  return {
    // This will be called on every outgoing http request
    request: function(config) {
      var AuthToken = $injector.get("AuthToken");
      var token = AuthToken.get('auth_token');
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = "Token token=" + token;
      }
      return config || $q.when(config);
    }
  };
});

auth.config(function($httpProvider) {
  return $httpProvider.interceptors.push("AuthInterceptor");
});

scrummer.factory('resetFactory', function($http, $q, $rootScope, $location) {
  return {
    reset_password: function(email) {
      var d = $q.defer();
      $http.post('api/users/reset_password', {
        email: email
      }).success(function(resp) {
        if(resp.status.message == "OK") {alert("Email with password reset instruction has been sent!"); $location.path('#/login'); }
      }).error(function(resp) {
        alert("There is no user with that email account");
        $location.path('#/reset');
      });
      return d.promise;
    }
  };
});
