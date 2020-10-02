class CreateReviewPics < ActiveRecord::Migration[6.0]
  def change
    create_table :review_pics do |t|
      t.string :image
      t.review :belongs_to

      t.timestamps
    end
  end
end
