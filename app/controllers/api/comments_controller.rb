class Api::CommentsController < ApiController
  before_filter :restrict_api_access


  def show
     foundedComment=Comment.find(params[:id])
     render response: { foundedComment: foundedComment.to_json }
  end

  def create
    Comment.create(comment_params)
    render response: { :message => "Comment created."}
  end

   def update
    Comment.find(params[:id]).update(update_params)
    render response: { :message => "Comment successfully edited."}
  end

  def destroy
    Comment.find(params[:id]).destroy
    render response: { :message => "Comment deleted."}
  end

  private
  def comment_params
    params.permit(:ticket_id,:content,:user_id)
  end

  def update_params
    params.permit(:content)
  end


end
