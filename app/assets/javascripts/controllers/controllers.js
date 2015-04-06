'use strict';

//Controllers

var controllers = angular.module('controllers', []);

// Index controller
controllers.controller('indexCtrl', ['$scope', '$location', 'flash', 'AuthToken',
  function($scope, $location, flash, AuthToken) {
    if(AuthToken.get('auth_token')) $location.path('/dashboard');
    $scope.flash = flash;
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
     $location.path('/reset');
  }
}]);

// Dashboard controller
controllers.controller('dashboardCtrl', ['$scope', '$location', 'dashboardFactory', 'AuthToken',
  function($scope, $location, dashboardFactory, AuthToken) {
    dashboardFactory.get();
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
controllers.controller('signupCtrl', ['$scope', '$location', 'usersFactory', 'reCAPTCHA', 'flash',
    function($scope, $location, usersFactory, reCAPTCHA, flash) {
    $scope.submitted = false; // Set form unsubmitted to unable validation messages
    reCAPTCHA.setPublicKey('6LeV5wQTAAAAAA4uCs95tbEZwBNP55UlSCiI21lC');
    $scope.createNewUser = function() {
      if ($scope.signupform.$valid) {
        usersFactory.create($scope.user)
          .success(function(resp) {
            flash.setMessage("You received confirmation email. Please activate your account!");
            $location.path('/');
          }).error(function(resp) {
            $scope.errorMessage = resp.status.message;
          });
      } else {
        $scope.signupform.submitted = true;
      }
    }
}]);

//Reset controller
controllers.controller('resetCtrl', ['$scope', '$location','resetFactory',
  function($scope, $location,resetFactory) {
    $scope.doReset = function() {
         resetFactory.reset_password($scope.reset.email);
         $location.path('#/login');
    }
}]);
