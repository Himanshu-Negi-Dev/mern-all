import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from "./type";
import { auth } from "../firebase";

export const signup_user = (formData) => {
  return async (dispatch) => {
    try {
      const { email, password } = formData;
      await auth.createUserWithEmailAndPassword(email, password);
      dispatch({
        type: SIGNUP_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };
};
