scrummer.controller('inboxCtrl', ['$scope', 'messagesFactory', function($scope, messagesFactory) {
  $scope.title = "INBOX";

  messagesFactory.all()
  .success(function(data) {
    $scope.messages = data.document.messages;
  });
}]);

scrummer.controller('messageCtrl', ['$scope', 'messagesFactory', '$routeParams', function($scope, messagesFactory, $routeParams) {
  $scope.title = "INBOX";

  messagesFactory.get($routeParams.id)
  .success(function(data) {
    $scope.message = data.document.message;
  });
}]);

scrummer.controller('newMessageCtrl', ['$scope', 'messagesFactory', 'usersFactory', 'alertService', '$location',
  function($scope, messagesFactory, usersFactory, alertService, $location) {
  $scope.title = "INBOX";
  usersFactory.index()
  .success(function(data) {
    $scope.users = data.document.users;
  });

  $scope.sendMessage = function() {
    messagesFactory.create({
      title: $scope.subject,
      content: $scope.content,
      recipient: $scope.username
    }).success(function(data) {
      $location.path('/inbox');
    }).error(function(data) {
      alertService.add(data.status.message, 'danger');
    })
  }
}]);