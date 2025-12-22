import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["all-orders", status],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?status=${status}`);
      return res.data;
    },
  });

  if (isLoading) return <span className="loading loading-spinner"></span>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Orders</h2>

      {/* Filter */}
      <select
        className="select select-bordered mb-4"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
      </select>

      {/* Table */}
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id.slice(0, 6)}...</td>
              <td>{o.userName}</td>
              <td>{o.productName}</td>
              <td>{o.quantity}</td>
              <td>
                <span
                  className={`badge ${
                    o.status === "Approved"
                      ? "badge-success"
                      : o.status === "Rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {o.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() =>
                    navigate(`/dashboard/order-details/${o._id}`)
                  }
                  className="btn btn-xs btn-info"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllOrders;
