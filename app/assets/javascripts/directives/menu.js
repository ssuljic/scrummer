scrummer.directive('menu', ['projectFactory',function() {

  return {
    restrict: 'E',
    templateUrl: 'menu.html',
    controllerAs: 'Project',
    replace: true,
    scope: {
      project: '=',
    },
    link: function($scope, $element) {},
     controller: function($scope, $element, projectFactory) {

      var project=this;
       projectFactory.index()
      .success(function(data) {
      project.projects = data.document.projects;
       });

    }
  };
}]);