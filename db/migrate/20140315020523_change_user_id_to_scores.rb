class ChangeUserIdToScores < ActiveRecord::Migration
  def change
    rename_column :scores, :user_id, :username
    change_column :scores, :username, :string
  end
end
