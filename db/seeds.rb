# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "faker"

puts "Seeding Users"


#     t.string "name"
#     t.string "nickname"
#     t.string "image"
#     t.string "email"
#     t.string "first_name"
#     t.string "last_name"

#### UNCOMMIT THIS IF YOU DO NOT WANT USERS DATA TO BE ERASED ###
puts "Cleaning up Users and Coffee Shops Data"

CoffeeShop.destroy_all
User.destroy_all

5.times do |i|    
 user = User.new
 user.id = i
 user.email = "test#{i}@example.com"
 user.password = '123456'
 user.password_confirmation = '123456'
 user.first_name = Faker::Name.first_name
 user.last_name = Faker::Name.last_name
 user.image = Faker::Avatar.image(slug: "#{user.first_name}#{i}", size: "300x300", format: "png", set: "set1")
 user.save!
 puts user.email + " created"

 puts "Seeding Coffee for User #{i}"

 3.times do |j|
    cs = CoffeeShop.new
    cs.id = j + (i * 3)
    cs.name = Faker::Coffee.blend_name
    cs.description = Faker::Coffee.notes
    cs.image = Faker::Avatar.image(slug: "#{user.first_name}#{j}", size: "300x300", format: "png", set: "set4")
    cs.city = Faker::Address.city
    cs.state = Faker::Address.state
    cs.zip = Faker::Address.zip
    cs.open = true
    cs.contact_info = Faker::PhoneNumber.phone_number
    cs.cost = 3
    cs.delivery = true
    cs.pickup = true
    cs.order_online = true
    cs.user_id = i
    cs.save!
    end
puts "----------------------------"    

end

puts "Seeding Coffee Shops"
# create_table "coffee_shops", force: :cascade do |t|
#     t.string "name"
#     t.text "description"
#     t.string "image"
#     t.string "city"
#     t.string "state"
#     t.string "zip"
#     t.boolean "open"
#     t.string "contact_info"
#     t.integer "cost"
#     t.boolean "delivery"
#     t.boolean "pickup"
#     t.boolean "order_online"
#     t.bigint "user_id", null: false
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#     t.index ["user_id"], name: "index_coffee_shops_on_user_id"
#   end

puts 


puts "Seeding Reviews..."

20.times do |r|
    max = 5
    review = Review.new
    review.title = Faker::Quote.robin
    review.body = Faker::Restaurant.review 
    review.rating = rand(max)
    review.coffee_rating = rand(max)
    review.work_friendly = rand(max)
    review.food = rand(max)
    review.noise_level = rand(max)
    review.coffee_shop_id = rand(CoffeeShop.count)
    review.user_id = rand(User.count)
    review.save!

end

puts "#{Review.count} Reviews has been seeded randomly."
puts "----------------------------"    

#   create_table "reviews", force: :cascade do |t|
#     t.string "title"
#     t.text "body"
#     t.float "rating"
#     t.float "coffee_rating"
#     t.float "work_friendly"
#     t.float "food"
#     t.float "noise_level"
#     t.bigint "coffee_shop_id", null: false
#     t.bigint "user_id", null: false
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#     t.index ["coffee_shop_id"], name: "index_reviews_on_coffee_shop_id"
#     t.index ["user_id"], name: "index_reviews_on_user_id"
#   end


#   create_table "review_pics", force: :cascade do |t|
#     t.string "image"
#     t.bigint "reviews_id", null: false
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
#     t.index ["reviews_id"], name: "index_review_pics_on_reviews_id"
#   end

puts "Seeds Successful!"