scrummer.controller('newTicketCtrl', ['$scope', '$location','ticketsFactory', 'alertService', 'typesFactory', '$routeParams','membersFactory',
  function($scope, $location, ticketsFactory, alertService, typesFactory, $routeParams, membersFactory) {
    $scope.title = "New ticket";
    $scope.submitted = false;

    typesFactory.index()
    .success(function(data) {
      $scope.types = data.document.types;
    });
    membersFactory.get($routeParams.id)
    .success(function(data) {
      $scope.users = data.document.users;
    });

    $scope.saveTicket = function() {
      if ($scope.newticketform.$valid) {
        ticketsFactory.create($routeParams.id,$scope.ticket.description,$scope.ticket.estimate,$scope.selected_type.id,$scope.selected_user.id)
        .success(function(resp) {
          alertService.add("Ticket added", 'success');
          $location.path('/projects/'+$routeParams.id+'/backlog');
        })
        .error(function(resp) {
          alertService.add("Error adding ticket", 'danger');

        });
      } else {
        $scope.newticketform.submitted = true;
      }
    }
}]);

scrummer.controller('editTicketCtrl', ['$scope', '$location', '$routeParams', 'ticketsFactory', 'typesFactory', 'membersFactory', 'alertService',
  function($scope, $location, $routeParams, ticketsFactory, typesFactory, membersFactory, alertService) {
    $scope.title = "Edit ticket";

    ticketsFactory.get($routeParams.id)
    .success(function(data) {
      $scope.ticket = data.document.ticket;
      membersFactory.get($scope.ticket.project.id)
      .success(function(data) {
        $scope.users = data.document.users;
      });
    });

    typesFactory.index()
    .success(function(data) {
      $scope.types = _.map(data.document.types, function(type) { return type.name; });
    });

    $scope.updateTicket = function() {
      if ($scope.newticketform.$valid) {
        ticketsFactory.update($routeParams.id, $scope.ticket)
        .success(function(resp) {
          alertService.add("Ticket updated", 'success');
          $location.path('/ticket/' + $routeParams.id);
        })
        .error(function(resp) {
          alertService.add("Error adding ticket", 'danger');
        });
      } else {
        $scope.newticketform.submitted = true;
      }

    };
}]);