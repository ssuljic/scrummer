class Status < ActiveRecord::Base
  has_many :tickets

  def serializable_hash options={}
    super(except: [:created_at, :updated_at])
  end
end