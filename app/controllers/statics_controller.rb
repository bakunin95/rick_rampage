class StaticsController < ApplicationController
  def aboutus
  end

  # interfaces with view /statics/game.html.erb 
  def game

	# console - list databases: psql -l
	# console - access database: psql rick_rampage_development
	# database - list tables: \d 
	# database - display table: select * from <table_name>;

  	# all high scores assigned to @scores variable
	@scores = Score.order('points DESC').limit(5).all

	# last score of the current player assigned to the @score variable
	@score = Score.where(:user_id => current_user.id).first

	# last rank of the current player assigned to the @rank variable

	#@rank = Score.order('points DESC').first.points.inspect
	#@rank = Score.where(:user_id => current_user.id)

  end
end
