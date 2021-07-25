import React, { useState } from "react";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";
import "./nav.css";
import { getUser, logout } from "../../helpers";
const Nav = ({ history }) => {
   const [toggle, setToggle] = useState(false);
   return (
      <>
         <div className="container">
            <div className="nav_container">
               <div className="nav_icons">
                  <div className="nav_icons_logo">
                     <h2>SMA</h2>
                  </div>
                  <div className="nav_icons_toggle" onClick={() => setToggle(!toggle)}>
                     {toggle ? <FaTimes /> : <FaBars />}
                  </div>
               </div>
               <div className={`nav_links ${toggle ? "show_links" : ""}`}>
                  <ul>
                     <li>
                        <Link to="/">Home</Link>
                     </li>
                     <li>
                        <Link to="/create">Create</Link>
                     </li>
                  </ul>
               </div>

               {!getUser() && (
                  <div className={`nav_buttons ${toggle ? "show_buttons" : ""}`}>
                     <button>
                        <Link to="/login">Login</Link>
                     </button>
                  </div>
               )}

               {getUser() && (
                  <div className={`nav_buttons ${toggle ? "show_buttons" : ""}`}>
                     <button onClick={() => logout(() => history.push("/"))}>logout</button>
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default withRouter(Nav);
