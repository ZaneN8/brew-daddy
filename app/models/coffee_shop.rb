class CoffeeShop < ApplicationRecord
  belongs_to :user
  has_many :reviews, dependent: :destroy

  # This will filter and "search" based on query passed from the search bar. 
  scope :filter_by_name, -> (name) { where("name ilike ?", "%" + name + "%")}
end
