module Domain
  module Api
    class Status < StandardError
      attr_accessor :message
      attr_accessor :exception_message
      attr_accessor :stacktrace

      def initialize(options = {})
        super(options[:message])
        self.message = options[:message]
        self.exception_message = options[:exception_message]
        self.stacktrace = options[:stacktrace]
      end

      def self.from_exception(exception)
        if exception.instance_of?(Status)
          exception
        else
          general_error(exception)
        end
      end

      # Factory
      def self.ok
        return Api::Status.new(message: 'OK')
      end

      def self.general_error(e)
        msg = e.class.superclass == ScrummerException ? e.user_friendly_message : 'Error processing request'
        return Api::Status.new(message: msg,
                               exception_message: e.message,
                               stacktrace: e.backtrace)
      end
    end
  end
end