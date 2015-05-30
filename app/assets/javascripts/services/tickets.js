scrummer.factory('ticketsFactory', function($http) {
  return {
    get: function(id) {
      return $http.get('/api/tickets/' + id);
    }
  }
});

scrummer.factory('commentsFactory', function($http) {
  return {
    create: function(ticketId, content) {
      return $http.post('/api/tickets/' + ticketId + '/comments', { content: content });
    }
  }
})