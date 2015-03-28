'use strict';

//Controllers

var controllers = angular.module('controllers', []);

controllers.controller('indexCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.openLogin = function() {
        $location.path('/login');
      }
  }]);

controllers.controller('loginCtrl', ['$scope', '$routeParams', 'AuthService', '$location',
  function($scope, $routeParams, AuthService, $location) {
     $scope.doLogin = function() {
        AuthService.login($scope.login.email, $scope.login.password);
    }
  }]);

controllers.controller('dashboardCtrl', ['$scope', '$location', 'AuthToken',
  function($scope, $location, AuthToken) {
    alert(AuthToken.get('auth_token'));
  }]);

controllers.controller('signupCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope;
  }]);
