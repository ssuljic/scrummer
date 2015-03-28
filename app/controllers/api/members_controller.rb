class Api::MembersController < ApiController
  before_filter :restrict_api_access

  # Adds new member on specified project.
  def create
    UserProject.create(:user_id => params[:id], :project_id => params[:project_id], :role_id => Role.member)
    render response: { :message => "Member added."}
  end

  #Gets all members on specified project.
  def index
    members = @current_user.projects.find(params[:project_id]).users.includes(:user_projects)
    render response: { :users => members }
  end

  #Search available users (not-members on specified project) by username. Client sends keyword and server returns all users whose username contains keyword.
  def search
    search_usernames = Project.find(params[:project_id]).get_available_users.where("username like ?", "%#{params[:name]}%")
    render response: { :users => search_usernames }
  end

  #Removes member from specified project.
  def destroy
    UserProject.find_by(:user_id => params[:id]).destroy
    render response: { :users => "Member deleted." }
  end

  #Member parameters
  private
  def member_params
    params.permit(:id)
  end
end