class Review < ApplicationRecord
  belongs_to :coffee_shop
  belongs_to :user
  has_many :votes, dependent: :destroy
end
