import axios from "axios";
import React, { useState, useEffect } from "react";
import Nav from "../navbar/Nav";
import { Link } from "react-router-dom";
import "./post.css";
import { getUser, getToken } from "../../helpers";
import renderHTML from "react-render-html";

const Post = () => {
   const [list, setList] = useState([]);
   useEffect(() => {
      getData();
   }, []);

   const getData = async () => {
      try {
         const response = await axios.get(`${process.env.REACT_APP_API}`);
         setList(response.data);
         console.log(response.data);
         console.log(list);
      } catch (error) {
         console.log(error);
      }
   };

   const deleteItems = async (id) => {
      try {
         await axios.delete(`${process.env.REACT_APP_API}/delete/${id}`, {
            headers: { authorization: `Bearer ${getToken()}` },
         });
         getData();
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <>
         <Nav />
         <div className="container">
            <div className="posts_container">
               <h1 className="p-2">All Post</h1>
               {list.map((post) => {
                  return (
                     <>
                        <div className="row pl-2" style={{ borderBottom: "2px solid grey" }} key={post._id}>
                           <div className="col-md-10 post_container ">
                              <h3>
                                 <Link to={`/${post._id}`}>{post.title}</Link>
                              </h3>
                              <div>{renderHTML(post.content.substring(0, 100))}...</div>
                              <p>
                                 Author: <span className="badge">{post.user}</span> Published on:{" "}
                                 <span className="badge">{new Date(post.createdAt).toLocaleString()}</span>
                              </p>
                           </div>

                           {getUser() && (
                              <div className="col-md-2">
                                 <div className="post_btn">
                                    <button className="btn btn-outline-warning">
                                       <Link to={`/update/${post._id}`}>Update</Link>
                                    </button>
                                    <button
                                       onClick={() => deleteItems(post._id)}
                                       className="btn btn-outline-danger ml-1"
                                    >
                                       Delete
                                    </button>
                                 </div>
                              </div>
                           )}
                        </div>
                     </>
                  );
               })}
            </div>
         </div>
      </>
   );
};

export default Post;
