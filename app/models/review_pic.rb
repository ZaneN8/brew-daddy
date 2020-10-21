class ReviewPic < ApplicationRecord
  belongs_to :review

  scope :filter_by_page, -> (page_param) { page(page_param).per(6) }
end
