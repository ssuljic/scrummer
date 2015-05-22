var alertService = angular.module('alertService', []);

alertService.factory('alertService', function() {
  alerts = [];

  return {
    get: function() {
      return alerts;
    },
    add: function(msg, type) {
      alerts.push({ type: type, msg: msg });
    },
    close: function(index) {
      alerts.splice(index, 1);
    }
  };
});