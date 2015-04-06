class UserMailer < ActionMailer::Base
  default from: "no-reply@scrummer-nwt.herokuapp.com"

  def confirmation_email(user)
    @user = user
    mail(to: @user.email, subject: 'Confirm account on Scrummer')
  end
  def reset_password(user)
    @user=user
    mail(to: @user.email,
         subject: 'Your new password!')
  end
end
