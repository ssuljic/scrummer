scrummer.controller('newTicketCtrl', ['$scope', '$location','ticketsFactory','alertService','typesFactory','$routeParams',
  function($scope,$location, ticketsFactory,alertService,typesFactory,$routeParams) {
    $scope.title = "New ticket";
    $scope.submitted = false;

    typesFactory.index()
    .success(function(data) {
      $scope.types = data.document.types;
    });

    $scope.saveTicket = function() {
      if ($scope.newticketform.$valid) {
        ticketsFactory.create($routeParams.id,$scope.ticket.description,$scope.ticket.estimate,$scope.selected_type.id)
        .success(function(resp) {
          alertService.add("Ticket added", 'success');
          $location.path('/dashboard');
        })
        .error(function(resp) {
          alertService.add("Error adding ticket", 'danger');

        });
      } else {
        $scope.newticketform.submitted = true;
      }
    }
}]);