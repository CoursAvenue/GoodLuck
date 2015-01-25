class StructuresController < ApplicationController

  # GET /structures
  # GET /structures.json
  def index
    @structures = Structure.all
    @structures.to_json
  end
end
