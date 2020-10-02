class Vote < ApplicationRecord
  belongs_to :review
  belongs_to :user
end
