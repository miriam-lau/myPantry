Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :pantry_items, except: [:new, :show, :edit]
    resources :groceries, except: [:new, :show, :edit]
    resources :recipes, except: [:new, :edit]
    resources :reminders, except: [:new, :show, :edit, :update]
    get "/search", to: "search#search"
  end

  root "static_pages#root"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
