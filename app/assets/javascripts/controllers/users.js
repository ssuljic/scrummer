scrummer.controller('membersCtrl', ['membersFactory', '$routeParams', '$scope', '$location','alertService','projectFactory',
  function(membersFactory, $routeParams, $scope, $location,alertService,projectFactory) {

  membersFactory.get($routeParams.id)
  .success(function(response) {
    $scope.members = response.document.users;
    $scope.user_role = response.document.user_role;
    $scope.current_user = response.user;
  })
  .error(function(response) {
    alertService.add(response.status.message, "danger");
  });

  projectFactory.available_users($routeParams.id)
  .success(function(data) {
    $scope.project = data.document.project;
    $scope.title = $scope.project.name;
    $scope.description = $scope.project.description;
    $scope.users = data.document.users;
    $scope.selected_user='';
  })
  .error(function(response) {
    alertService.add(response.status.message, "danger");
  });

  $scope.promote = function(member_id) {
    membersFactory.update($routeParams.id, member_id, "manager")
    .success(function(response) {
      alertService.add("User promoted", 'success');
      $scope.members = response.document.members;
    })
    .error(function(response) {
      alertService.add(response.status.message, "danger");
    });
  }

  $scope.degrade = function(member_id) {
    membersFactory.update($routeParams.id, member_id, "member")
    .success(function(response) {
      alertService.add("User degraded", 'success');
      $scope.members = response.document.members;
    })
    .error(function(response) {
      alertService.add(response.status.message, "danger");
    });
  }

  $scope.removeMember = function(id) {
    membersFactory.remove($routeParams.id, id)
    .success(function(data) {
      $scope.members = data.document.members;
      $scope.users = data.document.available_users;
      alertService.add("User removed", "success");
    })
    .error(function(response) {
      alertService.add(response.status.message, "danger");
    });
  }

  $scope.addMember = function() {
    membersFactory.create($routeParams.id, $scope.selected_user.user)
    .success(function(data) {
      $scope.members.push(data.document.user);
      $scope.users = data.document.available_users;
      $scope.selected_user = "";
      alertService.add("User added", "success");
    })
    .error(function(response) {
      alertService.add(response.status.message, "danger");
    });
  }
}]);