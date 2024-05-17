# app/models/website_visit.rb

class WebsiteVisit < ApplicationRecord
  belongs_to :user
  belongs_to :website

  scope :daily, -> { where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day) }
  scope :weekly, -> { where(created_at: Time.zone.now.beginning_of_week..Time.zone.now.end_of_week) }
  scope :monthly, -> { where(created_at: Time.zone.now.beginning_of_month..Time.zone.now.end_of_month) }
  scope :yearly, -> { where(created_at: Time.zone.now.beginning_of_year..Time.zone.now.end_of_year) }
end
