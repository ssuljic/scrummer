scrummer.controller('newSprintModalCtrl', function ($scope, $location, $modalInstance, items, projectFactory, $routeParams, sprintsFactory) {
  $scope.items = items;

  projectFactory.remainingTickets($routeParams.id)
    .success(function(resp) {
     $scope.remaining_tickets = resp.document.tickets;
  });

  $scope.start = function () {
    sprintsFactory.create($routeParams.id, $scope.sprint, $scope.items, $scope.remaining_tickets)
    .success(function(resp) {
       $modalInstance.dismiss('OK');
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});