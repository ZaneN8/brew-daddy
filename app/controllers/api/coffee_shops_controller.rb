class Api::CoffeeShopsController < ApplicationController
before_action :authenticate_user!, only: [:create, :update, :destroy]
before_action :set_coffee_shop, only: [:show, :update, :destroy, :search, :coffee_ratings, :average_stats, :count_reviews]
before_action :set_user, only: [:cu_index]

  # For Search stuff:  https://www.justinweiss.com/articles/search-and-filter-rails-models-without-bloating-your-controller/
  
  def index 
    # Search v1
    # coffee_shop_result = CoffeeShop.where(nil)
    # coffee_shop_result = CoffeeShop.filter_by_name(params[:name]) if params[:name].present?
    # render json: coffee_shop_result 

    coffee_shop_result = CoffeeShop.where(nil)
    filtering_params.each do |key, value|
      coffee_shop_result = coffee_shop_result.public_send("filter_by_#{key}", value) if value.present?
    end
    render json: coffee_shop_result
  end

  def cu_index
    render json: @user.coffee_shops.order(created_at: :desc)
  end

  def show
    render json: @coffee_shop
  end

  def create
    coffee_shop = @current_user.coffee_shops.new(coffee_shop_params)
    file = params[:file]

    if file
      begin
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        coffee_shop[:image] = cloud_image["secure_url"]
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end

    if coffee_shop.save
      render json: coffee_shop
    else
      render json: coffee_shop.errors, status: 422
    end
  end

  def update

    file = params[:file]
 
    if file
      begin
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        @coffee_shop[:image] = cloud_image["secure_url"]
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end

    if @coffee_shop.update(coffee_shop_params)
      render json: @coffee_shop

    else
      render json: @coffee_shop.errors, status: 422

    end
  end

  def destroy
    @coffee_shop.destroy
    render json: "Data deleted"
  end

  def all_ratings
    render json: CoffeeShop.ratings_all
  end

  def ratings
    render json: CoffeeShop.ratings(params[:coffee_shop_id])
  end

  # should be route /api/coffee_shops/:id/average_stats
  def average_stats
    render json: @coffee_shop.average_stats
  end

  def count_reviews
    render json: @coffee_shop.count_reviews
  end

  
  private

  def set_coffee_shop
    @coffee_shop = CoffeeShop.find(params[:id])
  end

  def filtering_params
    params.permit(:name, :state, :zip, :city, :page)
  end

  def coffee_shop_params
    params.permit(
      :name,
      :description,
      :image,
      :address,
      :city,
      :state,
      :zip,
      :menu,
      :website,
      :open,
      :contact_info,
      :cost,
      :delivery,
      :pickup,
      :order_online,
      :user_id
    )
  end

  def set_user
    @user = User.find(params[:user_id])
  end

end