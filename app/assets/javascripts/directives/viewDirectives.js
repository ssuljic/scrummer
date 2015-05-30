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
    link: function($scope, $element) {},
    template:'<div class="page-header" id="header">' +
              '<p class="header">' +
                '{{title | translate}}' +
                '<small class="desc">' +
                  ' {{description.substring(0, 50)}}...' +
                '</small>' +
                '<button class="btn btn-lang" ng-click="changeLanguage(\'bs\')" translate="BUTTON_TEXT_BS"></button>' +
                '<button class="btn btn-lang" ng-click="changeLanguage(\'en\')" translate="BUTTON_TEXT_EN"></button>' +
                '<a ng-href="/#/logout"><span class="glyphicon glyphicon-log-out icon"></span></a>' +
                '<a ng-href="/#/inbox"><span class="glyphicon glyphicon-envelope icon"></span></a>' +
                '<a ng-href="/#/dashboard"><span class="glyphicon glyphicon-home icon"></span></a>' +
              '</p>' +
            '</div>',
    controller: function($scope, $element, $translate) {
      $scope.changeLanguage = function (langKey) {
        console.log(langKey);
        $translate.use(langKey);
      };
    }
  };
}]);
