class HomeController < ApplicationController
	def index
		render json: { status: :OK }
	end
end