class Api::CommentsController < ApiController
  before_filter :restrict_api_access

  # shows comments in json format that are found with id
  def show
     foundedComment=Comment.find(params[:id])
     render response: { foundedComment: foundedComment.to_json }
  end

  #create comments connected to tickets and users
  def create
    Comment.create(comment_params)
    render response: { :message => "Comment created."}
  end
  #updates content of specific comment
   def update
    Comment.find(params[:id]).update(update_params)
    render response: { :message => "Comment successfully edited."}
  end
  #delete comment
  def destroy
    Comment.find(params[:id]).destroy
    render response: { :message => "Comment deleted."}
  end
  #show all comments of specific user or specific ticket
  def index
      begin
        if params[:ticket_id]
          found_comment=Comment.where(ticket_id: params[:ticket_id])
        elsif params[:user_id]
          found_comment=Comment.where(user_id: params[:user_id])
        end
        render response: { :comments => found_comment }
        rescue
          render json:{message:'There is no comments!'},:status=>:bad_request
      end
  end
  # declaration od parameters
  private
  def comment_params
    params.permit(:ticket_id,:content,:user_id)
  end

  def update_params
    params.permit(:content)
  end


end
