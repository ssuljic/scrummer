class CreateRemainingTables < ActiveRecord::Migration
  def up
    create_table :projects do |t|
    	t.string :name
    	t.string :code_name
    	t.text   :description

    	t.timestamps
    end

    create_table :user_projects do |t|
    	t.references :user
    	t.references :project
    	t.references :role

    	t.timestamps
    end

    create_table :user_stories do |t|
    	t.references :project
    	t.references :sprint
    	t.string     :name
    	t.text       :description
    end

    create_table :sprints do |t|
    	t.references :project
    	t.string     :name
    	t.boolean    :active
    	t.date       :start_date
    	t.date       :end_date

    	t.timestamps
    end

    create_table :tickets do |t|
    	t.integer    :seq
    	t.text       :description
    	t.integer    :estimate
    	t.references :type
    	t.references :status
    	t.references :user
    	t.references :user_story_id, null: true
    	t.references :sprint, null: true
    	t.references :project

    	t.timestamps
    end

    create_table :types do |t|
    	t.string    :name
    	t.timestamps
    end

    create_table :statuses do |t|
    	t.string    :name
    	t.timestamps
    end

    create_table :worklogs do |t|
    	t.references :ticket
    	t.integer    :duration

    	t.timestamps
    end

    create_table :comments do |t|
    	t.references :user
    	t.references :ticket
    	t.text       :content

    	t.timestamps
    end

    create_table :notifications do |t|
    	t.text     :content
    	t.text     :url

    	t.timestamps
    end
  end

  def down
  	drop_table :projects
  	drop_table :user_projects
  	drop_table :sprints
  	drop_table :user_stories
  	drop_table :tickets
  	drop_table :types
  	drop_table :statuses
  	drop_table :worklogs
  	drop_table :comments
  	drop_table :notifications
  end
end
