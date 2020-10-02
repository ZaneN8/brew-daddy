class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :body
      t.float :rating
      t.float :coffee_rating
      t.float :work_friendly
      t.float :food
      t.float :noise_level
      t.belongs_to :coffee_shop, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
