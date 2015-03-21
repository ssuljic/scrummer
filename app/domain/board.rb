class Board
  attr_accessor :sprint, :tickets, :stories

  def initialize(sprint)
    @sprint  = sprint
    @tickets = Domain::Decorators::GroupTickets.new(sprint.tickets.independent).decorate
    @stories = sprint.user_stories.map(&:serializable_hash).each do |story|
      story[:tickets] = Domain::Decorators::GroupTickets.new(story[:tickets]).decorate
    end
  end

  def to_json
    {
      sprint:  sprint,
      stories: stories,
      tickets: tickets
    }
  end
end