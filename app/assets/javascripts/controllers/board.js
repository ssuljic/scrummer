scrummer.controller('boardCtrl', ['$scope', 'boardFactory', '$routeParams',
  function($scope, boardFactory, $routeParams) {
    boardFactory.get($routeParams.id)
    .success(function(result) {
      $scope.tickets = result.document.board.tickets;
      $scope.statuses = result.document.board.statuses;
      $scope.title = result.document.board.sprint.name;
      $scope.description = result.document.board.sprint.start_date + '-' + result.document.board.sprint.end_date;
      $scope.sortableOptionsList = {};
      _.each($scope.statuses, function(status) { $scope.sortableOptionsList[status.name] = createOptions(status.name); });
    });

    function createOptions(listName) {
      var _listName = listName;
      var options = {
        placeholder: "ticket",
        connectWith: ".ticket-space",
        stop: function() {
          boardFactory.update($routeParams.id, $scope.tickets);
        }
      };
      return options;
    }
}]);

scrummer.controller('ticketCtrl', ['$scope', 'ticketsFactory', 'commentsFactory', 'alertService', '$routeParams',
  function($scope, ticketsFactory, commentsFactory, alertService, $routeParams) {
    ticketsFactory.get($routeParams.id)
    .success(function(result) {
      $scope.ticket = result.document.ticket;
      $scope.title = $scope.ticket.name;
    });

    $scope.createComment = function() {
      if(!$scope.comment) {
        alertService.add("Content must not be empty", 'danger');
        return;
      }
      commentsFactory.create($scope.ticket.id, $scope.comment.content)
      .success(function(result) {
        $scope.ticket.comments.push(result.document.comment);
        $scope.comment.content = "";
      })
      .error(function(result) {
        alertService.add(result.status.message, 'danger');
        $scope.comment.content = "";
      });
    }
  }
]);