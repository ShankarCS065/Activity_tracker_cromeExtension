require "test_helper"

class Api::V1::WebsiteVisitsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get api_v1_website_visits_create_url
    assert_response :success
  end
end
