import React, { useState, useEffect } from "react";
import Nav from "../navbar/Nav";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { getUser, getToken } from "../../helpers";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
const Create = (props) => {
   // useEffect(() => {
   //    !getUser() && props.history.push("/login");
   // }, []);

   const [state, setState] = useState({
      title: "",
      user: getUser(),
   });

   const [content, setContent] = useState("");

   const handleContent = (e) => {
      setContent(e);
   };

   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setState({ ...state, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      insertData();
   };

   const insertData = async () => {
      try {
         const res = await axios.post(
            `${process.env.REACT_APP_API}/create`,
            {
               title: state.title,
               content: content,
               user: state.user,
            },
            { headers: { authorization: `Bearer ${getToken()}` } }
         );
         setState({
            title: "",
            user: "",
         });

         setContent("");
         props.history.push("/");
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Nav />
         <div className="container">
            <div className="form_container">
               <h2>Create Post</h2>
               <form method="post" onSubmit={handleSubmit}>
                  <div className="form-group">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Title"
                        name="title"
                        value={state.title}
                        onChange={handleChange}
                        required
                     />
                  </div>
                  <div className="form-group">
                     <ReactQuill
                        type="text"
                        // className="form-control"
                        theme="bubble"
                        placeholder="Write Something..."
                        name="content"
                        style={{ border: "1px solid #666" }}
                        value={content}
                        onChange={handleContent}
                        required
                     />
                  </div>
                  <div className="form-group">
                     <input
                        type="text"
                        className="form-control"
                        placeholder="Enter User"
                        name="user"
                        value={state.user}
                        onChange={handleChange}
                        requireds
                     />
                  </div>

                  <div className="form-group">
                     <button className="btn btn-primary">Create</button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
};

export default withRouter(Create);
