class Api::UsersController < ApiController
  before_filter :restrict_api_access, except: :create

  def create
    User.create(user_params)
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

  private
  def user_params
    params.permit(:firstname, :lastname, :email, :username, :password, :password_confirmation)
  end

  def update_params
    params.permit(:firstname, :lastname, :email, :username)
  end
end