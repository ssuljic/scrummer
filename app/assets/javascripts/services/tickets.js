scrummer.factory('ticketsFactory', function($http) {
  return {
    get: function(id) {
      return $http.get('/api/tickets/' + id);
    },
    create: function(id,description,estimate,type_id) {
      return $http.post('api/projects/' + id +'/tickets', {project_id : id, description: description, estimate : estimate, type_id:type_id});
    }
  }
});

scrummer.factory('commentsFactory', function($http) {
  return {
    create: function(ticketId, content) {
      return $http.post('/api/tickets/' + ticketId + '/comments', { content: content });
    }
  }
});

scrummer.factory('typesFactory', function($http) {
  return {
    index: function() {
      return $http.get('/api/types');
    }
  }
});