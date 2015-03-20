class InvalidAuthentication < ScrummerException
	def user_friendly_message
		'Email or password is not correct'
	end
end