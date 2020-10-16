class Api::QuestionsController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_coffee_shop, only: [:index, :create, :update, :destroy]
  before_action :set_question, only: [:update, :destroy]


  def index 
    # render json: @coffee_shop.questions

    question_result = @coffee_shop.questions
    filtering_params(params).each do |key, value|
      question_result = question_result.public_send("filter_by_#{key}", value) if value.present?
    end
    render json: question_result
  end

  def create
    @question = @coffee_shop.questions.new(question_params)
    if @question.save
      render json: @question
    else
      render json: @question.errors, status: 422
    end
  end

  def update
    if @question.update(question_params)
      render json: @question
    else
      render json: @question.errors, status:422
    end
  end

  def destroy
    
    @question.destroy
    render json: "Data deleted"
  end

  private

  def filtering_params(params)
    params.permit(:page, :body)
  end

  def set_question
    @question = @coffee_shop.questions.find(params[:id])
  end

  def question_params
    params
    .require(:question)
    .permit(:body, :coffee_shop_id)
  end

  def set_coffee_shop
    @coffee_shop = CoffeeShop.find(params[:coffee_shop_id])
  end
end
