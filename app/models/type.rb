class Type < ActiveRecord::Base
  has_many :tickets
  
  def serializable_hash options={}
    super(except: [:created_at, :updated_at])
  end

  def self.bug
    self.where(name: 'Bug').first
  end

  def self.issue
    self.where(name: 'Issue').first
  end

  def self.improvement
    self.where(name: 'Improvement').first
  end

  def self.new_feature
    self.where(name: 'New feature').first
  end
end