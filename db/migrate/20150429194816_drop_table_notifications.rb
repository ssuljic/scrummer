class DropTableNotifications < ActiveRecord::Migration
  def change
    drop_table :notifications
  end
end
