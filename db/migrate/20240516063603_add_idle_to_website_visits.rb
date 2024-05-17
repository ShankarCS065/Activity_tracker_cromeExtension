class AddIdleToWebsiteVisits < ActiveRecord::Migration[7.1]
  def change
    add_column :website_visits, :idle, :boolean
  end
end
