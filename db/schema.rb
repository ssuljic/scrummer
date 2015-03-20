# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150315214031) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "user_id"
    t.integer  "ticket_id"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "notifications", force: true do |t|
    t.text     "content"
    t.text     "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "privileges", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "projects", force: true do |t|
    t.string   "name"
    t.string   "code_name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "role_privileges", force: true do |t|
    t.integer  "role_id"
    t.integer  "privilege_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sprints", force: true do |t|
    t.integer  "project_id"
    t.string   "name"
    t.boolean  "active"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "statuses", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tickets", force: true do |t|
    t.integer  "seq"
    t.text     "description"
    t.integer  "estimate"
    t.integer  "type_id"
    t.integer  "status_id"
    t.integer  "user_id"
    t.integer  "user_story_id_id"
    t.integer  "sprint_id"
    t.integer  "project_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "types", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_projects", force: true do |t|
    t.integer  "user_id"
    t.integer  "project_id"
    t.integer  "role_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_stories", force: true do |t|
    t.integer "project_id"
    t.integer "sprint_id"
    t.string  "name"
    t.text    "description"
  end

  create_table "users", force: true do |t|
    t.string   "firstname"
    t.string   "lastname"
    t.string   "mail"
    t.string   "username"
    t.string   "password_digest"
    t.string   "session_key"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "worklogs", force: true do |t|
    t.integer  "ticket_id"
    t.integer  "duration"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end