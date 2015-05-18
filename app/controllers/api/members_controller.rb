class Api::MembersController < ApiController
  before_filter :restrict_api_access

  # Adds new member on specified project.
  # POST   /api/projects/:project_id/members    api/members#create
  def create
    UserProject.create(:user_id => params[:id], :project_id => params[:project_id], :role_id => Role.member)
    render response: { :message => "Member added."}
  end

  # Gets all members on specified project.
  # GET    /api/projects/:project_id/members   api/members#index
  def index
    begin
      members = User.where(:id => UserProject.where(:project_id => params[:project_id], :role_id => Role.member).map {|u| u.user_id})
      render response: { :users => members }
    rescue
      raise NotAuthorized
    end
  end

  # Search available users (not-members on specified project) by username. Client sends keyword and server returns all users whose username contains keyword.
  # GET    /api/projects/:project_id/members/search   api/members#search
  def search
    begin
      search_usernames = @current_user.projects.find(params[:project_id]).get_available_users.where("username like ?", "%#{params[:name]}%")
      render response: { :users => search_usernames }
    rescue
      raise NotAuthorized
    end
  end

  # Promote user to manager
  # PUT    /api/projects/:project_id/members/:member_id   api/members#update
  def update
    UserProject.where(:project_id => params[:project_id], :user_id => params[:id]).first.update_attribute(:role_id, Role.manager)
    render response: { :message => "Member promoted." }
  end

  # Removes member from specified project.
  # DELETE /api/projects/:project_id/members/:id   api/members#destroy
  def destroy
    begin
      UserProject.find_by(:user_id => params[:id]).destroy
      render response: { :users => "Member deleted." }
    rescue
      raise NotAuthorized
    end
  end

  def remove_members
    if params[:selected_users].present?
        @selected=params[:selected_users]
         @selected.each do  |obj|
          user_project=UserProject.find_by(user_id: obj["id"]).destroy
          end
       render response: { :users => "Members deleted." }
    end
  end

  #Member parameters
  private
  def member_params
    params.permit(:id,:selected_users)
  end



end