class Api::AnswersController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :destroy]
  before_action :set_question, only: [:index, :create, :update, :destroy]
  before_action :set_answer, only: [:update, :destroy]

  def index
    render json: @question.answers
  end

  def create
    answer = @question.answers.new(answer_params)
      if (answer.save)
        render json: answer
      else 
        render json: answer.error, status: 422
    end
  end

  def update
    if @answer.update(answer_parmas)
      render json: @answer
    else
      render json: @answer.errors, status: 422
    end
  end

  def destroy
    answer = @answer.destroy
    render json: "Answer deleted"
  end

  private

  def set_question
    @question = Question.find(params[:question_id])
  end

  def set_answer
    @answer = @question.answers.find(params[:id])
  end

  def answer_params
    params.require(:answer).permit(:body, :question_id)
  end

end
