# app/controllers/api/v1/website_visits_controller.rb

module Api
  module V1
    class WebsiteVisitsController < ApplicationController
      before_action :authenticate_user!

      def index
        @website_visits = current_user.website_visits
        render json: @website_visits
      end

      def daily
        @website_visits = current_user.website_visits.daily
        render json: @website_visits
      end

      def weekly
        @website_visits = current_user.website_visits.weekly
        render json: @website_visits
      end

      def monthly
        @website_visits = current_user.website_visits.monthly
        render json: @website_visits
      end

      def yearly
        @website_visits = current_user.website_visits.yearly
        render json: @website_visits
      end
    end
  end
end
