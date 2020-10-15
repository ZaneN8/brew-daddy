class Api::UsersController < ApplicationController
  before_action :authenticate_user!, only: [:update, :destroy]


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

    def destroy
      user.find(params[:id]).destroy
    end

    private

    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :image)
    end

end
