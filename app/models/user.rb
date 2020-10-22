# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  has_many :reviews, dependent: :destroy
  has_many :coffee_shops, dependent: :nullify
  has_many :votes, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

   def stats
    Review.find_by_sql(["
      SELECT 
      AVG(rv.rating) as total_rating, 
      COUNT(*) AS total_count
      FROM reviews AS rv
      WHERE rv.user_id = ?
    ", id]).first
  end
end
