class Api::BoardsController < ApiController
  before_filter :restrict_api_access

  def show
    board = Board.new(Sprint.find_by(active: true))
    render response: { board: board.to_json }
  end
end