var view_directives = angular.module('view_directives', []);


// Page header view directive
view_directives.directive('header', function() {
  return {
    replace: true,
    scope: {
      title: '=',
      description: '=',
      logged_user: '='
    },
    link: function($scope, $element) {},
    template:'<div class="page-header" id="header">' +
              '<p>' +
                '{{title}}' +
                '<small>' +
                  ' {{description}}' +
                '</small>' +
                '<button class="btn btn-default"><a ng-href="/#/logout">Log Out</a></button>' +
                '<button class="btn btn-default"><a ng-href="/#/dashboard">Dashboard</a></button>' +
              '</p>' +
            '</div>'
    };
  });
