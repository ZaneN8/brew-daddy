class Api::QuestionsController < ApplicationController
  before_action :set_coffee_shop, only: [:index, :create, :destroy]
  def index 
    render json: @coffee_shop.questions
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render json: @question
    else
      redner json: @question.errors status: 422
  end

  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors status:422
    end
  end

  def destroy
    @question.destroy
    render json: "Data deleted"
  end

  private

  def question_params
    params
    .require(:question)
    .permit(:body, :coffee_shop_id)
  end

  def set_coffee_shop
    @coffee_shop = CoffeeShop.find(params[:coffee_shop_id])
  end
end
