class Board
  attr_accessor :sprint, :tickets, :stories

  def initialize(sprint)
    @sprint  = sprint
    @tickets = sprint.tickets.independent
    @stories = sprint.user_stories
  end

  def to_json
    tickets = @tickets.map(&:serializable_hash).group_by { |t| t[:type] }
    stories = @stories.map(&:serializable_hash)
    stories.each do |story|
      story[:tickets] = story[:tickets].map(&:serializable_hash).group_by { |t| t[:type] }
    end
    {
      sprint:  @sprint,
      stories: stories,
      tickets: tickets
    }
  end
end