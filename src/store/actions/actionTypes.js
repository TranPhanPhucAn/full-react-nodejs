const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",

  //admin
  // ADMIN_LOGIN_SUCCESS: "ADMIN_LOGIN_SUCCESS",
  // ADMIN_LOGIN_FAIL: "ADMIN_LOGIN_FAIL",
  // PROCESS_LOGOUT: "PROCESS_LOGOUT",
  // CHANGE_LANGUAGE: "CHANGE_LANGUAGE",
  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAILED: "FETCH-POSITION-FAILED",

  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",

  CREATE_USER_SUCCESS: "SAVE_USER_SUCCESS",
  CREATE_USER_FAILED: "SAVE_USER_FAILED",

  DELETE_USER_FAILED: "DELETE_USER_FAILED",
  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",

  FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
});

export default actionTypes;
