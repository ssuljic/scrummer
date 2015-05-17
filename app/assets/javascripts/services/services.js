// CRUD services for application resources
var services = angular.module('services', ['ngResource']);


// Factory for users
services.factory('usersFactory', function ($http, $q, $location, $rootScope, flash) {
  return {
    create: function(user) {
      return $http.post('api/users', { user: user });
    },
    index: function() {
      return $http.get('/api/users');
    }
  };
});

// Factory for dashboard
services.factory('dashboardFactory', function ($http, $q, $location, $rootScope, flash) {
  return {
    get: function() {
      var d = $q.defer();
      $http.get('api/dashboard', {}).success(function(resp) {
        if(resp.status.message == "OK") { $rootScope.activities = resp.document.dashboard.content;
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

// Factory for backlog
services.factory('backlogFactory', function ($http, $q, $location, $rootScope, flash) {
  return {
    get: function(id) {
      var d = $q.defer();
        return $http.get('/api/projects/'+ id +'/backlogs', {});
    }

  };
});

// Factory for dashboard
services.factory('boardFactory', function ($http) {
  return {
    get: function(id) {
      return $http.get('/api/projects/' + id + '/board');
    },
    update: function(id, tickets) {
      return $http.put('/api/projects/' + id + '/board', {
        tickets: tickets
      });
    }
  };
});

// Service for password reset
services.factory('resetFactory', function($http, $q, $rootScope, $location) {
  return {
    reset_password: function(email) {
      var d = $q.defer();
      $http.post('api/users/reset_password', {
        email: email
      }).success(function(resp) {
        if(resp.status.message == "OK") {alert("Email with password reset instruction has been sent!"); $location.path('#/login'); }
      }).error(function(resp) {
        alert("There is no user with that email account");
        $location.path('#/reset');
      });
      return d.promise;
    }
  };
});

// Factory for users
services.factory('projectFactory', function ($http, $q, $location, $rootScope) {
  return {
    index: function() {
      return $http.get('/api/projects');
    },
    show: function(id) {
      return $http.get('/api/projects/' + id);
    },
    create: function(name,code_name,description,selected_users) {
      return $http.post('api/projects', {name : name,code_name:code_name,description:description,selected_users:selected_users});
    },
    remainingTickets: function(id) {
      return $http.get('/api/projects/' + id + '/remaining_tickets');
    }
  };
});

// Factory for dashboard
services.factory('messagesFactory', function ($http) {
  return {
    all: function() {
      return $http.get('/api/messages')
    },
    get: function(id) {
      return $http.get('/api/messages/' + id);
    },
    create: function(params) {
      return $http.post('/api/messages', params);
    }
  };
});


// Factory for sprints
services.factory('sprintsFactory', function ($http) {
  return {
    create: function(project_id, sprint, tickets, remaining_tickets) {
      return $http.post('api/projects/' + project_id + '/sprints', {
        sprint: sprint,
        tickets: tickets,
        remaining_tickets: remaining_tickets
       });
    }
  }
});

services.factory('uploadsFactory', function ($http) {
  return {
    all: function(project_id) {
      return $http.get('api/projects/' + project_id + '/uploads');
    },
    create: function(project_id, file) {
      return $http.post('api/projects/' + project_id + '/uploads', { file: file });
    }
  }
});