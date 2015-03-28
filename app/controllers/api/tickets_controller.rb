class Api::TicketsController < ApiController
before_filter :restrict_api_access

  #Shows ticket with specified id
  def show
     foundedTicket=Ticket.find(params[:id])
     render response: { foundedTicket: foundedTicket.to_json }
  end
  
  #Creates new ticket with provided parameters
  def create
	Ticket.create(seq: params[:seq], description: params[:description], estimate: params[:estimate], type_id: params[:type_id], project_id: params[:project_id])
    render response: { :message => "Ticket added."}
  end
  
  #Updates ticket with specified id
  def update
    Ticket.find(params[:id]).update(ticket_params)
    render response: { :message => "Ticket successfully edited."}
  end
  
  #Deletes ticket with provided id
  def destroy
    Ticket.find(params[:id]).destroy
    render response: { :message => "Ticket deleted."}
  end
  
  #Shows all tickets
  def index
	tickets = Ticket.all
    render response: { tickets: tickets}
  end

  #Ticket parameters
  private
  def ticket_params
    params.permit(:seq, :description, :estimate, :type_id)
  end

end