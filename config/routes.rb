Scrummer::Application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :sessions, only: :create do
      collection do
        delete :logout
      end
    end

    resources :tickets do
      resources :comments
    end

    resources :users do
      resources :comments
    end

    resources :users, only: [:create, :update, :destroy, :show] do
      member do
        put 'change_password'
      end
    end

    resources :projects do
      resources :members, :only => [:index, :create, :destroy] do
        collection do
          get 'search'
        end
      end
      member do
        resource :board, only: :show
      end
    end

    resource :dashboard, only: :show

  end


  match '/api/*any',  to: 'api#no_route', via: :all
end
