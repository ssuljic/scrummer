Scrummer::Application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :sessions, only: :create

    resources :tickets do
      resources :comments do
        collection do
          get 'search'
        end
      end
    end


    resources :users, only: [:create, :update, :destroy, :show] do
      collection do
        get 'confirm'
      end
      member do
        put 'change_password'
      end
      resources :comments
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
      resources :backlogs, :only => [:index] do
        collection do
        end
      end
      resources :tickets
    end

    resource :dashboard, only: :show

  end

  match '/api/*any',  to: 'api#no_route', via: :all
end
