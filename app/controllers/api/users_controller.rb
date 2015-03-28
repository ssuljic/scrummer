class Api::UsersController < ApiController
  before_filter :restrict_api_access, except: [:create, :confirm]

  def create
    user = User.new(user_params)
    user.is_active = false
    user.save!
    # begin
      UserMailer.confirmation_email(user).deliver
    # rescue
    #   puts 'Failed to send email'
    # end
    render response: { :message => "User created."}
  end

  def update
    User.find(params[:id]).update(update_params)
    render response: { :message => "User successfully updated."}
  end

  def change_password
    user = User.find(params[:id])
    if user.try(:authenticate, params[:old_password])
      user.update(password: params[:password], password_confirmation: params[:password_confirmation])
      render response: { :message => "Password successfully changed."}
    end
  end

  def destroy
    User.find(params[:id]).update(:is_active => false)
    render response: { :message => "You are deactivated."}
  end

  def confirm
    decoded_token = Domain::Api::AuthToken.decode(params[:token])
    User.find(decoded_token[:user_id]).update(is_active: true)
    redirect_to root_path
  end

  private
  def user_params
    params.permit(:firstname, :lastname, :email, :username, :password, :password_confirmation)
  end

  def update_params
    params.permit(:firstname, :lastname, :email, :username)
  end
end