scrummer.controller('backlogCtrl', ['$scope', '$location', '$modal', '$log', 'backlogFactory', '$translate', '$routeParams',
  function($scope, $location, $modal, $log, backlogFactory, $translate, $routeParams) {
    $scope.animationsEnabled = true;

    backlogFactory.get($routeParams.id)
    .success(function(resp) {
        if(resp.status.message == "OK") {
          $scope.tickets= resp.document.tickets;
          $scope.selectedTickets = [];
          $scope.project = resp.document.project;
          $scope.title = resp.document.project.name;
          $scope.description = resp.document.project.description;
          $scope.user_role = resp.document.user_role;
          $scope.panels = [{name: "Sprint"}, {name: "Backlog"}];
          $scope.selectedItems = createOptions();
          $scope.notSelectedItems = createOptions();
      }
    });

    function createOptions() {
      var options = {
        placeholder: "ticket",
        connectWith: ".ticket-space-backlog",
      };
      return options;
    }

    $scope.open = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'newSprintModalContent.html',
        controller: 'newSprintModalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.selectedTickets;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function (action) {
        if(action=="OK") {
          $scope.selectedTickets = [];
        }
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    $scope.status = {
      isopen: false
    };
    $scope.toggled = function(open) {
      $log.log('Dropdown is now: ', open);
    };
    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };

}]);