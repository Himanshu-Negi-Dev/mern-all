import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "../navbar/Nav";
import renderHTML from "react-render-html";
const SinglePost = (props) => {
   const [post, setPost] = useState("");
   useEffect(() => {
      fetchSingle();
   }, []);
   const fetchSingle = async () => {
      try {
         const response = await axios.get(`http://localhost:8000/api/${props.match.params.id}`);
         setPost(response.data);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <Nav />

         <div className="container">
            <div className="single_post pt-5">
               <h1>{post.title}</h1>
               <div className="lead pt-3">{renderHTML(post && post.content)}</div>
            </div>
         </div>
      </>
   );
};

export default SinglePost;
