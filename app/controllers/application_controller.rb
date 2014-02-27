class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Devise authenticate 

  # the user doesn't have to be authenticated to play
  # before_action :authenticate_user!

  before_filter :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :twitter_handle
    devise_parameter_sanitizer.for(:account_update) << :twitter_handle
  end

end
