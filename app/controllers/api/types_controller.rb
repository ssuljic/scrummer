class Api::TypesController < ApiController
before_filter :restrict_api_access

  #Shows all types
  def index
    types = Type.all
    render response: { types: types}
  end

end