scrummer.controller('projectCtrl', ['projectFactory', function(projectFactory) {
  var project = this;

  projectFactory.index()
  .success(function(data) {
  project.projects = data.document.projects;
  });
}]);

scrummer.controller('projectPageCtrl', ['$scope', 'projectFactory', '$routeParams','alertService',
  function($scope, projectFactory, $routeParams,alertService) {
    projectFactory.show($routeParams.id)
    .success(function(response) {
      $scope.project = response.document.project;
      $scope.title = $scope.project.name;
      $scope.description = $scope.project.description;
      $scope.summary = response.document.summary;
      $scope.user_role = response.document.user_role;
      var chartsBuilder = new ChartsBuilder($scope.summary);
      $scope.charts = chartsBuilder.build();
    });
    $scope.saveProject = function() {
      projectFactory.update($scope.project.name,$scope.project.code_name,$scope.project.description,$routeParams.id)
      .success(function(resp) {
        $scope.title = $scope.project.name;
        $scope.description = $scope.project.description;
        alertService.add("Project edited!", 'success');
      })
      .error(function(resp) {
        alertService.add("Error editing project", 'danger');
      });
    }

    projectFactory.show_role($routeParams.id)
    .success(function(response) {
      $scope.role=response.document.role;
    });
    projectFactory.find_members($routeParams.id)
    .success(function(data) {
      $scope.users = data.document.users;
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
    $scope.checkString = function(data) {
      if (data.length<3) {
        return "It must be longer than 3 charactes";
      }
      if (data.length>25) {
        return "It must be less than 25 charactes";
      }
    };
}]);

scrummer.controller('newProjectCtrl', ['$scope', '$location','projectFactory', 'usersFactory','alertService',
  function($scope,$location, projectFactory,usersFactory,alertService) {
    $scope.title = "NEW_PROJECT";
    $scope.submitted = false;

    usersFactory.index()
    .success(function(data) {
      $scope.users = data.document.users;
    });

    $scope.saveProject = function() {
      if ($scope.newprojectform.$valid) {
        projectFactory.create($scope.project.name,$scope.project.code_name,$scope.project.description,$scope.selected_users)
        .success(function(resp) {
          alertService.add("Project added", 'success');
          $location.path('/dashboard');
        })
        .error(function(resp) {
          alertService.add("Error adding project", 'danger');
          $location.path('/project/new');
        });
      } else {
        $scope.newprojectform.submitted = true;
      }
    }
}]);