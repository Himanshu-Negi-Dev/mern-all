import { ADD_TODO, GET_TODOS, DELETE_TODO, USER_SIGNOUT } from "../actions/type";

const initialState = {
  loading: true,
  todos: [],
};

export const todoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: payload,
        loading: false,
      };

    case GET_TODOS:
      return {
        ...state,
        todos: payload,
        loading: false,
      };

    case DELETE_TODO:
      return {
        ...state,
        todos: payload,
        loading: false,
      };

    case USER_SIGNOUT:
      return {
        ...state,
        todos: [],
        loading: false,
      };
    default:
      return state;
  }
};
