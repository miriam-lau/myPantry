import merge from 'lodash/merge';
import { RECEIVE_ALL_REMINDERS, RECEIVE_REMINDER, CREATE_REMINDER,
    DELETE_REMINDER, RECEIVE_ERRORS } from '../actions/reminder_actions';

const ReminderReducer = (state = {}, action) => {
  let newState;
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ALL_REMINDERS:
      newState = merge({}, action.reminders);
      return newState;
    case RECEIVE_REMINDER:
      newState = merge({}, action.reminder);
      return newState;
    case CREATE_REMINDER:
      newState = merge({}, state, {[action.reminder.id]: action.reminder});
      return newState;
    case DELETE_REMINDER:
      newState = merge({}, state);
      delete newState[action.reminder.reminder_id];
      return newState;
    case RECEIVE_ERRORS:
      newState = merge({}, state, action.errors);
      return newState;
    default:
      return state;
  }
};

export default ReminderReducer;
