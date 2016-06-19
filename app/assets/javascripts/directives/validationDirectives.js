var validator = angular.module('validator', ['reCAPTCHA']);

// Directive for password confirmation validation
validator.directive('compareTo', function() {
  return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

// Directive for password strength validation
validator.directive('validatePasswordCharacters', function () {
    return {
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            ngModel.$validators.lowerCase = function (value) {
                var pattern = /[a-z]+/;
                return (typeof value !== 'undefined')
                    && pattern.test(value);
            };
            ngModel.$validators.upperCase = function (value) {
                var pattern = /[A-Z]+/;
                return (typeof value !== 'undefined')
                    && pattern.test(value);
            };
            ngModel.$validators.number = function (value) {
                var pattern = /\d+/;
                return (typeof value !== 'undefined')
                    && pattern.test(value);
            };
            ngModel.$validators.specialCharacter = function (value) {
                var pattern = /\W+/;
                return (typeof value !== 'undefined')
                    && pattern.test(value);
            };
        }
    }
});

// Ensure uniqueness of data directive
validator.directive('ensureUniqueEmail', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        console.log(attrs);
        $http({
          method: 'POST',
          url: 'api/users/check_email',
          data: {'field': attrs.ensureUniqueEmail}
        }).success(function(data, status, headers, cfg) {
          c.$setValidity('unique', data.document.isUnique);
        }).error(function(data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  }
}]);

// Ensure uniqueness of data directive
validator.directive('ensureUniqueUsername', ['$http', function($http) {
  return {
    require: 'ngModel',
    link: function(scope, ele, attrs, c) {
      scope.$watch(attrs.ngModel, function() {
        $http({
          method: 'POST',
          url: 'api/users/check_username',
          data: {'field': attrs.ensureUniqueUsername}
        }).success(function(data, status, headers, cfg) {
          c.$setValidity('unique', data.document.isUnique);
        }).error(function(data, status, headers, cfg) {
          c.$setValidity('unique', false);
        });
      });
    }
  }
}]);

// Configuration of captcha
validator.config(function (reCAPTCHAProvider) {
    // required
    reCAPTCHAProvider.setPublicKey('6LeV5wQTAAAAAA4uCs95tbEZwBNP55UlSCiI21lC');
    // optional
    reCAPTCHAProvider.setOptions({
        theme: 'clean'
    });
});