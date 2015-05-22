scrummer.factory('boardFactory', function ($http) {
  return {
    get: function(id) {
      return $http.get('/api/projects/' + id + '/board');
    },
    update: function(id, tickets) {
      return $http.put('/api/projects/' + id + '/board', {
        tickets: tickets
      });
    }
  };
});