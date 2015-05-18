'use strict';

// Controllers

var controllers = angular.module('controllers', []);

// Index controller
controllers.controller('indexCtrl', ['$scope', '$location', 'flash', 'AuthToken',
  function($scope, $location, flash, AuthToken) {
    if(AuthToken.get('auth_token')) $location.path('/dashboard');
    $scope.flash = flash;
    $scope.openLogin = function() {
        $location.path('/login');
      }
    $scope.openSignup = function() {
        $location.path('/signup');
      }
}]);

controllers.controller('alertsCtrl', ['$scope', 'alertService', function($scope, alertService) {
  $scope.alerts = alertService.get();

  $scope.closeAlert = function(index) {
    alertService.close(index);
  };
}]);

// Login controller
controllers.controller('loginCtrl', ['$scope', '$routeParams', 'AuthService', '$location',
  function($scope, $routeParams, AuthService, $location) {
    $scope.doLogin = function() {
      AuthService.login($scope.login.email, $scope.login.password);
    }
  $scope.doReset = function() {
     $location.path('/reset');
  }
}]);

// Backlog controller
controllers.controller('backlogCtrl', ['$scope', '$location', 'backlogFactory', '$translate', '$routeParams',
  function($scope, $location, backlogFactory, $translate, $routeParams) {
    backlogFactory.get($routeParams.id);
    $scope.title = 'BACKLOG';
}]);

// Dashboard controller
controllers.controller('dashboardCtrl', ['$scope', '$location', 'dashboardFactory', '$translate',
  function($scope, $location, dashboardFactory, $translate) {
    dashboardFactory.get();
    $scope.title = 'DASHBOARD';
    $scope.openActivity = function(url) {
      $location.path(url);
    }

       $scope.openNewProject = function() {
        $location.path('/newProject');
      }
        $scope.showProject = function() {
          window.alert("This will show data of a project");
      }


}]);

// Logout controller
controllers.controller('logoutCtrl', ['$scope', '$location', 'AuthToken',
  function($scope, $location, AuthToken) {
      AuthToken.unset('auth_token');
      $location.path('#/');
}]);


// Board controller
controllers.controller('boardCtrl', ['$scope', 'boardFactory', '$routeParams',
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

// Signup controller
controllers.controller('signupCtrl', ['$scope', '$location', 'usersFactory', 'reCAPTCHA', 'flash','alertService',
    function($scope, $location, usersFactory, reCAPTCHA, flash,alertService) {
    $scope.submitted = false; // Set form unsubmitted to unable validation messages
    reCAPTCHA.setPublicKey('6LeV5wQTAAAAAA4uCs95tbEZwBNP55UlSCiI21lC');
    $scope.createNewUser = function() {
      if ($scope.signupform.$valid) {
        usersFactory.create($scope.user)
          .success(function(resp) {
            flash.setMessage("You received confirmation email. Please activate your account!");
            $location.path('/');
          }).error(function(resp) {

            $scope.errorMessage = resp.status.message;
             alertService.add('Please fill put the form properly', 'danger');

          });
      } else {
        $scope.signupform.submitted = true;
      }
    }
}]);

// Reset password controller
controllers.controller('resetCtrl', ['$scope', '$location','resetFactory',
  function($scope, $location,resetFactory) {
    $scope.doReset = function() {
         resetFactory.reset_password($scope.reset.email);
         $location.path('#/login');
    }
}]);

controllers.controller('newProjectCtrl', ['$scope', '$location','projectFactory', 'usersFactory','alertService',function($scope,$location, projectFactory,usersFactory,alertService) {
  $scope.title = "NEW_PROJECT";
  usersFactory.index()
  .success(function(data) {
    $scope.users = data.document.users;
  });
   $scope.submitted = false;

  $scope.saveProject = function() {
    if ($scope.newprojectform.$valid) {
    projectFactory.create($scope.project.name,$scope.project.code_name,$scope.project.description,$scope.selected_users)
    .success(function(resp) {
       alertService.add('Project created', 'success');
      $location.path('/dashboard');
    }).error(function(resp) {
      alertService.add('Error creating project', 'danger');
      $location.path('/project/new');
    });
  }
  else{
    $scope.newprojectform.submitted = true;
  }
}
}]);

controllers.controller('projectCtrl', ['projectFactory', function(projectFactory) {
  var project = this;

  projectFactory.index()
  .success(function(data) {
    project.projects = data.document.projects;
  });

}]);

controllers.controller('projectPageCtrl', ['$scope', 'projectFactory', '$routeParams','alertService', function($scope, projectFactory, $routeParams,alertService) {
  if($routeParams && $routeParams.id) {
    projectFactory.show($routeParams.id)
    .success(function(response) {
      $scope.project = response.document.project;
      $scope.title = $scope.project.name;
      $scope.description = $scope.project.description;
      $scope.summary = response.document.summary;
      var chartsBuilder = new ChartsBuilder($scope.summary);
      $scope.charts = chartsBuilder.build();
    });
     $scope.saveProject = function() {
    projectFactory.update($scope.project.name,$scope.project.code_name,$scope.project.description,$routeParams.id)
    .success(function(resp) {
       alertService.add('Project edited', 'success');
      $scope.title = $scope.project.name;
      $scope.description = $scope.project.description;
   }).error(function(resp) {
      alertService.add('Error editing project', 'danger');
    });
  }

    projectFactory.show_role($routeParams.id)
    .success(function(response) {
      $scope.role=response.document.role;
  });
     projectFactory.find_members($routeParams.id)
  .success(function(data) {
    $scope.users = data.document.users;
    $scope.selected_users=data.document.users;
  });
      $scope.editMembers = function() {
    projectFactory.remove_members($scope.selected_users,$routeParams.id)
    .success(function(resp) {
       projectFactory.find_members($routeParams.id)
  .success(function(data) {
    alertService.add('Members removed', 'success');
    $scope.users = data.document.users;
    $scope.selected_users=data.document.users;
  });

    }).error(function(resp) {
      alertService.add('Error deleting members', 'danger');
    });
  }
   $scope.checkString = function(data) {
    if (data.length<3) {
      return "It must be longer than 3 charactes";
    }
     if (data.length>25) {
      return "It must be less than 25 charactes";
    }


  };



}
}]);

controllers.controller('inboxCtrl', ['$scope', 'messagesFactory', function($scope, messagesFactory) {
  $scope.title = "INBOX";

  messagesFactory.all()
  .success(function(data) {
    $scope.messages = data.document.messages;
  });
}]);

controllers.controller('messageCtrl', ['$scope', 'messagesFactory', '$routeParams', function($scope, messagesFactory, $routeParams) {
  $scope.title = "INBOX";

  messagesFactory.get($routeParams.id)
  .success(function(data) {
    $scope.message = data.document.message;
  });
}]);

controllers.controller('newMessageCtrl', ['$scope', 'messagesFactory', 'usersFactory', 'alertService', '$location',
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