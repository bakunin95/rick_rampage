# rails g migration AddScoreData
# rake db:migrate

require 'fileutils'
require 'csv'

class AddScoreData < ActiveRecord::Migration
  def up

		filepath = Rails.root.join("scores.csv")		

		if File.exist?(filepath)
			CSV.foreach(filepath)do |col|
				Score.create(:points => col[0], :user_id => col[1])
			end
		else 
			raise "No file exists with name: #{filename_new}"
		end
  end

  def down
  	Score.all.destroy # only with team permission
  end
end