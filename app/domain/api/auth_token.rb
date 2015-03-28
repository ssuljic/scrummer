module Domain
  module Api
    class AuthToken

      def self.encode(payload, exp=24.hours.from_now)
        payload[:exp] = exp.to_i
        JWT.encode(payload, Rails.application.config.secret_token)
      end

      def self.decode(token)
        payload = JWT.decode(token, Rails.application.config.secret_token)[0]
        Domain::Api::DecodedAuthToken.new(payload)
      rescue JWT::ExpiredSignature
        Domain::Api::DecodedAuthToken.new({ :expired => true })
      rescue
        nil
      end

    end
  end
end