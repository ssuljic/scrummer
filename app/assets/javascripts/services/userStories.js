scrummer.factory('userStoryFactory', function ($http, $q, $location, $rootScope) {
  return {
	get: function(id) {
      return $http.get('/api/projects/' + id +'/backlog/userstories');
    },
    create: function(id,name,description) {
      return $http.post('api/projects/' + id +'/backlog/userstories', {project_id : id, sprint_id:123,name : name, description:description});
    }
  };
});