class StructuresController < ApplicationController
  before_action :set_structure, only: [:show, :edit, :update, :destroy]

  # GET /structures
  # GET /structures.json
  def index
    @structures = Structure.all
  end

end
