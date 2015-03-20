class Api::SessionsController < ApiController
  def create
    user = User.authenticate(params[:email], params[:password])
    session_key = nil
    raise InvalidAuthentication unless user

    if (user)
      user.update_attributes(session_key: SecureRandom.hex) unless user.session_key
      session_key = user.session_key
    end

    render response: { session_key: session_key }
  end
end