class Question < ApplicationRecord
  belongs_to :coffee_shop
  has_many :answers, dependent: :destroy
end
