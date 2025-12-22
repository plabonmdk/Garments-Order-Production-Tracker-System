import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText , steSearchText] = useState(' ')

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users" , searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  // Reusable function to handle role change
  const handleRoleChange = (user, newRole) => {
    const actionText =
      newRole === "admin"
        ? "make this user an admin"
        : "remove admin role from this user";

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to ${actionText} (${user.name})?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Success!",
                text:
                  newRole === "admin"
                    ? `${user.name} is now an admin.`
                    : `${user.name} is no longer an admin.`,
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Users: {users.length}</h2>

      <label className="input">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input onChange={(e) =>steSearchText(e.target.value)} type="search" required placeholder="Search users" />
      </label>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Role</th>
              <th>Admin Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            user.photoURL || "https://i.ibb.co/2kRZ4qT/user.png"
                          }
                          alt="User"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">
                        {user.status || "active"}
                      </div>
                    </div>
                  </div>
                </td>

                <td>{user.email}</td>

                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "bg-red-500 text-white"
                        : user.role === "raider"
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRoleChange(user, "user")}
                      className="btn btn-sm bg-red-500 text-white"
                      title="Remove Admin"
                    >
                      <FiShieldOff />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user, "admin")}
                      className="btn btn-sm bg-green-500 text-white"
                      title="Make Admin"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
