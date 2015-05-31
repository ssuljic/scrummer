class Api::MembersController < ApiController
  before_filter :restrict_api_access

  # Adds new member on specified project.
  # POST   /api/projects/:project_id/members    api/members#create
  def create
    project = Project.find(params[:project_id])
    raise NotAuthorized if project.get_role(current_user.id) != "Manager"
    raise EmptyUser if params[:user].nil? || params[:user].empty?
    UserProject.create(:user_id => params[:user][:id], :project_id => project.id, :role_id => Role.member)
    user = User.find(params[:user][:id])
    render response: { user: user.with_role(project), available_users: project.available_users }
  end

  # Gets all members on specified project.
  # GET    /api/projects/:project_id/members   api/members#index
  def index
    project = Project.find(params[:project_id])
    raise NotAuthorized if project.get_role(current_user.id) != "Manager"
    members = project.users.order(:id) #User.where(:id => UserProject.where(:project_id => project.id).map {|u| u.user_id})
    render response: {
      :users => members.map {|member| member.with_role(project)},
      :user_role => Project.find(params[:project_id]).get_role(@current_user.id)
    }
  end

  # Promote user to manager
  # PUT    /api/projects/:project_id/members/:member_id   api/members#update
  def update
    project = Project.find(params[:project_id])
    raise NotAuthorized if project.get_role(current_user.id) != "Manager"
    role = params[:role] == "manager" ? Role.manager : Role.member
    UserProject.where(:project_id => project.id, :user_id => params[:id]).first.update_attribute(:role_id, role)
    render response: { members: project.users.order(:id).map {|member| member.with_role(project)} }
  end

  # Removes member from specified project.
  # DELETE /api/projects/:project_id/members/:id   api/members#destroy
  def destroy
    project = Project.find(params[:project_id])
    raise NotAuthorized if project.get_role(current_user.id) != "Manager"
    UserProject.find_by(:user_id => params[:id]).destroy
    render response: {
      :members => project.users.order(:id).map {|member| member.with_role(project)},
      :available_users => project.available_users
    }
  end
end