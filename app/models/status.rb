class Status < ActiveRecord::Base
  has_many :tickets

  def serializable_hash options={}
    super(except: [:created_at, :updated_at])
  end

  def self.to_do
    self.where(name: 'To do').first
  end

  def self.in_progress
    self.where(name: 'In progress').first
  end

  def self.to_verify
    self.where(name: 'To verify').first
  end

  def self.closed
    self.where(name: 'Closed').first
  end
end