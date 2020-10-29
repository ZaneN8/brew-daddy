class Api::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update, :destroy, :image_update]
  before_action :set_user, only: [:stats]


  def index 
    render json: User.all
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def update
    if @current_user.update(user_params)
      render json: @current_user
    else
      render json: @current_user.errors, status: 422
    end
  end

  def image_update
    file = params[:file]

    if file
      begin
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        @current_user[:image] = cloud_image["secure_url"]
      rescue => e
        render json: { errors: e }, status: 422
        return
      end
    end

    if @current_user.save
      render json: @current_user
    else
      render json: @current_user.errors, status: 422
    end

  end

  def ratings
    render json: User.ratings(params[:user_id])
  end

  def stats
    render json: @user.stats
  end

  def destroy
    user.find(params[:id]).destroy
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email,:about_me, :image)
  end
    
  def set_user
    @user = User.find(params[:user_id])
  end
end
