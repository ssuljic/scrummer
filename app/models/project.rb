class Project < ActiveRecord::Base
  include PublicActivity::Common
  has_many :user_projects
  has_many :users, :through => :user_projects
  has_many :user_stories
  has_many :tickets
  has_many :sprints
  has_many :notifications

  def get_available_users
    a = [-1] #In a case of all available users
    self.users.each do |u|
      a << u.id
    end
    User.where('id not in (?)', a)
  end

end