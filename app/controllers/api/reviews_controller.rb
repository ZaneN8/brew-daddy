class Api::ReviewsController < ApplicationController
  # before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_coffee_shop, only: [:index, :create, :destroy, :update]
  before_action :set_review, only: [:update, :edit, :destroy]
  before_action :set_user, only: [:cu_reviews] 

  def index
    render json: @coffee_shop.reviews
  end

  def cu_reviews
    render json: @user.reviews
  end

  def all
    render json: Review.all
  end

  def create
    review = @coffee_shop.reviews.new(review_parmas)
    if (review.save)
      render json: review
    else
      render json: review.errors, status: 422
    end
  end

  def update
    if @review.update(review_parmas)
      render json: @review
    else
      render json: @review.errors, status: 422
    end
  end

  def destroy
    review = @review.destroy
    render json: "Data deleted"
  end

  private

  def set_review
    
    @review = @coffee_shop.reviews.find(params[:id])
  end

  def review_parmas
    params
    .require(:reviews)
    .permit(
      :title,
      :body,
      :rating,
      :coffee_rating,
      :work_friendly,
      :food,
      :noise_level,
      :user_id,
    )
  end

  def set_coffee_shop
    @coffee_shop = CoffeeShop.find(params[:coffee_shop_id])
  end

  def set_user
    @user = User.find(params[:user_id])
  end
end

