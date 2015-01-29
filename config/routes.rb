Rails.application.routes.draw do
  root :to => 'welcome#index'
  get '/api/v1/structure/all', to: 'structures#all'
end
