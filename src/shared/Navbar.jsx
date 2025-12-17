import React from "react";
import Logo from "../components/logo/Logo";
import { Link } from "react-router";
import { IoIosHome } from "react-icons/io";
import {
  MdCategory,
  MdOutlineContactMail,
  MdDashboard,
  MdInventory,
} from "react-icons/md";
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
      {
        user && (
          <li>
            <Link to= 'send-product'>
            Send Product
            </Link>
          </li>
        )
      }

      <li>
        <Link to="/contact">
          <MdOutlineContactMail className="text-xl" /> Contact
        </Link>
      </li>

      {user && (
        <li>
          <Link to="/dashboard/my-products">
            <MdInventory className="text-xl" /> My Products
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          </label>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10"
          >
            {publicLinks}

            {!user ? (
              <>
                <li>
                  <Link to="/login">
                    <LuLogIn /> Login
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <IoPersonAddOutline /> Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard">
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={logOut}>
                    <LuLogOut /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-xl">
          <Logo />
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{publicLinks}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end hidden lg:flex">
        {!user ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login">
                <LuLogIn /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <IoPersonAddOutline /> Register
              </Link>
            </li>
          </ul>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/2ySvqLZ/default-avatar.png"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/dashboard">
                  <MdDashboard /> Dashboard
                </Link>
              </li>
              
              <li>
                <button onClick={logOut}>
                  <LuLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
