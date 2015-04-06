class Api::BoardsController < ApiController
  before_filter :restrict_api_access

  # Public:
  # GET /api/projects/:id/board
  # @params: :id (id of project)
  # @returns: json representation of Board object
  # Shows the active sprint of the project with with the specified id, with the tickets and user stories associated with that sprint.
  def show
    project = current_user.projects.where(id: params[:id]).first
    raise NotAuthorized if project.nil?

    active_sprint = project.sprints.find_by(active: true)
    raise NoActiveSprint if active_sprint.nil?

    board = Board.new(active_sprint).to_json
    render response: { board: board }
  end
end