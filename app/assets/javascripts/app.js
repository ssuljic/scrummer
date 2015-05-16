'use strict';

var scrummer = angular.module('scrummer', [
  'templates',
  'ngRoute',
  'controllers',
  'auth',
  'services',
  'messageService',
  'validator',
  'custom',
  'view_directives',
  'pascalprecht.translate',
  'ui.bootstrap',
  'oi.multiselect',
  'nvd3',
  'ui.sortable'
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
       when('/project/new', {
        templateUrl: 'new_project.html',
        controller: 'newProjectCtrl'
      }).
       when('/projects/:id', {
        templateUrl: 'project.html',
        controller: 'projectPageCtrl'
      }).
       when('/projects/:id/board', {
        templateUrl: 'board.html',
        controller: 'boardCtrl'
      }).
      when('/projects/:id/backlog', {
        templateUrl: 'backlog.html',
        controller: 'backlogCtrl'
      }).
	     when('/reset', {
        templateUrl: 'reset.html',
        controller: 'resetCtrl'
      }).
      when('/logout', {
        templateUrl: 'index.html',
        controller: 'logoutCtrl'
      }).
      when('/inbox', {
        templateUrl: 'inbox.html',
        controller: 'inboxCtrl'
      }).
      when('/inbox/:id', {
        templateUrl: 'message.html',
        controller: 'messageCtrl'
      }).
      when('/message/new', {
        templateUrl: 'new_message.html',
        controller: 'newMessageCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);