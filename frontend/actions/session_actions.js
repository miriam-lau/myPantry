import * as APIUtil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

// format of object being passed in {user}
export const signup = (user) => dispatch => (
  APIUtil.signup(user).then(user =>(dispatch(receiveCurrentUser(user))),
    err => (dispatch(receiveErrors(err.responseJSON)))
  )
);

// format of object being passed in {user}
export const signin = (user) => dispatch => (
  APIUtil.signin(user).then(user =>(dispatch(receiveCurrentUser(user))))
    .fail(err => (dispatch(receiveErrors(err.responseJSON))))
);

export const signout = () => dispatch => (
  APIUtil.signout().then(user => (dispatch(receiveCurrentUser(null)))
  )
);

export const clearErrors = () => dispatch => (
  dispatch({ type: CLEAR_ERRORS })
);
