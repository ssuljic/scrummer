'use strict';

var scrummer = angular.module('scrummer', [
  'templates',
  'ngRoute',
  'controllers',
  'auth',
  'services',
  'validator',
  'custom',
  'view_directives',
  'pascalprecht.translate',
  'ui.bootstrap'
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
       when('/signup', {
        templateUrl: 'signup.html',
        controller: 'signupCtrl'
      }).
       when('/dashboard', {
        templateUrl: 'dashboard.html',
        controller: 'dashboardCtrl'
      }).
       when('/projects/1/board', {
        templateUrl: 'board.html',
        controller: 'boardCtrl'
      }).
	     when('/reset', {
        templateUrl: 'reset.html',
        controller: 'resetCtrl'
      }).
      when('/logout', {
        templateUrl: 'index.html',
        controller: 'logoutCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);