class Question < ApplicationRecord
  belongs_to :coffee_shop
  has_many :answers, dependent: :destroy

  scope :filter_by_body, -> (body) { where("body ilike ?", "%" + body + "%")}
  scope :filter_by_page, -> (page_param) { page(page_param).per(3) }
end
