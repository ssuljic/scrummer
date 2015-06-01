class SummaryBuilder
  attr_accessor :data, :project

  def initialize(project)
    @data = {}
    @project = project
    @calculators = {
      ticket_status: TicketStatusCalculator.new,
      ticket_timeline: TicketTimelineCalculator.new,
      ticket_assignment: TicketAssignmentCalculator.new,
	    ticket_type: TicketTypeCalculator.new,
      stacked:StackedCalculator.new
    }
  end

  def build
    @calculators.each_pair do |sym, calculator|
      @data[sym] = calculator.calculate @project
    end
    self
  end
end