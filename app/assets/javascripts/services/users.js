scrummer.factory('usersFactory', function ($http, $q, $location, $rootScope, flash) {
  return {
    create: function(user) {
      return $http.post('api/users', { user: user });
    },
    index: function() {
      return $http.get('/api/users');
    }
  };
});

scrummer.factory('membersFactory', function ($http) {
  return {
    get: function(id) {
      return $http.get('/api/projects/'+ id +'/members', {});
    },
    create: function(project_id, user) {
      return $http.post('/api/projects/' + project_id + '/members', { user: user });
    },
    remove: function(project_id, id) {
      return $http.delete('/api/projects/' + project_id + '/members/' + id);
    },
    update: function(project_id, member_id, role) {
      return $http.put('api/projects/' + project_id + '/members/' + member_id, { role: role });
    }
  }
});