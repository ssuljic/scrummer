class Api::TicketsController < ApiController
before_filter :restrict_api_access

  #Shows ticket with specified id
  def show
  	begin
        foundedTicket = Ticket.find(params[:id])
        render response: { foundedTicket: foundedTicket.to_json }
  	rescue
  	  render response: { :message => "Ticket with specified id not found!"}
  	end
  end

  #Creates new ticket with provided parameters
  def create
	Ticket.create(description: params[:description], estimate: params[:estimate], type_id: params[:type_id], project_id: params[:project_id], status_id: 1, user_id: @current_user.id)
    render response: { :message => "Ticket added."}
  end

  #Updates ticket with specified id
  def update
    Ticket.find(params[:id]).update(ticket_params)
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