class Api::StatusesController < ApiController
before_filter :restrict_api_access

  #Shows all statuses
  def index
    statuses = Status.all
    render response: { statuses: statuses}
  end

end