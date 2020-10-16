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

  
end
