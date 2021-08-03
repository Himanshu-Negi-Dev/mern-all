import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { add_todo, get_todos, delete_todo } from "../actions/todos";
const Todos = ({ history }) => {
  const [todo, setTodo] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const mytodos = useSelector((state) => state.todoReducer.todos);

  useEffect(() => {
    if (user) {
      dispatch(get_todos(user.uid));
    } else {
      history.push("/login");
    }

  }, [user, history, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(add_todo(mytodos, todo, user.uid));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <article>
        <h1 className="text-3xl text-center mt-14">All Todos</h1>
        <div id="todo-form-container" className="w-4/5 mt-4 mx-auto md:w-2/5">
          <form onSubmit={handleSubmit} className="flex justify-center items-center gap-2 py-6 bg-purple-500">
            <input
              type="text"
              placeholder="Enter Todo"
              className="w-9/12 p-3 rounded"
              name="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="bg-black text-white py-3 px-4 rounded">
              Add
            </button>
          </form>
        </div>

        <div id="todos-container">
          {mytodos.map((todo) => {
            return (
              <>
                <div
                  id="todo-container"
                  className="w-4/5 mt-4 mx-auto flex justify-between items-center px-4 py-1 border-b border-gray-600 md:w-2/5"
                >
                  <p>{todo}</p>
                  <FaTrash onClick={() => dispatch(delete_todo(user.uid, todo))} />
                </div>
              </>
            );
          })}
        </div>
      </article>
    </>
  );
};

export default Todos;
