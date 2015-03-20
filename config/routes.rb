Scrummer::Application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :sessions, only: :create
    resources :boards, only: :show
  end

  match '/api/*any',  to: 'api#no_route', via: :all
end
