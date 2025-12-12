import React from "react";
import Logo from "../components/logo/Logo";
import { Link } from "react-router";
import { IoIosHome } from "react-icons/io";
import { MdCategory, MdOutlineContactMail } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { LuLogIn } from "react-icons/lu";
import { IoPersonAddOutline } from "react-icons/io5";

const Navbar = () => {
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
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      
      {/* Left */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {publicLinks}
          </ul>
        </div>

        <span><Link to='/' className="text-xl"><Logo></Logo></Link></span>
      </div>

      {/* Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {publicLinks}
        </ul>
      </div>

      <div className="navbar-end"></div>
    </div>
  );
};

export default Navbar;
