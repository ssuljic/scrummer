class Role < ActiveRecord::Base
  has_and_belongs_to_many :privileges

  def self.member
    Role.find_by(:name => "Member").id
  end

  def self.manager
    Role.find_by(:name => "Manager").id
  end
end
