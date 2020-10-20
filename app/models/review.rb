class Review < ApplicationRecord
  belongs_to :coffee_shop
  belongs_to :user
  has_many :review_pics, dependent: :destroy
  has_many :votes, dependent: :destroy

  scope :filter_by_page, -> (page_param) { page(page_param).per(4) }
end
