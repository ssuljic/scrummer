class Api::SessionsController < ApiController
  def create
    session_key = User.authenticate(params[:email], params[:password])
    raise InvalidAuthentication unless session_key
    render response: { session_key: session_key }
  end
end