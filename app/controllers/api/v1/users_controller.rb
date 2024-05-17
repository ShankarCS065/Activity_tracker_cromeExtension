# app/controllers/api/v1/users_controller.rb

module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!

      def log_idle_time
        duration = params[:duration].to_i
        current_user.website_visits.create(duration: duration, idle: true)

        render json: { message: 'Idle time logged successfully' }, status: :ok
      end
    end
  end
end
