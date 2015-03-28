class Api::BoardsController < ApiController
  before_filter :restrict_api_access

  #Shows the active sprint of the project with with the specified id, with the tickets and user stories associated with that sprint.
  def show
    sprint = Project.find(params[:id]).sprints.find_by(active: true)
    board = Board.new(sprint)
    render response: { board: board.to_json }
  end
end