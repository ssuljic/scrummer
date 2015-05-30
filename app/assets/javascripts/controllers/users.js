scrummer.controller('membersCtrl', ['membersFactory', '$routeParams', '$scope', '$location','alertService','projectFactory',
  function(membersFactory, $routeParams, $scope, $location,alertService,projectFactory) {

  membersFactory.get($routeParams.id)
    .success(function(response) {
      $scope.members = response.document.users;
      $scope.user_role = response.document.user_role;
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

  $scope.editMembers = function() {
      projectFactory.remove_members($scope.selected_users,$routeParams.id)
      .success(function(resp) {
        alertService.add("Members removed", 'success');
        projectFactory.find_members($routeParams.id)
        .success(function(data) {
          $scope.users = data.document.users;
          $scope.selected_users='';
        });
      })
      .error(function(resp) {
        alertService.add("Error removing members", 'danger');
      });
    }
}]);