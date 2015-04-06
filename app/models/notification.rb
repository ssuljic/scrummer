class Notification < ActiveRecord::Base
  belongs_to :project

  validates :project_id, presence: true

  def serializable_hash options={}
    {
      project:          project.code_name,
      content:          content,
      url:              url
    }
  end
end