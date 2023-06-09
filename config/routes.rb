Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  post 'api/test', to: 'application#test'

  namespace :api, defaults: { format: :json } do
      resources :users, only: [:create]
      resource :session, only: [:show, :create, :destroy]
      resources :products, only: [:index, :show] do 
        collection do 
          get 'search'
        end 
        resources :reviews, only: [:index, :create, :update, :destroy]
      end 
      resources :cart_items, only: [:index, :show, :create, :update, :destroy] do 
        collection do
          delete 'destroy_all'
        end
      end
  end


  get '*path', to: 'static_pages#frontend'

end
