 scrummer.controller('newUserStoryCtrl', ['$scope', '$location','userStoryFactory', '$routeParams','alertService',
  function($scope,$location, userStoryFactory,$routeParams,alertService) {
    $scope.title = "New user story";

	userStoryFactory.get($routeParams.id)
	.success(function(resp) {
		if(resp.status.message == "OK") {
          $scope.stories= resp.document.stories;
        }
    });
	
    $scope.saveUserStory = function() {
      userStoryFactory.create($routeParams.id, $scope.user_story.name,$scope.user_story.description)
      .success(function(resp) {
        alertService.add("User story saved", 'success');
        $location.path('/dashboard');
      }).error(function(resp) {
         alertService.add("Error saving user story", 'danger');
        $location.path('/backlog');
      });
    }
	
}]);