class ReviewPic < ApplicationRecord
  belongs_to :review, dependent: :destroy
end
