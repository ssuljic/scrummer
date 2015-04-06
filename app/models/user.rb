class User < ActiveRecord::Base
  has_many :projects, :through => :user_projects
  has_many :user_projects
  has_many :tickets
  has_many :comments
  has_one  :session
  has_secure_password

  scope :active, -> { where(is_active: true) }

  def self.authenticate(email, password)
    user = User.active.find_by(email: email).try(:authenticate, password)
    return nil unless user
    user.generate_auth_token
  end

  def generate_auth_token
    payload = { user_id: self.id }
    Domain::Api::AuthToken.encode(payload)
  end

  def serializable_hash options={}
    super(except: [:created_at, :updated_at, :password_digest, :is_active])
  end
end
