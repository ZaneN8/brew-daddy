class CoffeeShop < ApplicationRecord
  belongs_to :user
  has_many :reviews, dependent: :destroy

  # This will filter and "search" based on query passed from the search bar. 
  scope :filter_by_name, -> (name) { where("name ilike ?", "%" + name + "%")}
  scope :filter_by_city, -> (city) { where("city ilike ?", "%" + city + "%")}
  scope :filter_by_zip, -> (zip) {where zip: zip} 
  scope :filter_by_state, -> (state) { where("state ilike ?", "%" + state + "%")}
  scope :filter_by_page, -> (page_param) { page(page_param).per(15) }
end
