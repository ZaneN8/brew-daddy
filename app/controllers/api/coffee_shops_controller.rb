class Api::CoffeeShopsController < ApplicationController

  def index json: CoffeeShop.all
  end
end
