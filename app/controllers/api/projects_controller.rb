class Api::ProjectsController < ApiController
before_filter :restrict_api_access

  #Shows project with specified id
  def show
     foundedProject=Project.find(params[:id])
     render response: { foundedProject: foundedProject.to_json }
  end

  #Creates new project with provided parameters
  def create
    Project.create(project_params)
    render response: { :message => "Project added."}
  end

  #Updates project with specified id
  def update
    Project.find(params[:id]).update(project_params)
    render response: { :message => "Project successfully edited."}
  end

  #Deletes project with provided id
  def destroy
    Project.find(params[:id]).destroy
    render response: { :message => "Project deleted."}
  end

  #Shows all projects
  def index
    projects = Project.all
    render response: { projects: projects}
  end

  #Project parameters
  private
  def project_params
    params.permit(:name, :code_name, :description)
  end

end
