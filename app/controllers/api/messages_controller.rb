class Api::MessagesController < ApiController
  before_filter :restrict_api_access

  def index
    messages = Message.where('from_id = ? OR to_id = ?', current_user.id, current_user.id).order('created_at DESC')
    render response: { messages: messages }
  end

  def show
    message = Message.where('from_id = ? OR to_id = ?', current_user.id, current_user.id).find(params[:id])
    render response: { message: message }
  end

  def create
    raise EmptyRecipient if params[:recipient].nil?
    message = Message.create(from_id: current_user.id, to_id: params[:recipient][:id], title: params[:title], content: params[:content])
    render response: { message: message }
  end
end