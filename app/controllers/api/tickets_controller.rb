class Api::TicketsController < ApiController
before_filter :restrict_api_access

  def show
     foundedTicket=Ticket.find(params[:id])
     render response: { foundedTicket: foundedTicket.to_json }
  end
  
  def create
	Ticket.create(seq: params[:seq], description: params[:description], estimate: params[:estimate], type_id: params[:type_id], project_id: params[:project_id])
    render response: { :message => "Ticket added."}
  end
  
  def update
    Ticket.find(params[:id]).update(ticket_params)
    render response: { :message => "Ticket successfully edited."}
  end
  
  def destroy
    Ticket.find(params[:id]).destroy
    render response: { :message => "Ticket deleted."}
  end
  
  def index
	tickets = Ticket.all
    render response: { tickets: tickets}
  end

  private
  def ticket_params
    params.permit(:seq, :description, :estimate, :type_id)
  end

end