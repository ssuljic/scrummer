class Upload < ActiveRecord::Base
  belongs_to :binary,  :dependent => :destroy
  belongs_to :project
  belongs_to :user
  before_create :save_binary
  attr_accessor :file_data

  def save_binary
    @binary = Binary.create(:file_data => self.file_data)
    self.binary_id = @binary.id
    self.filename = self.file_data.original_filename
    self.content_type = self.file_data.content_type.chomp
    self.size = @binary.data.size
  end

  def serializable_hash options={}
    {
      id:       id,
      filename: filename,
      user:     user
    }
  end
end