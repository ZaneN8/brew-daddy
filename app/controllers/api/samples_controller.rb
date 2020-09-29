class Api::SamplesController < ApplicationController
  def index
    render json: Sample.all
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end
end
