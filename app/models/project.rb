class Project < ActiveRecord::Base
  has_many :user_projects
  has_many :user_stories
  has_many :tickets
  has_many :sprints
  has_many :notifications
end