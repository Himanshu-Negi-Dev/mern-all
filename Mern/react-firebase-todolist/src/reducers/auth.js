import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, LOAD_USER } from "../actions/type";

const initialState = {
  user: null,
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER:
      return {
        ...state,
        user: payload,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        loading: false,
      };

    default:
      return state;
  }
};
