class TicketTimelineCalculator < Calculator
  def calculate(project)
    tickets = project.tickets.group_by {|ticket| ticket.created_at.to_date }

    {
      type: 'historicalBarChart',
      title: 'Tickets Creation Timeline',
      data: [{
        key: 'Number of tickets',
        bar: true,
        values: tickets.map {|ticket| [ticket[0].to_time.to_i * 1000, ticket[1].count] }
      }]
    }
  end
end