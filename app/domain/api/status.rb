module Domain
  module Api
    class Status < StandardError
      attr_accessor :message

      def initialize(options = {})
        super(options[:message])
        self.message = options[:message]
      end

      def self.from_exception(exception)
        if exception.instance_of?(Status)
          exception
        elsif exception.class.superclass == ScrummerException
          general_error(exception.user_friendly_message)
        else
          general_error(exception.message)
        end
      end

      # Factory
      def self.ok
        return Api::Status.new(message: 'OK')
      end

      def self.general_error(msg)
        return Api::Status.new(message: msg)
      end

      def self.routing_error
        return Api::Status.new(message: 'Page not found')
      end
    end
  end
end