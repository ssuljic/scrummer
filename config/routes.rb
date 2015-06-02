Scrummer::Application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :sessions, only: :create

    resources :tickets do
      resources :comments, only: :create
    end

    resources :users, only: [:create, :update, :destroy, :show,:index] do
      collection do
        post :check_email
        post :check_username
        get  :change_password_form
        put  :change_password
        get  :confirm
        post :reset_password
      end
      resources :comments
    end

    resources :projects do
       collection do
        post :show_role
      end
      resources :members, :only => [:index, :create, :destroy, :update] do
        collection do
          get :search
          post :remove_members
        end
      end
      member do
        get :available_users
        get :remaining_tickets
        resource :board, only: [:show, :update]
        resources :sprints, :only => [:create]
      end
      resources :backlogs, :only => [:index] do
        collection do
        end
      end
      resources :uploads
      resources :tickets
	  resource :backlog do
		resource :userstories
	  end
    end

    resources :messages, only: [:index, :show, :create]
    resources :types
    resources :statuses
    resource :dashboard, only: :show
  end

  match '/api/*any',  to: 'api#no_route', via: :all
end
