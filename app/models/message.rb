class Message < ActiveRecord::Base
  belongs_to :sender, :class_name => :User, :foreign_key => "from_id"
  belongs_to :recipient, :class_name => :User, :foreign_key => "to_id"

  def serializable_hash options={}
    {
      id: id,
      title: title,
      content: content,
      sender: sender,
      recipient: recipient
    }
  end
end