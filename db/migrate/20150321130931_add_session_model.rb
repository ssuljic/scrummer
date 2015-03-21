class AddSessionModel < ActiveRecord::Migration
  def up
    create_table :sessions do |t|
      t.references :user
      t.string     :key
    end
    remove_column :users, :session_key
  end

  def down
    drop_table :sessions
    add_column :users, :session_key, :string
  end
end
