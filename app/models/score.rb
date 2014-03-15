class Score < ActiveRecord::Base
  validates :username, format: {with: /\A\w*\z/i, on: :create}, length: { maximum: 10 }
  validates :points, presence: true, numericality: true
end
