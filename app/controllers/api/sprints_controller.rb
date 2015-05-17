class Api::SprintsController < ApiController
  before_filter :restrict_api_access

  # Input: project id, sprint and tizkets for new sprint
  def create
    begin

      # Update current sprint to inactive
      Project.find(params[:id]).sprints.where(:active => true).first.update(:active => false)
      # Create new sprint
      sprint = Sprint.create(sprint_params)
      # Move remaining tickets and add new tickets to sprint
      unless params[:tickets].nil?
        params[:tickets].each do |t|
          Ticket.find(t[:id]).update_attribute(:sprint_id, sprint.id)
        end
      end
      unless params[:remaining_tickets].nil?
        params[:remaining_tickets].each do |t|
          Ticket.find(t[:id]).update_attribute(:sprint_id, sprint.id)
        end
      end
      Project.find(params[:id]).create_activity key: 'project.new_sprint', owner: @current_user
      render response: { status: 'Sprint started successfully.' }
    rescue
      raise SprintStartError
    end
  end

  private
  def sprint_params
    params[:sprint][:active] = true;
    params[:sprint][:start_date] = DateTime.now.to_date
    params[:sprint][:project_id] = params[:id]
    params.require(:sprint).permit(:name, :end_date, :active, :start_date, :project_id)
  end
end