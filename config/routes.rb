# # Rails.application.routes.draw do
  # namespace :api do
  #   namespace :v1 do
  #     get 'website_visits/create'
  #   end
  # end
#   namespace :api do
#     namespace :v1 do
#       get 'users/show'
#       get 'users/update'
#     end
#   end
#   devise_for :users
#   # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
#   # Can be used by load balancers and uptime monitors to verify that the app is live.
#   get "up" => "rails/health#show", as: :rails_health_check

#   # Defines the root path route ("/")
#   # root "posts#index"
#   # config/routes.rb

#   resources :websites

# end
# # config/routes.rb

# Rails.application.routes.draw do
#   namespace :api do
#     namespace :v1 do
#       resources :users, only: [:show, :update] do
#         resources :website_visits, only: [:create]
#       end
#     end
#   end
# end

# config/routes.rb

# Rails.application.routes.draw do
#   namespace :api do
#     namespace :v1 do
#       resources :users, only: [:show, :update] do
#         resources :website_visits, only: [:index] do
#           collection do
#             get :daily
#             get :weekly
#             get :monthly
#             get :yearly
#           end
#         end
#       end
#     end
#   end
# end

# config/routes.rb

# Rails.application.routes.draw do
#   namespace :api do
#     namespace :v1 do
#       resources :users, only: [] do
#         member do
#           post :log_idle_time
#         end
#       end
#     end
#   end
# end

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :users, controllers: {
        sessions: 'api/v1/sessions',
        registrations: 'api/v1/registrations'
      }
    end
  end
end


