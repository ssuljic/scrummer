class Api::ActivitiesController < ApiController
  before_filter :restrict_api_access
end