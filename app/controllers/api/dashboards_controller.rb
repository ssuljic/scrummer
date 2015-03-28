class Api::DashboardsController < ApiController
  before_filter :restrict_api_access

  #Shows all dashboard data for current user. Dashboard contains all notifications (adjusted representation) and projects assigned to user.
  def show
    notifications = Notification.where("project_id in (?)", @current_user.projects.map {|p| p.id})
    content = Domain::Decorators::AddWrapping.new(notifications.map(&:serializable_hash), @current_user).decorate
    render response: { dashboard: content }
  end
end