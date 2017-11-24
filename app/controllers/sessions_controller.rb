class SessionsController < ApplicationController

  def create
      set_oauth_info_from request.env['omniauth.auth']['credentials']
      redirect_to root_path
      # auth = request.env["omniauth.auth"]
      # user = User.find_by_provider_and_uid(auth["provider"], auth["uid"])
      # session[:user_id] = user.id
      # session[:access_token] = auth["credentials"]["token"]
      # # set_oauth_info_from request.env['omniauth.auth']['credentials']
      # redirect_to root_path
    end

  	def destroy
		session.delete(:user_id)
      session[:access_token] = nil
    	redirect_to root_path
	end
end
