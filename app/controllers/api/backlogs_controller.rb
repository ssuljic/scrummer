class Api::BacklogsController < ApiController
  before_filter :restrict_api_access
 #show all user stories and sprintes conected to specific project
  def index
    #found_tickets =Ticket.where(id: params[:project_id])
    found_user_stories=UserStory.where(project_id: params[:project_id])
    found_sprints=Sprint.where(project_id: params[:project_id])
    render response: {:user_stories=>found_user_stories,:sprints =>found_sprints}
  end
end