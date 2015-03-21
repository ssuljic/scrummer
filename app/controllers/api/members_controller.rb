class Api::MembersController < ApiController
  before_filter :restrict_api_access

  def create
    UserProject.create(:user_id => params[:id], :project_id => params[:project_id], :role_id => Role.member)
    render response: { :message => "Member added."}
  end

  def index
    members = @current_user.projects.find(params[:project_id]).users.includes(:user_projects)
    render response: { :users => members }
  end

  def search
    search_usernames = Project.find(params[:project_id]).get_available_users.where("username like ?", "%#{params[:name]}%")
    render response: { :users => search_usernames }
  end

  def destroy
    UserProject.find_by(:user_id => params[:id]).destroy
    render response: { :users => "Member deleted." }
  end

  private
  def member_params
    params.permit(:id)
  end
end