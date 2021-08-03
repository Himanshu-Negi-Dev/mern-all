import { ADD_TODO, GET_TODOS, DELETE_TODO, USER_SIGNOUT } from "./type";
import { db } from "../firebase";

export const add_todo = (mytodos, todo, uid) => {
  return async (dispatch) => {
    try {
      const alltodos = [...mytodos, todo];
      console.log(alltodos);
      await db.collection("todos").doc(uid).set({
        todos: alltodos,
      });

      dispatch({
        type: ADD_TODO,
        payload: alltodos,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const get_todos = (uid) => {
  return async (dispatch) => {
    try {
      const docRef = db.collection("todos").doc(uid);

      await docRef.onSnapshot(
        (docSnapshot) => {
          if (docSnapshot.data()) {
            dispatch({
              type: GET_TODOS,
              payload: docSnapshot.data().todos,
            });
          } else {
            dispatch({
              type: GET_TODOS,
              payload: [],
            });
          }
        },
        (err) => {
          console.log(`Encountered error: ${err}`);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const delete_todo = (uid, dtodo) => {
  return async (dispatch) => {
    try {
      const docRef = db.collection("todos").doc(uid);
      const alltodos = await docRef.get();
      await docRef.update({
        todos: alltodos.data().todos.filter((todo) => todo !== dtodo),
      });
      dispatch({
        type: DELETE_TODO,
        payload: alltodos.data().todos.filter((todo) => todo !== dtodo),
      });
    } catch (error) {
      console.lod(error);
    }
  };
};

export const user_signout = () => {
  return async (dispatch) => {
    dispatch({
      type: USER_SIGNOUT,
    });
  };
};
