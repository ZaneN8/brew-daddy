class CoffeeShop < ApplicationRecord
  belongs_to :user
  has_many :reviews, dependant :destroy
end
