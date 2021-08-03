import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { todoReducer } from "./todos";

export default combineReducers({
  authReducer,
  todoReducer,
});
