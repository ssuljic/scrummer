class Api::BacklogsController < ApiController
  before_filter :restrict_api_access
 #show all user stories and sprintes conected to specific project
  def index
    project = current_user.projects.where(id: params[:project_id]).first
    raise NotAuthorized if project.nil?

    project = Project.find(params[:project_id])
    tickets = Ticket.where(:project_id => params[:project_id], :sprint_id => nil)
    render response: { :tickets => tickets, :project => project, :user_role => project.get_role(@current_user.id) }
  end
end