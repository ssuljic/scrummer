module Domain
  module Decorators
    class TicketOrganizer

      def initialize tickets, status_service
        @tickets = tickets
        @statuses = status_service.all.map(&:name)
      end

      def decorate
        grouped_tickets = {}
        @statuses.each { |status| grouped_tickets[status] = [] }

        @tickets.each do |ticket|
          grouped_tickets[ticket[:status]] << ticket
        end

        grouped_tickets
      end

    end
  end
end