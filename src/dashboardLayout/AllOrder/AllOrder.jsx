import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../shared/Loading";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch orders with optional status filter
  const { data: orders = [], isLoading, refetch } = useQuery({
    queryKey: ["all-orders", status],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders/all?status=${status}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // Handle status update
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/orders/${newStatus}/${orderId}`);
      refetch();
      setSelectedOrder(null);
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id}>
                  <td>{o._id.slice(0, 6)}...</td>
                  <td>{o.firstName}</td>
                  <td>{o.productTitle}</td>
                  <td>{o.orderQuantity}</td>
                  <td>
                    <span
                      className={`badge ${
                        o.status === "approved"
                          ? "badge-success"
                          : o.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="btn btn-xs btn-info mr-2"
                    >
                      View
                    </button>
                    {o.status === "pending" && (
                      <button
                        onClick={() => setSelectedOrder(o)}
                        className="btn btn-xs btn-warning"
                      >
                        Manage
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <h3 className="text-lg font-bold mb-4">
              Order Details: {selectedOrder._id.slice(0, 6)}...
            </h3>

            <p>
              <strong>User:</strong> {selectedOrder.firstName}
            </p>
            <p>
              <strong>Product:</strong> {selectedOrder.productTitle}
            </p>
            <p>
              <strong>Quantity:</strong> {selectedOrder.orderQuantity}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedOrder.status.charAt(0).toUpperCase() +
                selectedOrder.status.slice(1)}
            </p>

            <div className="mt-4 flex justify-between">
              {selectedOrder.status === "pending" && (
                <>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedOrder._id, "approved")
                    }
                    className="btn btn-success"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleStatusChange(selectedOrder._id, "rejected")
                    }
                    className="btn btn-error"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
