scrummer.controller('dashboardCtrl', ['$scope', '$location', 'dashboardFactory', '$translate',
function($scope, $location, dashboardFactory, $translate) {
  dashboardFactory.get();
  $scope.title = 'DASHBOARD';
}]);
