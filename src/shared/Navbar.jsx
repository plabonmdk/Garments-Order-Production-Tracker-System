import React from "react";
import { Link, NavLink } from "react-router";
import Logo from "../components/logo/Logo";
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

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "hover:text-primary";

  const publicLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          <IoIosHome className="text-lg" /> Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/all-products" className={navLinkClass}>
          <MdCategory className="text-lg" /> All Products
        </NavLink>
      </li>

      <li>
        <NavLink to="/about" className={navLinkClass}>
          <FcAbout className="text-lg" /> About
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact" className={navLinkClass}>
          <MdOutlineContactMail className="text-lg" /> Contact
        </NavLink>
      </li>

      
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56 z-20"
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
        <Link to="/" className="ml-2">
          <Logo />
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{publicLinks}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end hidden lg:flex">
        {!user ? (
          <ul className="menu menu-horizontal gap-2">
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
                  alt="user"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
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
