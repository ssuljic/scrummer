scrummer.factory('backlogFactory', function ($http, $q, $location, $rootScope, flash) {
  return {
    get: function(id) {
      return $http.get('/api/projects/'+ id +'/backlogs', {});
    }
  };
});