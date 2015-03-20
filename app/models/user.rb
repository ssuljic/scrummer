class User < ActiveRecord::Base
  has_many :user_projects
  has_secure_password

  def self.authenticate(email, password)
    user = User.find_by(email: email).try(:authenticate, password)
  end
end
