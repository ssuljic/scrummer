class EmptyCommentContent < ScrummerException
  def user_friendly_message
    'Content must not be empty'
  end
end