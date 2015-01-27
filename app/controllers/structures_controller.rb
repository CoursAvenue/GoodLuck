class StructuresController < ApplicationController

  # GET /structures
  # GET /structures.json

  def all
    @structures = Structure.all
    render json: @structures
  end
end
