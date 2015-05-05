# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Scrummer::Application.initialize!

ActionMailer::Base.smtp_settings = {
  :address        => 'smtp.sendgrid.net',
  :port           => '587',
  :authentication => :plain,
  :user_name      => ENV['SENDGRID_USERNAME'] || 'app35202232@heroku.com',
  :password       => ENV['SENDGRID_PASSWORD'] || 'z07smf3d5931',
  :domain         => 'heroku.com',
  :enable_starttls_auto => true
}
