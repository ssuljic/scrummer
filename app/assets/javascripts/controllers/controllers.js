'use strict';

//Controllers

var controllers = angular.module('controllers', []);

// Index controller
controllers.controller('indexCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.openLogin = function() {
        $location.path('/login');
      }
    $scope.openSignup = function() {
        $location.path('/signup');
      }
  }]);

// Login controller
controllers.controller('loginCtrl', ['$scope', '$routeParams', 'AuthService', '$location',
  function($scope, $routeParams, AuthService, $location) {
     $scope.doLogin = function() {
        AuthService.login($scope.login.email, $scope.login.password);
    }
	 $scope.doReset = function() {
        alert('Test');
		$location.path('/reset');
    }
  }]);

// Dashboard controller
controllers.controller('dashboardCtrl', ['$scope', '$location', 'dashboardFactory', 'AuthToken',
  function($scope, $location, dashboardFactory, AuthToken) {
    $scope.content = dashboardFactory.get();
    $scope.LogOut = function() {
      AuthToken.unset('auth_token');
      $location.path('#/');
    }
}]);

// Board controller
controllers.controller('boardCtrl', ['$scope', '$location', 'boardFactory', 'AuthToken',
  function($scope, $location, boardFactory, AuthToken) {
    $scope.content = boardFactory.get(function(result) {
      $scope.statuses = result.document.board.statuses;
    });
    $scope.LogOut = function() {
      AuthToken.unset('auth_token');
      $location.path('#/');
    }
}]);

// Signup controller
controllers.controller('signupCtrl', ['$scope', '$location', 'usersFactory',
  function($scope, $location, usersFactory) {
    $scope.createNewUser = function() {
      usersFactory.create($scope.user);
      $location.path('#/login');
    }
}]);

// Reset controller
controllers.controller('resetCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.doReset = function() {
        alert('Test123');
    }
}]);
