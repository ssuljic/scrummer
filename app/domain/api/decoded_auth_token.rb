module Domain
  module Api
    class DecodedAuthToken < HashWithIndifferentAccess
      def expired?
        self[:expired] == true
      end
    end
  end
end