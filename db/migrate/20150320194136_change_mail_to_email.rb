class ChangeMailToEmail < ActiveRecord::Migration
  def up
    rename_column :users, :mail, :email
  end

  def down
    rename_column :users, :email, :mail
  end
end
