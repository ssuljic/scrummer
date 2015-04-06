class Api::SessionsController < ApiController

  # Public:
  # POST /api/sessions
  # @params: :email, :password
  # @returns: JSON Web Token used to authenticate other API requests
  # Authenticates the user
  def create
    session_key = User.authenticate(params[:email], params[:password])
    raise InvalidAuthentication unless session_key
    render response: { session_key: session_key }
  end
end