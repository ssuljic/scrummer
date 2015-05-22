scrummer.factory('messagesFactory', function ($http) {
  return {
    all: function() {
      return $http.get('/api/messages')
    },
    get: function(id) {
      return $http.get('/api/messages/' + id);
    },
    create: function(params) {
      return $http.post('/api/messages', params);
    }
  };
});