class Board
  attr_accessor :sprint, :tickets, :statuses

  def initialize sprint
    @sprint  = sprint
    @tickets = Domain::Decorators::TicketOrganizer.new(sprint.tickets.map(&:serializable_hash), Status).decorate
    @statuses = Status.all.order(:id)
  end

  def to_json
    { sprint:  sprint, tickets: tickets, statuses: statuses }
  end
end