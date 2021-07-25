import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Nav from "../navbar/Nav";
import { authenticate, getUser } from "../../helpers";
const Login = (props) => {
   const [state, setState] = useState({
      name: "",
      password: "",
   });

   useEffect(() => {
      getUser() && props.history.push("/");
   }, []);
   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setState({ ...state, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      checkLogin();
   };

   const checkLogin = async () => {
      try {
         const res = await axios.post(`${process.env.REACT_APP_API}/login`, {
            name: state.name,
            password: state.password,
         });
         console.log(res);
         console.log(props);
         authenticate(res, () => {
            props.history.push("/create");
         });
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Nav />
         <div className="container mt-2">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <input
                     type="text"
                     name="name"
                     className="form-control"
                     placeholder="Enter Name"
                     value={state.name}
                     onChange={handleChange}
                  />
               </div>
               <div className="form-group">
                  <input
                     type="text"
                     name="password"
                     className="form-control"
                     placeholder="Enter Password"
                     value={state.password}
                     onChange={handleChange}
                  />
               </div>
               <div className="form-group">
                  <button className="btn btn-primary">Login</button>
               </div>
            </form>
         </div>
      </>
   );
};

export default withRouter(Login);
