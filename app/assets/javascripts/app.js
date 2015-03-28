'use strict';

var scrummer = angular.module('scrummer', [
  'templates',
  'ngRoute',
  'controllers',
]);

scrummer.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index.html',
        controller: 'indexCtrl'
      }).
       when('/login', {
        templateUrl: 'login.html',
        controller: 'loginCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);