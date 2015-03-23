class Api::ProjectsController < ApiController
before_filter :restrict_api_access

  def show
     foundedProject=Project.find(params[:id])
     render response: { foundedProject: foundedProject.to_json }
  end
  
  def create
	Project.create(project_params)
    render response: { :message => "Project added."}
  end
  
  def update
    Project.find(params[:id]).update(project_params)
    render response: { :message => "Project successfully edited."}
  end
  
  def destroy
    Project.find(params[:id]).destroy
    render response: { :message => "Project deleted."}
  end
  
  def index
	projects = Project.all
    render response: { projects: projects}
  end

  private
  def project_params
    params.permit(:name, :code_name, :description)
  end

end






  