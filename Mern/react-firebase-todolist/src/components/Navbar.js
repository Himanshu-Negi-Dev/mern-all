import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/all";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  console.log(toggle);
  return (
    <>
      <nav className="min-w-full bg-white">
        <div id="nav-center" className="md:max-w-6xl md:my-0 md:mx-auto md:flex md:justify-between md:items-center">
          <div id="nav-header" className="flex justify-between items-center p-4">
            <h1 id="nav-brand-logo" className="text-xl font-bold md:text-4xl">
              Todo<span className="text-purple-700">List</span>
            </h1>
            <button id="nav-toggle" className="text-xl md:hidden" onClick={() => setToggle(!toggle)}>
              <GiHamburgerMenu />
            </button>
          </div>

          <ul
            id="nav-links"
            className={` overflow-hidden transition duration-1000 ease-in-out  ${
              toggle ? "h-{128px}" : "h-0"
            } md:h-auto md:flex md:justify-center md:items-center `}
          >
            <li>
              <Link
                to="/"
                className="block px-4 py-1 transition-all hover:pl-6 hover:text-white hover:bg-purple-700  md:hover:bg-transparent md:hover:text-purple-700 md:hover:pl-6 md:text-xl md:px-6"
              >
                Todos
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block px-4 py-1 transition-all hover:pl-6 hover:text-white hover:bg-purple-700 md:hover:bg-transparent md:hover:text-purple-700 md:hover:pl-6 md:text-xl md:px-6"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block px-4 py-1 transition-all hover:pl-6 hover:text-white hover:bg-purple-700  md:hover:bg-transparent md:hover:text-purple-700 md:hover:pl-6 md:text-xl md:px-6"
              >
                Signup
              </Link>
            </li>
            <li>
              <Link className="block px-4 py-1 transition-all hover:pl-6 hover:text-white hover:bg-purple-700  md:hover:bg-transparent md:hover:text-purple-700 md:hover:pl-6 md:text-xl md:px-6">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
