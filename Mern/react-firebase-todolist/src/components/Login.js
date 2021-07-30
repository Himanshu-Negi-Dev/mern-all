import React from "react";

const Login = () => {
  return (
    <>
      <article id="form-container">
        <h1 className='text-4xl mt-20 text-center'>Login</h1>
        <form action="" className="block w-4/5 mt-4 mx-auto py-8  text-center bg-purple-500 rounded md:w-2/5">
          <input type="text" className="w-11/12  mb-4 p-3 rounded" placeholder="Email" />
          <br />
          <input type="password" className=" w-11/12 mb-4 p-3 rounded " placeholder="Password" />

          <button type="submit" className="block w-4/5 mx-auto py-2 bg-black text-white rounded">
            Login
          </button>
        </form>
      </article>
    </>
  );
};

export default Login;
