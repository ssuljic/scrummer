class User < ActiveRecord::Base
  has_many :user_projects
  has_one  :session
  has_secure_password

  def self.authenticate(email, password)
    user = User.find_by(email: email).try(:authenticate, password)
    return nil unless user

    # Create session if not present
    user.session = Session.create(key: SecureRandom.hex, user_id: user.id) unless user.session
    user.session.key
  end
end
