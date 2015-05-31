scrummer.factory('projectFactory', function ($http, $q, $location, $rootScope) {
  return {
    index: function() {
      return $http.get('/api/projects');
    },
    show: function(id) {
      return $http.get('/api/projects/' + id);
    },
    create: function(name,code_name,description,selected_users) {
      return $http.post('api/projects', {name : name,code_name:code_name,description:description,selected_users:selected_users});
    },
    remainingTickets: function(id) {
      return $http.get('/api/projects/' + id + '/remaining_tickets');
    },
    update:function(name,code_name,description,id) {
      return $http.put('api/projects/'+id, {name : name,code_name:code_name,description:description});
    },
    show_role:function(project_id){
      return $http.post('api/projects/show_role', {project_id: project_id});
    },
    find_members:function(id){
      return $http.get('/api/projects/' + id + '/members');
    },
    remove_members:function(selected_users,id){
      return $http.post('/api/projects/' + id + '/members/remove_members',{selected_users:selected_users});
    },
    available_users: function(id) {
      return $http.get('/api/projects/' + id + '/available_users');
    }
  };
});