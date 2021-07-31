import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from "../actions/type";

const initialState = {
  user: null,
  loading: true,
};

export const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
