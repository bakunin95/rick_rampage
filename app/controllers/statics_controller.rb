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
	@high_scores = Score.order('points DESC').limit(5).all

	# last score of the current player assigned to the @score variable
	#@score = Score.where(:user_id => current_user.id).first

	# best rank
	@scores_from_top = Score.order('points DESC, created_at DESC').all

	# worst rank
	@scores_from_bottom = Score.order('points ASC, created_at DESC').all

	@scores_length = @scores_from_bottom.length;

	#current_user.nil? ? Score.none : current_user.scores.last
	
	current_user.nil? ? Score.none : @my_latest_score = Score.where(:user_id => current_user.id).order('created_at DESC').first

	current_user.nil? ? Score.none : @my_avg_score = Score.where(:user_id => current_user.id).order('created_at DESC').average('points').to_i

	# last rank of the current player assigned to the @rank variable

	#@rank = Score.order('points DESC').first.points.inspect
	#@rank = Score.where(:user_id => current_user.id)

  end
end
