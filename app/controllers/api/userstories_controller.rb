class Api::UserstoriesController < ApiController
before_filter :restrict_api_access

  #Creates new user story with provided parameters
  def create
	UserStory.create(project_id: params[:project_id], sprint_id: 123, name: params[:name], description: params[:description])
    render response: { :message => "User story added."}
  end

  def index
	stories = UserStory.where(project_id: params[:project_id])
    render response: { stories: stories}
  end
end