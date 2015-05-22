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
    update: function(project_id, member_id) {
      return $http.put('api/projects/' + project_id + '/members/' + member_id, {
       });
    }
  }
});