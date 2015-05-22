var alertService = angular.module('alertService', []);

alertService.factory('alertService', function() {
  var alerts = [];

  return {
    get: function() {
      return alerts;
    },
    add: function(msg, type) {
      alerts.splice(0, alerts.length);
      alerts.push({ type: type, msg: msg });
    },
    close: function(index) {
      alerts.splice(index, 1);
    },
    clear: function() {
      alerts.splice(0, alerts.length);
    }
  };
});