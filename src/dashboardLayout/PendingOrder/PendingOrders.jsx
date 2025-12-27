import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ordersData, setOrdersData] = useState([]);

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["pending-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders/pending`);
      setOrdersData(res.data);
      return res.data;
    },
  });

  const updateOrderStatus = (id, status) => {
    setOrdersData((prev) =>
      prev.map((o) =>
        o._id === id
          ? {
              ...o,
              status,
            }
          : o
      )
    );
    if (selectedOrder && selectedOrder._id === id) {
      setSelectedOrder((prev) => ({ ...prev, status }));
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/orders/approve/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Order approved", "success");
        updateOrderStatus(id, "approved");
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to approve order", "error");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/orders/reject/${id}`);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Order rejected", "success");
        updateOrderStatus(id, "rejected");
        setModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to reject order", "error");
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pending Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Order Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(0, 6)}...</td>
                <td>{o.firstName}</td>
                <td>{o.productTitle}</td>
                <td>{o.orderQuantity}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button onClick={() => openModal(o)} className="btn btn-xs btn-info">
                    View
                  </button>
                  <button
                    onClick={() => handleApprove(o._id)}
                    className={`btn btn-xs btn-success ${o.status === "approved" ? "btn-disabled" : ""}`}
                    disabled={o.status === "approved"}
                  >
                    {o.status === "approved" ? "Approved" : "Approve"}
                  </button>
                  <button
                    onClick={() => handleReject(o._id)}
                    className={`btn btn-xs btn-error ${o.status === "rejected" ? "btn-disabled" : ""}`}
                    disabled={o.status === "rejected"}
                  >
                    {o.status === "rejected" ? "Rejected" : "Reject"}
                  </button>
                </td>
              </tr>
            ))}
            {ordersData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No pending orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="text-lg font-bold">Order Details</h3>
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <div className="mt-4 space-y-2">
              <p><strong>Order ID:</strong> {selectedOrder._id}</p>
              <p><strong>User:</strong> {selectedOrder.firstName}</p>
              <p><strong>Product:</strong> {selectedOrder.productTitle}</p>
              <p><strong>Quantity:</strong> {selectedOrder.orderQuantity}</p>
              <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => handleApprove(selectedOrder._id)}
                className="btn btn-success"
                disabled={selectedOrder.status === "approved"}
              >
                {selectedOrder.status === "approved" ? "Approved" : "Approve"}
              </button>
              <button
                onClick={() => handleReject(selectedOrder._id)}
                className="btn btn-error"
                disabled={selectedOrder.status === "rejected"}
              >
                {selectedOrder.status === "rejected" ? "Rejected" : "Reject"}
              </button>
              <button onClick={() => setModalOpen(false)} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrders;
