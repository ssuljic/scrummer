class UserStory < ActiveRecord::Base
  belongs_to :project
  belongs_to :sprint
  has_many   :tickets

  def serializable_hash options={}
    {
      id:          id,
      name:        name,
      description: description,
      tickets:     tickets.map(&:serializable_hash)
    }
  end
end