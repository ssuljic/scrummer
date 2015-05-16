var messageService = angular.module('messageService', []);

messageService.factory('messageFactory', function() {
  messages = [];

  return {
    get: function() {
      return messages;
    },
    add: function(msg, type) {
      messages.push({ type: type, msg: msg });
    },
    close: function(index) {
      messages.splice(index, 1);
    }
  };
});