class Api::UsersController < ApiController
  before_filter :restrict_api_access, except: [:create, :confirm, :reset_password]

  #Creates new user with provided parameters
  #POST   /api/users    api/users#create
  def create
    user = User.new(user_params)
    user.is_active = false
    # Translate captcha params to match what expect captcha gem
    params[:recaptcha_challenge_field] = params[:user][:captcha][:challenge]
    params[:recaptcha_response_field] = params[:user][:captcha][:response]
    if verify_recaptcha
      user.save!
      begin
        UserMailer.confirmation_email(user).deliver
      rescue
        puts 'Failed to send email'
      end
      render response: { :message => "User created."}
    else
      raise WrongCaptcha
    end
  end

  #Updates information of user with specified id.
  #PUT/PATCH    /api/users/:id   api/users#update
  def update
    if @current_user.id == params[:id]
      User.active.find(params[:id]).update(update_params)
      render response: { :message => "User successfully updated."}
    else
      raise NotAuthorized
    end
  end

  #Changes password of user with specified id
  #PUT/PATCH  /api/users/:id/change_password    api/users#change_password
  def change_password
    user = User.active.find(params[:id])
    if user.try(:authenticate, params[:old_password])
      user.update(password: params[:password], password_confirmation: params[:password_confirmation])
      render response: { :message => "Password successfully changed."}
    end
  end

  #Show user
  #GET    /api/users/:id    api/users#show
  def show
    begin
      user =  User.active.find(params[:id])
      render response: { :user => user }
    rescue
      raise NoUserFound
    end
  end

  #Deactivates account of user, and sets 'is_active' field to false.
  #DELETE   /api/users/:id    api/users#destroy
  def destroy
    if @current_user.id == params[:id]
      User.find(params[:id]).update(:is_active => false)
      render response: { :message => "You are deactivated."}
    else
      raise NotAuthorized
    end
  end

  #Helper method to decode user session token.
  def confirm
    decoded_token = Domain::Api::AuthToken.decode(params[:token])
    User.find(decoded_token[:user_id]).update(is_active: true)
    redirect_to root_path
  end

  def reset_password
      #Ako ga nije nasao poruka upozorenja dodati
      user = User.find_by(email: params[:email])
      #generates randum string for new password
      o =  [('a'..'z'),('A'..'Z')].map{|i| i.to_a}.flatten
      @new_password =  (0...50).map{ o[rand(o.length)]  }.join
      user.password=@new_password
      user.password_confirmation=@new_password
      user.save
       begin
      UserMailer.reset_password(user).deliver
    rescue
      puts 'Failed to send email'
    end
    render response: { :message => "Password successfully reseted."}
  end

  #Parameters for creating new user
  private
  def user_params
    params.require(:user).permit(:firstname, :lastname, :email, :username, :password, :password_confirmation)
  end

  #Parameters for updating information of existing user
  def update_params
    params.permit(:firstname, :lastname, :email, :username)
  end
end