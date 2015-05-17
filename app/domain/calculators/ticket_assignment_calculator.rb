class TicketAssignmentCalculator < Calculator
  def calculate(project)
    users = project.users
    data = users.map { |u|
      { key: u.username,
        values: [ ["To Do", project.tickets.where(status_id: Status.to_do.id, user_id: u.id).count],
                  ["In progress", project.tickets.where(status_id: Status.in_progress.id, user_id: u.id).count],
                  ["To verify", project.tickets.where(status_id: Status.to_verify.id, user_id: u.id).count],
                  ["Closed", project.tickets.where(status_id: Status.closed.id, user_id: u.id).count]
                ]
      }
    }
    #byebug
    {
      type: 'multiBarChart',
      title: 'Tickets per Users',
      data: data
    }
  end
end