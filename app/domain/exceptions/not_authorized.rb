class NotAuthorized < ScrummerException
  def user_friendly_message
    'You are not authorized to perform this request'
  end
end