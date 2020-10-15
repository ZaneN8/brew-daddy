class CoffeeShop < ApplicationRecord
  belongs_to :user
  has_many :reviews, dependent: :destroy
  has_many :questions, dependent: :destroy

  def self.ratings(coffee_shop_id)
      select("DISTINCT coffee_shops.id, STRING_AGG(CAST(rating AS VARCHAR),','ORDER by rating DESC) AS ratings, COUNT(*) rating, 
  STRING_AGG(CAST(coffee_rating AS VARCHAR),','ORDER by coffee_rating DESC) AS coffee_ratings, COUNT(*) coffee_rating,
  STRING_AGG(CAST(work_friendly AS VARCHAR),','ORDER by work_friendly DESC) AS work_friendly_ratings, COUNT(*) work_friendly,
  STRING_AGG(CAST(food AS VARCHAR),','ORDER by food DESC) AS food_ratings, COUNT(*) food")
      .joins("INNER JOIN reviews as r ON coffee_shops.id = r.coffee_shop_id")
      .where("coffee_shops.id=" + coffee_shop_id)
      .group("coffee_shops.id")
  end

  def self.ratings_all
    select("DISTINCT coffee_shops.id, STRING_AGG(CAST(rating AS VARCHAR),','ORDER by rating DESC) AS ratings, COUNT(*) rating, 
STRING_AGG(CAST(coffee_rating AS VARCHAR),','ORDER by coffee_rating DESC) AS coffee_ratings, COUNT(*) coffee_rating,
STRING_AGG(CAST(work_friendly AS VARCHAR),','ORDER by work_friendly DESC) AS work_friendly_ratings, COUNT(*) work_friendly,
STRING_AGG(CAST(food AS VARCHAR),','ORDER by food DESC) AS food_ratings, COUNT(*) food")
    .joins("INNER JOIN reviews as r ON coffee_shops.id = r.coffee_shop_id")
    .group("coffee_shops.id")
  end

  # SELECT DISTINCT coffee_shops.id, STRING_AGG(CAST(rating AS VARCHAR),','ORDER by rating DESC) AS ratings, COUNT(*) rating, 
  # STRING_AGG(CAST(coffee_rating AS VARCHAR),','ORDER by coffee_rating DESC) AS coffee_ratings, COUNT(*) coffee_rating,
  # STRING_AGG(CAST(work_friendly AS VARCHAR),','ORDER by work_friendly DESC) AS work_friendly_ratings, COUNT(*) work_friendly,
  # STRING_AGG(CAST(food AS VARCHAR),','ORDER by food DESC) AS food_ratings, COUNT(*) food
  # FROM "coffee_shops"
  # INNER JOIN reviews as r ON coffee_shops.id = r.coffee_shop_id
  # WHERE coffee_shops.id=110
  # GROUP BY coffee_shops.id

  # This will filter and "search" based on query passed from the search bar. 
  scope :filter_by_name, -> (name) { where("name ilike ?", "%" + name + "%")}
  scope :filter_by_city, -> (city) { where("city ilike ?", "%" + city + "%")}
  scope :filter_by_zip, -> (zip) {where zip: zip} 
  scope :filter_by_state, -> (state) { where("state ilike ?", "%" + state + "%")}
  scope :filter_by_page, -> (page_param) { page(page_param).per(15) }
end
