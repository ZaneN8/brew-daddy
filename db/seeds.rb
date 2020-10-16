
require "faker"

puts "Let the Seeding begin"


5.times do |i|

    user = User.create(
        first_name: Faker::Name.first_name,
        last_name: Faker::Name.last_name,
        email: "test#{i}@example.com",
        password: "123456",
        image: Faker::Avatar.image(slug: "user #{i}", size: "300x300", format: "png", set: "set1")
    )

    puts user.email + " created"

    puts "Seeding..."

    10.times do |j|
        cs = CoffeeShop.create(
            name: Faker::Coffee.blend_name,
            description: Faker::Restaurant.description, # Faker::Coffee.notes
            image: Faker::Avatar.image(slug: "Coffee Shop #{j}", size: "300x300", format: "png", set: "set4"),
            address: Faker::Address.street_address,
            city:Faker::Address.city,
            state: Faker::Address.state,
            zip: Faker::Address.zip,
            contact_info: Faker::PhoneNumber.phone_number,
            cost: 3,
            open: true,
            delivery: true,
            pickup: true,
            order_online: true,
            user_id: user.id,
        )
        
        3.times do |q|
            question = Question.create(
                body: Faker::TvShows::RickAndMorty.quote,
                coffee_shop_id: cs.id,
                )
                
                3.times do |a|
                    answer = Answer.create(
                        body:Faker::TvShows::SouthPark.quote,
                        question_id: question.id,
                        )
                end  
                    
        end
    end
end

puts "wait were almost done"

100.times do |r|
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

puts "Seeds Successful"