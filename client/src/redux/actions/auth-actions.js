import { ActionTypes } from "../constants/auth-action-types";

export const setLogin = (user) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: user,
  };
};

export const setSignup = (user) => {
  return {
    type: ActionTypes.SIGNUP_SUCCESS,
    payload: user,
  };
};

export const signupFail = () => {
  return {
    type: ActionTypes.SIGNUP_FAIL,
  };
};

export const loginFail = () => {
  return {
    type: ActionTypes.LOGIN_FAIL,
  };
};

export const logout = () => {
  return {
    type: ActionTypes.LOGOUT,
  };
};
