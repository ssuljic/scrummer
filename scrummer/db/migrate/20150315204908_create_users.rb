class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :mail
      t.string :username
      t.string :password_digest
      t.string :session_key

      t.timestamps
    end
  end
end
