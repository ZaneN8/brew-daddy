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

# CoffeeShop.destroy_all
# User.destroy_all

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

    25.times do |j|
        cs = CoffeeShop.create(
            name: Faker::Coffee.blend_name,
            description: Faker::Coffee.notes, # Faker::Restaurant.description 
            image: Faker::Avatar.image(slug: "#{user.first_name}#{j}", size: "300x300", format: "png", set: "set4"),
            city:Faker::Address.city,
            state: Faker::Address.state,
            zip: Faker::Address.zip,
            contact_info: Faker::PhoneNumber.phone_number,
            cost: 3,
            open: true,
            delivery: true,
            pickup: true,
            order_online: true,
            user_id: i,
        )


    end
    puts "----------------------------"    
    
end

200.times do |r|
    rv = Review.create(
        title: Faker::Quote.robin,
        body: Faker::Restaurant.review,
        rating: rand(1..5),
        coffee_rating: rand(1..5),
        work_friendly: rand(1..5),
        food: rand(1..5),
        noise_level: rand(1..5),
        coffee_shop_id: CoffeeShop.order(Arel.sql('RANDOM()')).first.id,
        user_id: User.order(Arel.sql('RANDOM()')).first.id,
    )
end

puts "Seeding Coffee Shops"
puts 


puts "Seeding Reviews..."


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