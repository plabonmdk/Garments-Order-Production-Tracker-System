import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  FaHome,
  FaBoxOpen,
  FaCog,
  FaBars,
  FaMotorcycle
} from "react-icons/fa";
import { AiOutlineHistory } from "react-icons/ai";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar bg-base-300 shadow-sm">
          <label htmlFor="my-drawer-4" className="btn btn-ghost lg:hidden">
            <FaBars size={18} />
          </label>
          <h2 className="text-lg font-semibold px-4">
            Premium Garments Dashboard
          </h2>
        </nav>

        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-200 min-h-full">
          <div className="p-4 text-xl font-bold border-b">
            Dashboard
          </div>

          <ul className="menu p-4 gap-1">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium"
                    : ""
                }
              >
                <FaHome />
                Homepage
              </NavLink>
            </li>

            {/* My Products */}
            <li>
              <NavLink
                to="/dashboard/my-products"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium"
                    : ""
                }
              >
                <FaBoxOpen />
                My Products
              </NavLink>
            </li>
            {/* payment history */}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium"
                    : ""
                }
              >
                <AiOutlineHistory />
                Payment History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/approve-delivery"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium"
                    : ""
                }
              >
                <FaMotorcycle />
                Approve Delivery
              </NavLink>
            </li>

            {/* Settings */}
            <li>
              <NavLink
                to="/dashboard/settings"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-white font-medium"
                    : ""
                }
              >
                <FaCog />
                Settings
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
