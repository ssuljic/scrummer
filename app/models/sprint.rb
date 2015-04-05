class Sprint < ActiveRecord::Base
  belongs_to :project
  has_many   :tickets
  has_many   :user_stories

  def serializable_hash options={}
    {
      id:          id,
      name:        name,
      start_date:  start_date.strftime("%d.%m.%Y"),
      end_date:    end_date.strftime("%d.%m.%Y")
    }
  end
end