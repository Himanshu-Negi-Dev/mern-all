import { SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_USER, LOAD_USER } from "./type";
import { auth } from "../firebase";
import { user_signout } from "./todos";

export const load_user = () => {
  return async (dispatch) => {
    try {
      await auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch({
            type: LOAD_USER,
            payload: user,
          });
        } else {
          console.log("signout success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

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

export const login_user = (formData) => {
  return async (dispatch) => {
    try {
      const { email, password } = formData;
      await auth.signInWithEmailAndPassword(email, password);
      dispatch({
        type: LOGIN_SUCCESS,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };
};

export const logout_user = () => {
  return async (dispatch) => {
    try {
      await auth.signOut();
      dispatch({
        type: LOGOUT_USER,
      });

      dispatch(user_signout());
    } catch (error) {
      console.log(error);
    }
  };
};
