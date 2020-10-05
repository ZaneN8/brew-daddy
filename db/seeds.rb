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
puts "Cleaning up Users Data"

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




puts "Seeding Reviews... (and Pictures)"

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