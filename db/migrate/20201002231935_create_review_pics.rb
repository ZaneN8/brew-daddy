class CreateReviewPics < ActiveRecord::Migration[6.0]
  def change
    create_table :review_pics do |t|
      t.string :image
      t.belongs_to :reviews, null: false, foreign_key: true

      t.timestamps
    end
  end
end
