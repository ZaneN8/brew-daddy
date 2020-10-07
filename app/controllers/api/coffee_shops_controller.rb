class Api::CoffeeShopsController < ApplicationController
# before_action :authenticate_user!
before_action :set_coffee_shop, only: [:show, :update, :destroy, :search]

  # For Search stuff:  https://www.justinweiss.com/articles/search-and-filter-rails-models-without-bloating-your-controller/
  
  def index 
    coffee_shop_result = CoffeeShop.where(nil)
    coffee_shop_result = CoffeeShop.filter_by_name(params[:name]) if params[:name].present?
    render json: coffee_shop_result 
    # render json: CoffeeShop.all
    # replace here <-----
  end

  def cu_index
    render json: @current_user.coffee_shops
  end

  def show
    render json: @coffee_shop
  end

  def create
    coffee_shop = @current_user.coffee_shops.new(coffee_shop_params)
      if coffee_shop.save
        render json: coffee_shop
      else
        render json: coffee_shop.errors, status: 422
      end
  end

  def update
    # TODO confirm no instance '@' is needed
    current_user.coffee_shops << parmas[:id].to_i
    current_user.save
  end


  def destroy
    @coffee_shop.destroy
  end




  private

  def set_coffee_shop
    @coffee_shop = CoffeeShop.find(params[:id])
  end

  def coffee_shop_params
    params
      .require(:coffee_shop)
      .permit(
        :name, 
        :description, 
        :image, 
        :city, 
        :state, 
        :zip, 
        :open, 
        :contact_info, 
        :cost, 
        :delivery, 
        :pickup,
        :order_online,
      )
  end




end











