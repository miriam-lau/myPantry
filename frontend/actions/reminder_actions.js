import * as APIUtil from "../util/reminder_api_util";

export const RECEIVE_ALL_REMINDERS = "RECEIVE_ALL_REMINDERS";
export const RECEIVE_REMINDER = "RECEIVE_REMINDER";
export const CREATE_REMINDER = "CREATE_REMINDER";
export const DELETE_REMINDER = "DELETE_REMINDER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

const receiveAllReminders = (reminders) => ({
  type: RECEIVE_ALL_REMINDERS,
  reminders
});

const receiveReminder = (reminder) => ({
  type: RECEIVE_REMINDER,
  reminder
});

const receiveNewReminder = (reminder) => ({
  type: CREATE_REMINDER,
  reminder
});

const receiveDeleteReminder = (reminder) => ({
  type: DELETE_REMINDER,
  reminder
})

const receiveReminderErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const requestAllReminders = () => dispatch => {
  return APIUtil.fetchAllReminders()
    .then(remindersRes =>(dispatch(receiveAllReminders(remindersRes)))
  )
};

export const requestReminder = (id) => dispatch => {
  return APIUtil.fetchReminder(id)
    .then(reminderRes => (dispatch(receiveReminder(reminderRes)))
  )
};

export const createReminder = (reminder) => dispatch => {
  return APIUtil.createReminder(reminder)
    .then(reminderRes => (dispatch(receiveNewReminder(reminderRes))),
    err => (dispatch(receiveReminderErrors(err.responseJSON)))
  )
};

export const deleteReminder = (id) => dispatch => {
  return APIUtil.deleteReminder(id)
    .then(reminderRes => (dispatch(receiveDeleteReminder(reminderRes)))
  )
};
