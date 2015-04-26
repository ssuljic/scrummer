class UserMailer < ActionMailer::Base
  default from: "no-reply@scrummer-nwt.herokuapp.com"

  def confirmation_email(user, host)
    @user = user
    @host = host
    mail(to: @user.email, subject: 'Confirm account on Scrummer')
  end

  def reset_password(user, host)
    @user = user
    @host = host
    mail(to: @user.email, subject: 'Request for password reset!')
  end
end
