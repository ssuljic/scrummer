class Api::TicketsController < ApiController
before_filter :restrict_api_access

  #Shows ticket with specified id
  def show
    ticket = Ticket.find(params[:id])
    raise NotAuthorized unless current_user.projects.include? ticket.project
    render response: { ticket: ticket }
  end

  #Creates new ticket with provided parameters
  def create
	Ticket.create(description: params[:description], estimate: params[:estimate], type_id: params[:type_id], project_id: params[:project_id], status_id: 1, user_id:params[:selected_user] )
    render response: { :message => "Ticket added."}
  end

  #Updates ticket with specified id
  def update
    ticket = Ticket.find(params[:ticket][:id])
    ticket.description = params[:ticket][:description]
    ticket.estimate = params[:ticket][:estimate]
    ticket.type = Type.find_by_name(params[:ticket][:type])
    ticket.user = User.find(params[:ticket][:assigned_to][:id])
    ticket.save!
    render response: { :message => "Ticket successfully edited."}
  end

  #Deletes ticket with provided id
  def destroy
    begin
      Ticket.find(params[:id]).destroy
      render response: { :message => "Ticket deleted."}
	rescue
	  render response: { :message => "Ticket with specified id not found!"}
	end
  end

  #Shows all tickets in specified project
  def index
	tickets = Ticket.where(project_id: params[:project_id])
    render response: { tickets: tickets}
  end

  #Ticket parameters
  private
  def ticket_params
    params.permit(:description, :estimate, :type_id)
  end

end