class NoUserFound < ScrummerException
  def user_friendly_message
    'No user found.'
  end
end