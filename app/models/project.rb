class Project < ActiveRecord::Base
  include PublicActivity::Common
  has_many :user_projects
  has_many :users, :through => :user_projects
  has_many :user_stories
  has_many :tickets
  has_many :sprints
  has_many :notifications
  has_many :uploads

  def get_available_users
    a = [-1] #In a case of all available users
    self.users.each do |u|
      a << u.id
    end
    User.where('id not :id in (?)', a)
  end

  def get_role(user_id)
    Role.find(UserProject.where(:user_id => user_id, :project_id => self.id ).first.role_id).name
  end

end