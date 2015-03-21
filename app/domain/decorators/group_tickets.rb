module Domain
  module Decorators
    class GroupTickets
      def initialize tickets
        @tickets = tickets.map(&:serializable_hash)
      end

      def decorate
        @tickets.group_by { |t| t[:type] }
      end
    end
  end
end