require 'test_helper'

class Api::SamplesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_samples_index_url
    assert_response :success
  end

  test "should get show" do
    get api_samples_show_url
    assert_response :success
  end

  test "should get create" do
    get api_samples_create_url
    assert_response :success
  end

  test "should get update" do
    get api_samples_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_samples_destroy_url
    assert_response :success
  end

end
