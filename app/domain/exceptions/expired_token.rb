class ExpiredToken < ScrummerException
  def user_friendly_message
    'Your session has expired'
  end
end