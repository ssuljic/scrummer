class Api::SessionsController < ApiController
  before_filter :restrict_api_access, only: :logout

  def create
    session_key = User.authenticate(params[:email], params[:password])
    raise InvalidAuthentication unless session_key
    render response: { session_key: session_key }
  end

  def logout
    current_user.session.destroy!
    render response: { status: :OK }
  end
end