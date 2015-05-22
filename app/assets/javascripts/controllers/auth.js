scrummer.controller('indexCtrl', ['$scope', '$location', 'flash', 'AuthToken',
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

scrummer.controller('loginCtrl', ['$scope', '$routeParams', 'AuthService', '$location',
  function($scope, $routeParams, AuthService, $location) {
    $scope.doLogin = function() {
      AuthService.login($scope.login.email, $scope.login.password);
    }
    $scope.doReset = function() {
      $location.path('/reset');
    }
}]);

scrummer.controller('logoutCtrl', ['$scope', '$location', 'AuthToken',
  function($scope, $location, AuthToken) {
    AuthToken.unset('auth_token');
    $location.path('#/');
}]);

scrummer.controller('signupCtrl', ['$scope', '$location', 'usersFactory', 'reCAPTCHA', 'flash','alertService',
  function($scope, $location, usersFactory, reCAPTCHA, flash,alertService) {
    $scope.submitted = false; // Set form unsubmitted to unable validation messages
    reCAPTCHA.setPublicKey('6LeV5wQTAAAAAA4uCs95tbEZwBNP55UlSCiI21lC');

    $scope.createNewUser = function() {
      if ($scope.signupform.$valid) {
        usersFactory.create($scope.user)
        .success(function(resp) {
          flash.setMessage("You received confirmation email. Please activate your account!");
          alertService.add("You received confirmation email. Please activate your account!", 'success');
          $location.path('/');
        }).error(function(resp) {
          $scope.errorMessage = resp.status.message;
          alertService.add(resp.status.message, 'danger');
        });
      } else {
        $scope.signupform.submitted = true;
      }
    }
}]);

// Reset password controller
scrummer.controller('resetCtrl', ['$scope', '$location','resetFactory',
  function($scope, $location,resetFactory) {
    $scope.doReset = function() {
      resetFactory.reset_password($scope.reset.email);
      $location.path('#/login');
    }
}]);