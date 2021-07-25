import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../navbar/Nav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { getToken } from "../../helpers";
const Update = (props) => {
   const [state, setState] = useState({
      title: "",
      user: "",
   });

   const [content, setContent] = useState("");
   const handleContent = (e) => {
      setContent(e);
   };

   useEffect(() => {
      fetchPost();
   }, []);

   const fetchPost = async () => {
      try {
         const response = await axios.get(`${process.env.REACT_APP_API}/${props.match.params.id}`);
         setState({
            title: response.data.title,
            user: response.data.user,
         });
         setContent(response.data.content);
      } catch (error) {
         console.log(error);
      }
   };

   //    console.log(post);

   const handleSubmit = (e) => {
      e.preventDefault();
      updatePost();
   };

   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setState({ ...state, [name]: value });
   };

   const updatePost = async () => {
      try {
         const res = await axios.put(
            `${process.env.REACT_APP_API}/update/${props.match.params.id}`,
            {
               title: state.title,
               content: content,
               user: state.user,
            },
            { headers: { authorization: `Bearer ${getToken()}` } }
         );

         setState({ ...state, title: res.data.title, content: res.data.content, user: res.data.user });
         alert("data is updated");
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Nav />
         <div className="container">
            <h2 className="mt-1">Update Post</h2>
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                  <input
                     type="text"
                     name="title"
                     value={state.title}
                     className="form-control"
                     onChange={handleChange}
                     required
                  />
               </div>
               <div className="form-group">
                  <ReactQuill
                     type="text"
                     name="content"
                     theme="bubble"
                     value={content}
                     onChange={handleContent}
                     required
                  />
               </div>
               <div className="form-group">
                  <input
                     type="text"
                     name="user"
                     value={state.user}
                     className="form-control"
                     onChange={handleChange}
                     required
                  />
               </div>
               <div className="form-group">
                  <button className="btn btn-primary">Update</button>
               </div>
            </form>
         </div>
      </>
   );
};

export default Update;
