RickRampage::Application.routes.draw do

  get 'scores/top5' => 'scores#top5'
  resources :scores

  get "statics/aboutus"
  get "statics/game"

  root 'statics#game'
end
