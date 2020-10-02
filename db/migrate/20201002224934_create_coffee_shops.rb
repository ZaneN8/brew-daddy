class CreateCoffeeShops < ActiveRecord::Migration[6.0]
  def change
    create_table :coffee_shops do |t|
      t.string :name
      t.text :description
      t.string :image
      t.string :city
      t.string :state
      t.string :zip
      t.boolean :open
      t.string :contact_info
      t.integer :cost
      t.boolean :delivery
      t.boolean :pickup
      t.boolean :order_online
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
