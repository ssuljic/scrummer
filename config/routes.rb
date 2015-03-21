Scrummer::Application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :sessions, only: :create do
      collection do
        delete :logout
      end
    end

    resources :boards, only: :show
  end

  match '/api/*any',  to: 'api#no_route', via: :all
end
