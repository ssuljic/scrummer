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

// Factory for projects
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

// Factory for userStories
services.factory('userStoryFactory', function ($http, $q, $location, $rootScope) {
  return {
    create: function(id,name,description) {
      return $http.post('api/projects/' + id +'/backlog/userstories', {project_id : id, sprint_id:123,name : name, description:description});
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


// Factory for members
services.factory('membersFactory', function ($http) {
  return {
    get: function(id) {
      return $http.get('/api/projects/'+ id +'/members', {});
    },
    update: function(project_id, member_id) {
      return $http.put('api/projects/' + project_id + '/members/' + member_id, {
       });
    }
  }
});