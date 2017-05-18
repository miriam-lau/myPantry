import merge from 'lodash/merge';
import { RECEIVE_ALL_PANTRY_ITEMS, RECEIVE_SINGLE_PANTRY_ITEM,
  RECEIVE_NEW_PANTRY_ITEM, RECEIVE_ERRORS } from '../actions/pantry_item_actions';

const PantryItemsReducer = (state = {}, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_ALL_PANTRY_ITEMS:
      return action.pantry_items;
    case RECEIVE_SINGLE_PANTRY_ITEM:
      return action.pantry_item;
    case RECEIVE_NEW_PANTRY_ITEM:
      return merge({}, state, action.pantry_item);
    case UPDATE_PANTRY_ITEM:
      return merge({}, state, action.pantry_item);
    case REMOVE_PANTRY_ITEM:
      // return filter out item
    case RECEIVE_ERRORS:
      return merge({}, action.errors);
    default:
      return state;
  }
};

export default PantryItemsReducer;
