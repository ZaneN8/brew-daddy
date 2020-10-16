class Api::VotesController < ApplicationController

  def create
  end

  private

  def vote_params
    params.require(:vote).permit(:user_id, :review_id)
  end
end
