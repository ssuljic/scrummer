class EmptyUser < ScrummerException
  def user_friendly_message
    'User must not be empty'
  end
end