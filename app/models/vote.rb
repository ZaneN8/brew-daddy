class Vote < ApplicationRecord
  belongs_to :review
  belongs_to :user

  validates :user_id, uniqueness: { scope: :review_id,
    message: "Brew Daddy says one vote only"}
end
