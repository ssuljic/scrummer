// CRUD services for application resources
var services = angular.module('services', ['ngResource']);


// Factory for users
services.factory('usersFactory', function ($resource) {
  return $resource('api/users', {}, {
    create: { method: 'POST' },
    reset_password: {method: 'GET'}
  })
});

// Factory for dashboard
services.factory('dashboardFactory', function ($resource) {
  return $resource('api/dashboard', {}, {
    get: { method: 'GET' }
  })
});