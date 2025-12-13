import React from "react";
import Logo from "../components/logo/Logo";
import { Link } from "react-router";
import { IoIosHome } from "react-icons/io";
import { MdCategory, MdOutlineContactMail } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { IoPersonAddOutline } from "react-icons/io5";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const publicLinks = (
    <>
      <li>
        <Link to="/">
          <IoIosHome className="text-xl" /> Home
        </Link>
      </li>

      <li>
        <Link to="/all-products">
          <MdCategory className="text-xl" /> All Products
        </Link>
      </li>

      <li>
        <Link to="/about">
          <FcAbout className="text-xl" /> About Us
        </Link>
      </li>

      <li>
        <Link to="/contact">
          <MdOutlineContactMail className="text-xl" /> Contact
        </Link>
      </li>

      <li>
        <Link to="/coverage">
          <MdOutlineContactMail className="text-xl" /> Coverage
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">

      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {publicLinks}

            {/* Mobile auth buttons */}
            {!user ? (
              <>
                <li>
                  <Link to="/login">
                    <LuLogIn className="text-xl" /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <IoPersonAddOutline className="text-xl" /> Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button onClick={logOut}>
                  <LuLogOut className="text-xl" /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        <Link to="/" className="text-xl">
          <Logo />
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {publicLinks}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {!user ? (
            <>
              <li>
                <Link to="/login">
                  <LuLogIn className="text-xl" /> Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <IoPersonAddOutline className="text-xl" /> Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={logOut} className="btn btn-ghost">
                <LuLogOut className="text-xl" /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
