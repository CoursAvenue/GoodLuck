class CreateStructures < ActiveRecord::Migration
  def change
    create_table :structures do |t|
      t.string  :name
      t.text    :description
      t.text    :street
      t.string  :zip_code
      t.string  :city
      t.string  :subject
      t.string  :image_url

      t.timestamps null: false
    end
  end
end
