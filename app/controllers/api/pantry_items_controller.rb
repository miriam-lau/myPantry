class Api::PantryItemsController < ApplicationController
  before_filter :require_signed_in

  def index
    @pantry_items = current_user.pantry_items
    render :index
  end

  def create
    @pantry_item = PantryItem.new(pantry_item_params)
    @pantry_item.user_id = current_user.id
    if @pantry_item.save
      render :show
    else
      render json: @pantry_item.errors.full_messages, status: 422
    end
  end

  def update
    @pantry_item = current_user.pantry_items.find(params[:id])
    if @pantry_item.update_attributes(pantry_item_params)
      render :show
    else
      render json: @pantry_item.errors.full_messages, status: 422
    end
  end

  def destroy
    pantry_item = PantryItem.find(params[:id])
    @pantry_item_id = pantry_item.id
    pantry_item.destroy
    render :delete
  end

  private

  def pantry_item_params
    params.require(:pantry_item).permit(:name, :quantity, :unit,
      :category)
  end
end
