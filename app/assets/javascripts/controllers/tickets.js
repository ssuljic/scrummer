scrummer.controller('newTicketCtrl', ['$scope', '$location','ticketsFactory','alertService','typesFactory','$routeParams','usersFactory',
  function($scope,$location, ticketsFactory,alertService,typesFactory,$routeParams,usersFactory) {
    $scope.title = "New ticket";
    $scope.submitted = false;

    typesFactory.index()
    .success(function(data) {
      $scope.types = data.document.types;
    });
     usersFactory.index()
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