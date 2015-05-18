class TicketTypeCalculator < Calculator
  def calculate(project)
    tickets_count = project.tickets.count

    bug_count = project.tickets.where(type_id: Type.bug.id).count
    issue_count = project.tickets.where(type_id: Type.issue.id).count
    improvement_count = project.tickets.where(type_id: Type.improvement.id).count
    new_feature_count = project.tickets.where(type_id: Type.new_feature.id).count

    if tickets_count == 0
      data = []
    else
      data = [
        { key: 'Bug', y: bug_count.to_f / tickets_count },
        { key: 'Issue', y: issue_count.to_f / tickets_count },
        { key: 'Improvement', y: improvement_count.to_f / tickets_count },
        { key: 'New feature', y: new_feature_count.to_f / tickets_count }
      ]
    end

    {
      type: 'pieChart',
      title: 'Type of Tickets',
      data: data
    }
  end
end