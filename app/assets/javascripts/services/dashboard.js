scrummer.factory('dashboardFactory', function ($http, $q, $location, $rootScope, flash) {
  return {
    get: function() {
      var d = $q.defer();
      $http.get('api/dashboard', {}).success(function(resp) {
        if(resp.status.message == "OK") {
          $rootScope.activities = resp.document.dashboard.content;
          $rootScope.projects = resp.document.dashboard.projects;
          $rootScope.logged_user = resp.user.username;
        }
      }).error(function(resp) {
        flash.setMessage(resp.status.message);
        $location.path('/');
      });
      return d.promise;
    }
  };
});