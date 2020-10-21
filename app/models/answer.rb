class Answer < ApplicationRecord
  belongs_to :question

  scope :filter_by_limit, -> (limit_param) { limit(limit_param) }
  scope :filter_by_offset, -> (offset_param) { offset(offset_param) }
end
