'use strict';

// Controllers

var controllers = angular.module('controllers', ['ui.bootstrap']);

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
controllers.controller('backlogCtrl', ['$scope', '$location', '$modal', '$log', 'backlogFactory', '$translate', '$routeParams',
  function($scope, $location, $modal, $log, backlogFactory, $translate, $routeParams) {
    backlogFactory.get($routeParams.id)
    .success(function(resp) {
        if(resp.status.message == "OK") {
          $scope.tickets= resp.document.tickets;
          $scope.selectedTickets = [];
          $scope.project = resp.document.project;
          $scope.title = resp.document.project.name;
          $scope.description = resp.document.project.description;
          $scope.user_role = resp.document.user_role;
          $scope.panels = [{name: "Sprint"}, {name: "Backlog"}];
          $scope.selectedItems = createOptions();
          $scope.notSelectedItems = createOptions();
      }
    });

    function createOptions() {
      var options = {
        placeholder: "ticket",
        connectWith: ".ticket-space-backlog",
      };
      return options;
    }

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'newSprintModalContent.html',
        controller: 'newSprintModalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.selectedTickets;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function (action) {
        if(action=="OK") {
          $scope.selectedTickets = [];
        }
      });
    };

    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);

// New sprint
controllers.controller('newSprintModalCtrl', function ($scope, $location, $modalInstance, items, projectFactory, $routeParams, sprintsFactory) {

  $scope.items = items;
  projectFactory.remainingTickets($routeParams.id)
    .success(function(resp) {
     $scope.remaining_tickets = resp.document.tickets;
  });

  $scope.start = function () {
    sprintsFactory.create($routeParams.id, $scope.sprint, $scope.items, $scope.remaining_tickets)
    .success(function(resp) {
       $modalInstance.dismiss('OK');
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

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
            alertService.add("You received confirmation email. Please activate your account!", 'success');
            $location.path('/');
          }).error(function(resp) {
            $scope.errorMessage = resp.status.message;
             alertService.add(resp.status.message, 'danger');
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

//New project controller
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
       alertService.add("Project added", 'success');
      $location.path('/dashboard');
    }).error(function(resp) {
       alertService.add("Error adding project", 'danger');
      $location.path('/project/new');
    });
  }
  else{
    $scope.newprojectform.submitted = true;
  }
}
}]);

//Project controller
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
      $scope.user_role = response.document.user_role;
      var chartsBuilder = new ChartsBuilder($scope.summary);
      $scope.charts = chartsBuilder.build();
    });
     $scope.saveProject = function() {
    projectFactory.update($scope.project.name,$scope.project.code_name,$scope.project.description,$routeParams.id)
    .success(function(resp) {
      $scope.title = $scope.project.name;
      $scope.description = $scope.project.description;
       alertService.add("Project edited!", 'success');
   }).error(function(resp) {
       alertService.add("Error editing project", 'danger');
    });
  }

    projectFactory.show_role($routeParams.id)
    .success(function(response) {
      $scope.role=response.document.role;
  });
     projectFactory.find_members($routeParams.id)
  .success(function(data) {
    $scope.users = data.document.users;
  });
      $scope.editMembers = function() {
    projectFactory.remove_members($scope.selected_users,$routeParams.id)
    .success(function(resp) {
       alertService.add("Members removed", 'success');
       projectFactory.find_members($routeParams.id)
  .success(function(data) {
    $scope.users = data.document.users;
    $scope.selected_users='';

  });

    }).error(function(resp) {
       alertService.add("Error removing members", 'danger');
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

//New user story controller
 controllers.controller('newUserStoryCtrl', ['$scope', '$location','userStoryFactory', '$routeParams','alertService',function($scope,$location, userStoryFactory,$routeParams,alertService) {
  $scope.title = "New user story";

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

controllers.controller('membersCtrl', ['membersFactory', '$routeParams', '$scope', '$location','alertService',
  function(membersFactory, $routeParams, $scope, $location,alertService) {

  membersFactory.get($routeParams.id)
    .success(function(response) {
      $scope.members = response.document.users;
    });

  $scope.promote = function(member_id) {
    membersFactory.update($routeParams.id, member_id)
    .success(function(response) {
       alertService.add("User promoted", 'success');
      $location.path('/projects/'+$routeParams.id);
    });
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

controllers.controller('resourcesCtrl', ['$scope', 'uploadsFactory', '$routeParams', function($scope, uploadsFactory, $routeParams) {
  $scope.title = "RESOURCES";
  $scope.project_id = $routeParams.project_id;

  uploadsFactory.all($routeParams.project_id)
  .success(function(data) {
    console.log(data);
    $scope.resources = data.document.resources;
  });
}]);

controllers.controller('newResourceCtrl', ['$scope', 'uploadsFactory', '$location', 'FileUploader', '$routeParams',
  function($scope, uploadsFactory, $location, FileUploader, $routeParams) {
  $scope.title = "RESOURCES";
  $scope.uploader = new FileUploader({url: '/api/projects/' + $routeParams.project_id + '/uploads'});

  $scope.upload = function() {
    $scope.uploader.uploadItem(0);
    $location.path('/projects/' + $routeParams.project_id);
  }
}]);
