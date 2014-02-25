json.array!(@scores) do |score|
  json.extract! score, :id, :points, :user_id
  json.url score_url(score, format: :json)
end
