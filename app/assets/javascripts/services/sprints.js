scrummer.factory('sprintsFactory', function ($http) {
  return {
    create: function(project_id, sprint, tickets, remaining_tickets) {
      return $http.post('api/projects/' + project_id + '/sprints', {
        sprint: sprint,
        tickets: tickets,
        remaining_tickets: remaining_tickets
       });
    }
  }
});