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

// Configuration of captcha
validator.config(function (reCAPTCHAProvider) {
    // required
    reCAPTCHAProvider.setPublicKey('6LeV5wQTAAAAAA4uCs95tbEZwBNP55UlSCiI21lC');
    // optional
    reCAPTCHAProvider.setOptions({
        theme: 'clean'
    });
});