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