// src/dashboardLayout/Buyer/MyProfile.jsx
import React from "react";
import useAuth from "../../Hooks/useAuth";

const MyProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Profile</h2>
      <div className="bg-white shadow p-4 rounded max-w-md">
        <p><b>Name:</b> {user?.displayName}</p>
        <p><b>Email:</b> {user?.email}</p>
        <p><b>Phone:</b> {user?.phoneNumber || "N/A"}</p>
        <p><b>Address:</b> {user?.address || "N/A"}</p>
        <button
          onClick={logout}
          className="btn btn-error mt-4"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
