module Domain
	module Api
		class Response
		  attr_accessor :document
		  attr_accessor :status

		  def initialize(options = {}) 
		    self.document = options[:document]
		    self.status = options[:status] || Status.ok 
		  end
		end
	end
end