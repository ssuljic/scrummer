class Binary < ActiveRecord::Base
  has_many :uploads

  def file_data=(input_data)
    self.data = IO.binread(input_data.tempfile.path)
  end
end