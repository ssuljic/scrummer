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
              '<p>' +
                '{{title | translate}}' +
                '<small style="color:gray;margin-left:20px;">' +
                  ' {{description}}' +
                '</small>' +
                '<button class="btn btn-default" ng-click="changeLanguage(\'bs\')" translate="BUTTON_TEXT_BS"></button>' +
                '<button class="btn btn-default" ng-click="changeLanguage(\'en\')" translate="BUTTON_TEXT_EN"></button>' +
                '<a ng-href="/#/logout" translate="LOGOUT"></a>' +
                '<a ng-href="/#/inbox" translate="INBOX"></a>' +
                '<a ng-href="/#/dashboard" translate="DASHBOARD"></a>' +
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
