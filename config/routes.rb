Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'
  namespace :api do 
    #This will list ALL review in database, for database validation. 
    #Remove the line below to disable view of all reviews.
    get "/reviews/all", to: "reviews#all"
    put "/users/:user_id/image", to: "users#image_update"
    get "/users/:user_id/coffee_shops", to: "coffee_shops#cu_index"
    get "/users/:user_id/reviews", to: "reviews#cu_reviews"
    get "/coffee_shops/:coffee_shop_id/ratings", to: "coffee_shops#ratings"
    get "/coffee_shops/ratings", to: "coffee_shops#all_ratings"
    get "/coffee_shops/:id/average_stats", to: "coffee_shops#average_stats"
    get "/coffee_shops/:id/count_reviews", to: "coffee_shops#count_reviews"

    resources :coffee_shops do
      resources :reviews
      resources :questions
    end

    resources :reviews do
      resources :review_pics
    end

    resources :questions do
      resources :answers
    end

    resources :coffee_shops do
        resources :questions
    end
    
    resources :questions, only: [] do
        resources :answers
    end 

    resources :users do
      resources :reviews
      resources :coffee_shops
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
