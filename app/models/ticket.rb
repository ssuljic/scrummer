class Ticket < ActiveRecord::Base
	belongs_to :project
	belongs_to :user_story
	belongs_to :sprint
	has_one    :type
	has_one    :status
	has_many   :worklogs
	has_many   :comments
end