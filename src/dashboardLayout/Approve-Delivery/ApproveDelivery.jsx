import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import { FaRegEye, FaRegTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveDelivery = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/delivery");
      return res.data;
    },
  });
  const updateRiderStatus = (rider, status) => {
    const updateInfo = {
      status: status,
      email: rider.Email,
    };

    axiosSecure.patch(`/delivery/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `Delivery status set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  const handleDelete = (rider) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This rider will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delivery/${rider._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Rider deleted successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  };
  const handleView = (rider) => {
    Swal.fire({
      title: "Rider Details",
      html: `
      <div style="text-align:left">
        <p><b>Name:</b> ${rider.Name}</p>
        <p><b>Email:</b> ${rider.Email}</p>
        <p><b>Status:</b> ${rider.status}</p>
        <p><b>Address:</b> ${rider.Address}</p>
        <p><b>Phone:</b> ${rider.Number}</p>
        <p><b>District:</b> ${rider.District}</p>
        <p><b>NID:</b> ${rider.NID}</p>
      </div>
    `,
      confirmButtonText: "Close",
    });
  };

  return (
    <div>
      <h1>Riders pending Approval : {riders.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Address</th>
              <th>Number</th>
              <th>District</th>
              <th>NID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.Name}</td>
                <td>{rider.Email}</td>
                <td>
                  <p
                    className={
                      rider.status === "approved"
                        ? "text-green-600"
                        : "text-red-500"
                    }
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.Address}</td>
                <td>{rider.Number}</td>
                <td>{rider.District}</td>
                <td>{rider.NID}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleView(rider)}
                      className="btn btn-primary text-white"
                    >
                      <FaRegEye />
                    </button>

                    <button
                      onClick={() => handleApproval(rider)}
                      className="btn btn-primary text-white"
                    >
                      <FaUserCheck />
                    </button>

                    <button
                      onClick={() => handleRejection(rider)}
                      className="btn btn-primary text-white"
                    >
                      <IoPersonRemoveSharp />
                    </button>

                    <button
                      onClick={() => handleDelete(rider)}
                      className="btn btn-primary text-white"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveDelivery;
