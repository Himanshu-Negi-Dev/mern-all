import React from "react";
import { FaTrash } from "react-icons/all";
const Todos = () => {
  const todos = ["Eat", "Sleep", "Code"];
  return (
    <>
      <article>
        <h1 className="text-3xl text-center mt-14">All Todos</h1>
        <div id="todo-form-container" className="w-4/5 mt-4 mx-auto md:w-2/5">
          <form action="" className="flex justify-center items-center gap-2 py-6 bg-purple-500">
            <input type="text" placeholder="Enter Todo" className="w-9/12 p-3 rounded" />
            <button type="submit" className="bg-black text-white py-3 px-4 rounded">
              Add
            </button>
          </form>
        </div>

        <div id="todos-container">
          {todos.map((todo) => {
            return (
              <>
                <div
                  id="todo-container"
                  className="w-4/5 mt-4 mx-auto flex justify-between items-center px-4 py-1 border-b border-gray-600 md:w-2/5"
                >
                  <p>{todo}</p>
                  <FaTrash />
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
