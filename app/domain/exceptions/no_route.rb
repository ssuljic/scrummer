class NoRoute < ScrummerException
  def user_friendly_message
    'Page not found'
  end
end