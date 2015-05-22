scrummer.controller('alertsCtrl', ['$scope', 'alertService', function($scope, alertService) {
  $scope.alerts = alertService.get();

  $scope.closeAlert = function(index) {
    alertService.close(index);
  };
}]);