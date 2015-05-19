class StackedCalculator < Calculator
  def calculate(project)
    users = project.users
    data = users.map { |u|
      { key: u.username,
        color: "#d62728",
        values: [ {label:"Bugs",value: project.tickets.where(type_id: Type.bug.id, user_id: u.id).count},
                  {label:"Issues", value:project.tickets.where(type_id: Type.issue.id, user_id: u.id).count},
                  {label:"Improvements", value:project.tickets.where(type_id:Type.improvement.id, user_id: u.id).count},
                  {label:"New features", value:project.tickets.where(type_id: Type.new_feature.id, user_id: u.id).count}
                ]
      }
    }

    {
      type: 'multiBarHorizontalChart',
      title: 'Types of tickets per user',
      data: data
    }
  end
end