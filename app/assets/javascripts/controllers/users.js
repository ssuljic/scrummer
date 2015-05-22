scrummer.controller('membersCtrl', ['membersFactory', '$routeParams', '$scope', '$location','alertService','projectFactory',
  function(membersFactory, $routeParams, $scope, $location,alertService,projectFactory) {

  membersFactory.get($routeParams.id)
    .success(function(response) {
      $scope.members = response.document.users;
    });

  $scope.promote = function(member_id) {
    membersFactory.update($routeParams.id, member_id)
    .success(function(response) {
       alertService.add("User promoted", 'success');
      $location.path('/projects/'+$routeParams.id);
    });
  }
  projectFactory.show($routeParams.id)
    .success(function(response) {
      $scope.project = response.document.project;
      $scope.title = $scope.project.name;
      $scope.description = $scope.project.description;
    });
}]);