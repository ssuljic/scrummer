scrummer.factory('uploadsFactory', function ($http) {
  return {
    all: function(project_id) {
      return $http.get('api/projects/' + project_id + '/uploads');
    },
    create: function(project_id, file) {
      return $http.post('api/projects/' + project_id + '/uploads', { file: file });
    }
  }
});