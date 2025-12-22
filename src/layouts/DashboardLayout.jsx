import React from "react";
import { NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaUsers,
  FaBox,
  FaClipboardList,
  FaPlus,
  FaTasks,
  FaUser,
  FaBars,
} from "react-icons/fa";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

  const navClass = ({ isActive }) =>
    isActive
      ? "bg-primary text-white font-medium"
      : "hover:bg-base-300";

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="navbar bg-base-300 shadow-sm">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            <FaBars />
          </label>
          <h2 className="text-lg font-semibold px-4">
            Premium Garments Dashboard
          </h2>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-200 min-h-full">
          <div className="p-4 text-xl font-bold border-b">Dashboard</div>

          <ul className="menu p-4 gap-1">
            {/* Common */}
            <li>
              <NavLink to="/" className={navClass}>
                <FaHome /> Home
              </NavLink>
            </li>

            {/* ================= ADMIN ================= */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink to="/dashboard/manage-users" className={navClass}>
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/all-products" className={navClass}>
                    <FaBox /> All Products
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/all-orders" className={navClass}>
                    <FaClipboardList /> All Orders
                  </NavLink>
                </li>
              </>
            )}

            {/* ================= MANAGER ================= */}
            {role === "manager" && (
              <>
                <li>
                  <NavLink to="/dashboard/add-product" className={navClass}>
                    <FaPlus /> Add Product
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/manage-products" className={navClass}>
                    <FaBox /> Manage Products
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/pending-orders" className={navClass}>
                    <FaTasks /> Pending Orders
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/approved-orders" className={navClass}>
                    <FaClipboardList /> Approved Orders
                  </NavLink>
                </li>
              </>
            )}

            {/* ================= BUYER ================= */}
            {role === "buyer" && (
              <>
                <li>
                  <NavLink to="/dashboard/my-orders" className={navClass}>
                    <FaClipboardList /> My Orders
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/profile" className={navClass}>
                    <FaUser /> My Profile
                  </NavLink>
                </li>
              </>
            )}

            {/* Profile (Common) */}
            <li className="mt-4 border-t pt-2">
              <NavLink to="/dashboard/profile" className={navClass}>
                <FaUser /> Profile
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
