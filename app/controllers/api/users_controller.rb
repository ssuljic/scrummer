class Api::UsersController < ApiController
  before_filter :restrict_api_access, except: :create

  def create
    @user = User.create(user_params)
    render response: { :message => "User created."}
  end

  def update
    @user = User.find(params[:id])
    @user.update(update_params)
    render response: { :message => "User successfully updated."}
  end

  def change_password
    @user = User.find(params[:id])
    if @current_user.try(:authenticate, params[:old_password])
      @user.update(password: params[:password], password_confirmation: params[:password_confirmation])
      render response: { :message => "Password successfully changed."}
    end
  end

  private
  def user_params
    params.permit(:firstname, :lastname, :email, :username, :password, :password_confirmation)
  end

  def update_params
    params.permit(:firstname, :lastname, :email, :username)
  end
end