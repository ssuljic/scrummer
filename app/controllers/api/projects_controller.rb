class Api::ProjectsController < ApiController
before_filter :restrict_api_access

  #Shows project with specified id
  def show
    #byebug
    project = Project.find(params[:id])
    summary = SummaryBuilder.new(project).build.data

    render response: {
      project: project,
      summary: summary,
      :user_role => project.get_role(@current_user.id)
    }
  end

  #Creates new project with provided parameters, and assigns user that created project as project_manager (role_id = 1)
  def create
    new_project = Project.new(project_params)
    @selected=params[:selected_users]
    new_project.save!
	  user_project=UserProject.new(user_id: @current_user.id, role_id: Role.manager, project_id: new_project.id)
    user_project.save!
    new_project.create_activity key: 'project.is_created', owner: @current_user, :params => {:context => new_project.id}
    @selected.each do  |obj|
      user_project=UserProject.new(user_id: obj["id"], role_id: Role.member, project_id: new_project.id)
      user_project.save!
    end
    render response: { :message => "Project added."}
  end

  #Updates project with specified id
  def update
    Project.find(params[:id]).update(project_params)
    render response: { :message => "Project successfully edited."}
  end

  #Deletes project with provided id
  def destroy
    begin
      Project.find(params[:id]).destroy
      render response: { :message => "Project deleted."}
	rescue
	  render response: { :message => "Project with specified id not found!"}
	end
  end

  #Shows all projects
  def index
    projects = current_user.projects
    render response: { projects: projects}
  end

  #Get ramianing tickets for new sprint
  def remaining_tickets

    tickets = Project.find(params[:id]).sprints.where(:active => true).first.tickets.where(:status_id => [ActiveRecord::Base::Status.to_do.id, ActiveRecord::Base::Status.in_progress.id, ActiveRecord::Base::Status.to_verify.id])
    render response: { tickets: tickets}
  end

  #Project parameters
  private
  def project_params
    params.permit(:name, :code_name, :description)
  end
  def user_params
    params.permit(:selected_users)
  end

end
