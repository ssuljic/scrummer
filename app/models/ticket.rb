class Ticket < ActiveRecord::Base
  belongs_to :project
  belongs_to :user_story
  belongs_to :sprint
  belongs_to :user
  belongs_to :type
  belongs_to :status
  has_many   :worklogs
  has_many   :comments

  validates :user_id, presence: true
  validates :project_id, presence: true
  validates :type_id, presence: true
  validates :status_id, presence: true

  before_create :set_seq

  scope :independent, -> { where(user_story_id: nil) }

  def serializable_hash options={}
    ticket = {
      id:          id,
      name:        "#{project.code_name}-#{seq}",
      description: description,
      estimate:    estimate,
      type:        type.name,
      status:      status.name,
      assigned_to: user.serializable_hash,
      comments:    comments
    }
    unless user_story.nil?
      ticket[:user_story] = user_story
    end
    ticket
  end

  private
  def set_seq
    self.seq = Ticket.last.seq + 1
  end
end