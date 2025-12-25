import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedOrder, setSelectedOrder] = useState(null); // for modal
  const [modalOpen, setModalOpen] = useState(false);

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["pending-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/pending");
      return res.data;
    },
  });

  const handleApprove = async (id) => {
    const res = await axiosSecure.patch(`/orders/approve/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "Order approved", "success");
      refetch();
      setModalOpen(false);
    }
  };

  const handleReject = async (id) => {
    const res = await axiosSecure.patch(`/orders/reject/${id}`);
    if (res.data.modifiedCount > 0) {
      Swal.fire("Success", "Order rejected", "success");
      refetch();
      setModalOpen(false);
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
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(0, 6)}...</td>
                <td>{o.firstName}</td>
                <td>{o.productTitle}</td>
                <td>{o.orderQuantity}</td>
                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => openModal(o)}
                    className="btn btn-xs btn-info"
                  >
                    View
                  </button>

                  <button
                    onClick={() => handleApprove(o._id)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(o._id)}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
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
              <p><strong>Status:</strong> {selectedOrder.status || "Pending"}</p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => handleApprove(selectedOrder._id)}
                className="btn btn-success"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(selectedOrder._id)}
                className="btn btn-error"
              >
                Reject
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="btn"
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

export default PendingOrders;
