class Review < ApplicationRecord
  belongs_to :coffee_shop
  belongs_to :user
  has_many :review_pics, dependent: :destroy
  has_many :votes, dependent: :destroy
end
