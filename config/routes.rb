Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do 
    #This will list ALL review in database, for database validation. 
    #Remove the line below to disable view of all reviews.
    get "/reviews/all", to: "reviews#all"
    get "/:user_id/my_coffee_shops", to: "coffee_shops#cu_index"
    get "/:user_id/my_reviews", to: "reviews#cu_reviews"
    resources :coffee_shops do
      resources :reviews
    end

    #TODO We edited this
    resources :users do
      resources :reviews
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
