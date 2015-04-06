class Ticket < ActiveRecord::Base
  belongs_to :project
  belongs_to :user_story
  belongs_to :sprint
  belongs_to :user
  belongs_to :type
  belongs_to :status
  has_many   :worklogs
  has_many   :comments

  scope :independent, -> { where(user_story_id: nil) }

  def serializable_hash options={}
    {
      id:          id,
      name:        "#{project.code_name}-#{seq}",
      description: description,
      estimate:    estimate,
      type:        type.name,
      status:      status.name,
      assigned_to: user.serializable_hash
    }
  end
end