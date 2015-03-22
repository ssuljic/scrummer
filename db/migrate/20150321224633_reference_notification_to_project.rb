class ReferenceNotificationToProject < ActiveRecord::Migration
  def change
    add_reference :notifications, :project
  end
end
