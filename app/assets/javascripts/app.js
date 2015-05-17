'use strict';

var scrummer = angular.module('scrummer', [
  'templates',
  'ngRoute',
  'controllers',
  'auth',
  'services',
  'alertService',
  'validator',
  'custom',
  'view_directives',
  'pascalprecht.translate',
  'ui.bootstrap',
  'oi.multiselect',
  'nvd3',
  'ui.sortable',
  'angularFileUpload'
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
      when('/projects/:project_id/resources', {
        templateUrl: 'resources.html',
        controller: 'resourcesCtrl'
      }).
      when('/projects/:project_id/new_resource', {
        templateUrl: 'new_resource.html',
        controller: 'newResourceCtrl'
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