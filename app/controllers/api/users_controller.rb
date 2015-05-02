class Api::UsersController < ApiController
  before_filter :restrict_api_access, only: [:update, :destroy, :show]

  # Public:
  # POST /api/users
  # @params: :firstname, :lastname, :email, :username, :password, :password_confirmation, :captcha
  # @returns: success message or exception message if validation fails
  # Creates a new user
  def create
    user = User.new(user_params)
    user.is_active = false
    # Translate captcha params to match what expect captcha gem
    params[:recaptcha_challenge_field] = params[:user][:captcha][:challenge]
    params[:recaptcha_response_field] = params[:user][:captcha][:response]
    if verify_recaptcha
      user.save!
      begin
        UserMailer.confirmation_email(user, request.url.split('/api').first).deliver
      rescue
        puts 'Failed to send email'
      end
      render response: { :message => "User created."}
    else
      raise WrongCaptcha
    end
  end

  # Public:
  # PUT/PATCH /api/users/:id
  # @params: :id, :firstname, :lastname, :email, :username
  # @returns: success message or exception message if validation fails
  # Updates user
  def update
    if @current_user.id == params[:id]
      User.active.find(params[:id]).update(update_params)
      render response: { :message => "User successfully updated."}
    else
      raise NotAuthorized
    end
  end

  # Public:
  # PUT/PATCH /api/users/:id
  # @params: :token, :password, :password_confirmation
  # @returns: redirects to home page
  # Updates password of user who is authenticated with the provided JWT
  def change_password
    decoded_token = Domain::Api::AuthToken.decode(params[:token])
    @user = User.find(decoded_token[:user_id])
    @user.update!(password: params[:password], password_confirmation: params[:password_confirmation])
    redirect_to root_path
  end

  # Public:
  # GET /api/users/:id
  # @params: :id
  # @returns: JSON representation of the user, or exception if user is not found
  def show
    begin
      user =  User.active.find(params[:id])
      render response: { :user => user }
    rescue
      raise NoUserFound
    end
  end

  # Public:
  # DELETE /api/users/:id
  # @params: :id
  # @returns: success message or exception message if validation fails
  # Deactivates account of user, and sets 'is_active' field to false.
  def destroy
    if @current_user.id == params[:id]
      User.find(params[:id]).update(:is_active => false)
      render response: { :message => "You are deactivated."}
    else
      raise NotAuthorized
    end
  end

  # Public:
  # GET /api/users/confirm
  # @params: :token
  # @returns: redirects to home page
  # Activates account of user, and sets 'is_active' field to true.
  def confirm
    decoded_token = Domain::Api::AuthToken.decode(params[:token])
    User.find(decoded_token[:user_id]).update(is_active: true)
    redirect_to root_path
  end

  # Public:
  # POST /api/users/reset_password
  # @params: :email
  # @returns: success message or exception
  # Sends email with password reset instructions
  def reset_password
    user = User.find_by(email: params[:email])
    begin
      UserMailer.reset_password(user, request.url.split('/api').first).deliver
      render response: { :message => "Email sent." }
    rescue
      raise 'Failed to send email'
    end
  end

  # Public:
  # POST /api/users/check_email
  # @params: :field
  # @returns: true or false
  # Helper method to check uniqueness of email
  def check_email
    render response: { :isUnique => User.exists?(:email => params[:field]) }
  end

  # Public:
  # POST /api/users/check_username
  # @params: :field
  # @returns: true or false
  #Helper method to check uniqueness of username
  def check_username
    render response: { :isUnique => User.exists?(:username => params[:field]) }
  end

  # Public:
  # GET /api/users/change_password_form
  # @params:
  # @returns: change passsword view
  # Displays a form for password reseting
  def change_password_form
  end


  private
  # Parameters for creating new user
  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :username, :password, :password_confirmation)
  end

  # Parameters for updating information of existing user
  def update_params
    params.permit(:firstname, :lastname, :email, :username)
  end
end