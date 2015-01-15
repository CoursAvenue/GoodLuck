class StructuresController < ApplicationController

  # GET /structures
  # GET /structures.json
  def index
    @structures = Structure.all
  end

end
