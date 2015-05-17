class UserStory < ActiveRecord::Base
  belongs_to :project
  belongs_to :sprint
  has_many   :tickets

  validates :project_id, presence: true

  def serializable_hash options={}
    {
      id:          id,
      name:        name,
      description: description
    }
  end
end