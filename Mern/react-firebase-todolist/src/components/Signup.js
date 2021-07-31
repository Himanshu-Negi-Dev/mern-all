import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup_user } from "../actions/auth";
import { toast } from "react-toastify";
const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData.email, formData.password);
      // dispatch(signup_user(formData));
      toast.dark("User created!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <article id="form-container">
        <h1 className="text-4xl mt-20 text-center">SignUp</h1>
        <form
          onSubmit={handleSubmit}
          className="block w-4/5 mt-4 mx-auto py-8  text-center bg-purple-500 rounded md:w-2/5"
        >
          <input
            type="text"
            className="w-11/12  mb-4 p-3 rounded"
            placeholder="Email"
            name="email"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            className=" w-11/12 mb-4 p-3 rounded"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit" className="block w-4/5 mx-auto py-2 bg-black text-white rounded">
            SignUp
          </button>
        </form>
      </article>
    </>
  );
};

export default Signup;
