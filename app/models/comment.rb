class Comment < ActiveRecord::Base
  belongs_to :ticket
  belongs_to :user

  validates :user_id, presence: true
  validates :ticket_id, presence: true
end