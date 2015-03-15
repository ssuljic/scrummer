class CreatePrivileges < ActiveRecord::Migration
  def change
    create_table :privileges do |t|
      t.string :name

      t.timestamps
    end

    create_table :role_privileges do |t|
      t.belongs_to :role
      t.belongs_to :privilege

      t.timestamps
    end
  end

  
end
