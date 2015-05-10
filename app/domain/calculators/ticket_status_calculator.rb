class TicketStatusCalculator < Calculator
  def calculate(project)
    tickets_count = project.tickets.count

    to_do_count = project.tickets.where(status_id: Status.to_do.id).count
    in_progress_count = project.tickets.where(status_id: Status.in_progress.id).count
    to_verify_count = project.tickets.where(status_id: Status.to_verify.id).count
    closed_count = project.tickets.where(status_id: Status.closed.id).count

    if tickets_count == 0
      data = []
    else
      data = [
        { key: 'To do', y: to_do_count.to_f / tickets_count },
        { key: 'In progress', y: in_progress_count.to_f / tickets_count },
        { key: 'To verify', y: to_verify_count.to_f / tickets_count },
        { key: 'Closed', y: closed_count.to_f / tickets_count }
      ]
    end

    {
      type: 'pieChart',
      title: 'Status of Tickets',
      data: data
    }
  end
end