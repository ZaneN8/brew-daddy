class Api::ReviewPicsController < ApplicationController
  before_action :set_review, only: [:create, :index, :destroy]
  before_action :set_review_pic, only: [:show, :destroy]
  before_action :set_coffee_shop, only: [:all_review_pics]

  def show
    
  end

  def all_review_pics
    review_pics = @coffee_shop.all_review_pics
    render json: review_pics 
  end

  def index
    # render json: @review.review_pics

    review_pic_result = @review.review_pics
    filtering_params.each do |key, value|
      review_pic_result = review_pic_result.public_send("filter_by_#{key}", value) if value.present?
    end
    render json: review_pic_result.order(created_at: :desc)
  end

  def create
    review_pic = @review.review_pics.new
    file = params[:file]

    if file
      begin
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        review_pic[:image] = cloud_image["secure_url"]
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end

    if review_pic.save
      render json: review_pic
    else
      render json: review_pic.errors, status: 422
    end
  end

  def destroy
    @review_pic.destroy
    render json: "Deleted Successfully"
  end

  private

  def filtering_params
    params.permit(:page)
  end

  def set_review
    @review = Review.find(params[:review_id])
  end
  

  def set_review_pic
    @review_pic = @review.review_pics.find(params[:id])
  end

  def set_coffee_shop
    @coffee_shop = CoffeeShop.find(params[:coffee_shop_id])
  end
end
