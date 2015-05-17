class Api::DashboardsController < ApiController
  before_filter :restrict_api_access

  #Shows all dashboard data for current user. Dashboard contains all notifications (adjusted representation) and projects assigned to user.
  def show
    project_activities = Activity.where("trackable_type = 'Project' and trackable_id in (?)", @current_user.projects.map {|p| p.id})
    msg_activities = Activity.where("trackable_type = 'Message' and recipient_id = (?)", @current_user.id)
    activities = project_activities + msg_activities
    content = Domain::Decorators::AddWrapping.new(activities.map(&:serializable_hash), @current_user).decorate
    render response: { dashboard: content }
  end
end