var view_directives = angular.module('view_directives', []);

// Page header view directive
view_directives.directive('header', ['$translate', function() {
  return {
    replace: true,
    scope: {
      title: '=',
      description: '=',
      logged_user: '='
    },
    link: function($scope, $element) {
      $scope.logout = function() {
        var result = confirm('Are you sure you want to log out?');
        if(result) {
          window.location = "/#/logout"
        }
      }
    },
    template:'<div class="page-header" id="header">' +
              '<p class="header">' +
                '{{title | translate}}' +
                '<small class="desc">' +
                  ' {{description.substring(0, 50)}}' +
                '</small>' +
                '<a ng-click="logout()"><span class="header-nav glyphicon glyphicon-log-out icon"></span></a>' +
                '<a ng-href="/#/inbox"><span class="header-nav glyphicon glyphicon-envelope icon"></span></a>' +
                '<a ng-href="/#/dashboard"><span class="header-nav glyphicon glyphicon-home icon"></span></a>' +
              '</p>' +
            '</div>',
    controller: function($scope, $element, $translate) {
      $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
      };
    }
  };
}]);
