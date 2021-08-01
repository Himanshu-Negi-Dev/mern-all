import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login_user } from "../actions/auth";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);

  if (user !== null) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login_user(formData));
      toast.dark("welcome to todolist");
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Invaid Credentials");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <article id="form-container">
        <h1 className="text-4xl mt-20 text-center">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="block w-4/5 mt-4 mx-auto py-8  text-center bg-purple-500 rounded md:w-2/5"
        >
          <input
            type="text"
            className="w-11/12  mb-4 p-3 rounded"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            className=" w-11/12 mb-4 p-3 rounded "
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="block w-4/5 mx-auto py-2 bg-black text-white rounded">
            Login
          </button>
        </form>
      </article>
    </>
  );
};

export default Login;
