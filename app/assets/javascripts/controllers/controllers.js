'use strict';

//Controllers

var controllers = angular.module('controllers', []);

controllers.controller('indexCtrl', ['$scope', '$location',
  function($scope, $location) {
    $scope.openLogin = function() {
        $location.path('/login');
      }
  }]);

controllers.controller('loginCtrl', ['$scope',
  function($scope) {
    $scope;
  }]);