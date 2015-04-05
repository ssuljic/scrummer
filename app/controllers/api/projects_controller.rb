class Api::ProjectsController < ApiController
before_filter :restrict_api_access

  #Shows project with specified id
  def show
    begin
      foundedProject=Project.find(params[:id])
      render response: { foundedProject: foundedProject.to_json }
	rescue 
	  render response: { :message => "Project with specified id not found!"}
	end
  end

  #Creates new project with provided parameters, and assigns user that created project as project_manager (role_id = 1)
  def create
    new_project = Project.create(project_params)
	UserProject.create(user_id: @current_user.id, role_id: 1, project_id: new_project.id)
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

  #Project parameters
  private
  def project_params
    params.permit(:name, :code_name, :description)
  end

end
