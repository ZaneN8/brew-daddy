class CreateVotes < ActiveRecord::Migration[6.0]
  def change
    create_table :votes do |t|
      t.boolean :up_vote
      t.review :belongs_to
      t.user :belongs_to

      t.timestamps
    end
  end
end
