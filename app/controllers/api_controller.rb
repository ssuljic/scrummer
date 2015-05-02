class ApiController < ActionController::Base
  # Check API authentication token
  def restrict_api_access
    decoded_token = Domain::Api::AuthToken.decode(http_auth_header_content)
    raise NotAuthenticated if decoded_token.nil?
    raise ExpiredToken if decoded_token.expired?
    @current_user = User.find(decoded_token[:user_id])
  end

  def current_user
    @current_user
  end

  # Renderer
  ActionController::Renderers.add :response do |obj, options|
    render json: Domain::Api::Response.new(document: obj, user: current_user)
  end

  # Error handling
  rescue_from StandardError do |error|
    render json: Domain::Api::Response.new(status: Domain::Api::Status.from_exception(error)), status: 500
  end

  # No End Point
  def no_route
    raise NoRoute
  end

  # Authentication header content
  def http_auth_header_content
    return @http_auth_header_content if defined? @http_auth_header_content
    @http_auth_header_content = begin
      if request.headers['Authorization'].present?
        request.headers['Authorization'].split('=').last
      else
        nil
      end
    end
  end
end