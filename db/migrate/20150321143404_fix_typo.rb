class FixTypo < ActiveRecord::Migration
  def up
    rename_column :tickets, :user_story_id_id, :user_story_id
  end

  def down
    rename_column :tickets, :user_story_id, :user_story_id_id
  end
end
