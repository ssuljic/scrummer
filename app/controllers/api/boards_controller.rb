class Api::BoardsController < ApiController
	before_filter :restrict_api_access

	def show
		render response: { view: :board}
	end
end