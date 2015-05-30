class Api::CommentsController < ApiController
  before_filter :restrict_api_access

  def create
    raise EmptyCommentContent if params[:content].nil? || params[:content].empty?
    comment = Comment.create!(ticket_id: params[:ticket_id], content: params[:content], user_id: current_user.id)
    render response: { comment: comment }
  end
end
