class Api::BoardsController < ApiController
  before_filter :restrict_api_access

  def show
    sprint = Project.find(params[:id]).sprints.find_by(active: true)
    board = Board.new(sprint)
    render response: { board: board.to_json }
  end
end