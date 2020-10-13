class CoffeeShop < ApplicationRecord
  belongs_to :user
  has_many :reviews, dependent: :destroy

  # This will filter and "search" based on query passed from the search bar. 
  scope :filter_by_name, -> (name) { where("name ilike ?", "%" + name + "%")}
  scope :filter_by_city, -> (city) { where("city ilike ?", "%" + city + "%")}
  scope :filter_by_zip, -> (zip) {where zip: zip} 
  #Need to ask Nick if zip is a interger or a string? What if its 84096-1234? ^
  scope :filter_by_state, -> (state) { where("state ilike ?", "%" + state + "%")}
end
