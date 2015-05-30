class Comment < ActiveRecord::Base
  belongs_to :ticket
  belongs_to :user

  validates :user_id, presence: true
  validates :ticket_id, presence: true

  def serializable_hash options={}
    {
      content:    content,
      user:       user.serializable_hash,
      created_at: created_at.strftime('%d.%m.%Y %H:%M:%S')
    }
  end
end