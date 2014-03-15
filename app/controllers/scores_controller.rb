class ScoresController < ApplicationController
  before_action :retrieve_top5, only: [:create, :top5]

  respond_to :json

  def create
    @score = Score.new(score_params)

    min_score = @scores.any? ? @scores.min.points : 0
    return if @score.points <= min_score

    if @score.save
      render json: @score, status: :created, location: @score
    else
      render json: @score.errors, status: :unprocessable_entity
    end
  end

  def top5
    render json: @scores
  end

  private
    def score_params
      params.require(:score).permit(:points, :username)
    end

    def retrieve_top5
      @scores = Score.order(points: :desc).limit(5)
    end
end
