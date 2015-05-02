module Domain
  module Api
    class Response
      attr_accessor :document
      attr_accessor :status
      attr_accessor :user

      def initialize(options = {})
        self.document = options[:document]
        self.status = options[:status] || Domain::Api::Status.ok
        self.user = options[:user]
      end
    end
  end
end
