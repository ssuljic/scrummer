class AddMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :from_id
      t.integer :to_id
      t.string  :title
      t.text    :content

      t.timestamps
    end
  end
end
