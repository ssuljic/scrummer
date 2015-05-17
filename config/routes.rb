Scrummer::Application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :sessions, only: :create

    resources :tickets do
      resources :comments do
        collection do
          get :search
        end
      end
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
      resources :members, :only => [:index, :create, :destroy, :update] do
        collection do
          get :search
        end
      end
      member do
        get :remaining_tickets
        resource :board, only: [:show, :update]
        resources :sprints, :only => [:create]
      end
      resources :backlogs, :only => [:index] do
        collection do
        end
      end
      resources :tickets
    end

    resources :messages, only: [:index, :show, :create]

    resource :dashboard, only: :show
  end

  match '/api/*any',  to: 'api#no_route', via: :all
end
