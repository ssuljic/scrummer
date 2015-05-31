scrummer.controller('resourcesCtrl', ['$scope', 'uploadsFactory', '$routeParams', function($scope, uploadsFactory, $routeParams) {
  $scope.title = "RESOURCES";
  $scope.project_id = $routeParams.project_id;

  uploadsFactory.all($routeParams.project_id)
  .success(function(data) {
    $scope.resources = data.document.resources;
  });
}]);

scrummer.controller('newResourceCtrl', ['$scope', 'uploadsFactory', '$location', 'FileUploader', '$routeParams',
  function($scope, uploadsFactory, $location, FileUploader, $routeParams) {
  $scope.title = "RESOURCES";
  $scope.uploader = new FileUploader({url: '/api/projects/' + $routeParams.project_id + '/uploads'});

  $scope.upload = function() {
    $scope.uploader.uploadItem(0);
    $location.path('/projects/' + $routeParams.project_id);
  }
}]);