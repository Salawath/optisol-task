import { ActionTypes } from "../constants/auth-action-types";

const user = localStorage.getItem("token");

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };

    case ActionTypes.SIGNUP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };

    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
};
