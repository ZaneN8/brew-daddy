class Answer < ApplicationRecord
  belongs_to :question

  scope :filter_by_page, -> (page_param) { page(page_param).per(1) }
end
