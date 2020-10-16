class CoffeeShop < ApplicationRecord
  belongs_to :user
  has_many :reviews, dependent: :destroy
  has_many :questions, dependent: :destroy

  # This is the "esay way" method 
  # Note: only work with postgresql, please refer to document of respective SQL to find "AVG"

  # Challenge for Jon, rewrite this like the one in hard way.
  def average_stats
    Review.find_by_sql(["
      SELECT 
        AVG(rv.rating) as total_rating,
        AVG(rv.coffee_rating) as total_coffee,
        AVG(rv.food) as total_food,
        AVG(rv.noise_level) as total_noise_level,
        AVG(rv.work_friendly) as total_work_friendly
      FROM reviews AS rv
      WHERE rv.coffee_shop_id = ?
    ", id]).first
  end


#   This is the "hard way" method, "James" way. We will not use it but you can run "rating" on rails
# to get idea and compare to the easier way. 
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



  # This will filter and "search" based on query passed from the search bar. 
  scope :filter_by_page, -> (page_param) { page(page_param).per(15) }
  scope :filter_by_name, -> (name) { where("name ilike ?", "%" + name + "%")}
  scope :filter_by_city, -> (city) { where("city ilike ?", "%" + city + "%")}
  scope :filter_by_zip, -> (zip) {where zip: zip} 
  scope :filter_by_state, -> (state) { where("state ilike ?", "%" + state + "%")}

end
