class TicketStatusperuserCalculator < Calculator
  def calculate(project)
    users = project.users
    data = users.map { |u|
      { key: u.username,
        values: [ ["Bugs", project.tickets.where(type_id: Type.bug.id, user_id: u.id).count],
                  ["Issues", project.tickets.where(type_id: Type.issue.id, user_id: u.id).count],
                  ["Improvements", project.tickets.where(type_id:Type.improvement.id, user_id: u.id).count],
                  ["New features", project.tickets.where(type_id: Type.new_feature.id, user_id: u.id).count]
                ]
      }
    }

    {
      type: 'multiBarChart',
      title: 'Types of tickets per user',
      data: data
    }
  end
end