import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const statuses = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped / Out for Delivery",
];

const ApprovedOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [modalOrder, setModalOrder] = useState(null);
  const [trackingData, setTrackingData] = useState({
    status: "",
    location: "",
    note: "",
    dateTime: new Date().toISOString().slice(0, 16),
  });

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["approved-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders/approved`);
      return res.data;
    },
  });

  const handleTrackingChange = (e) => {
    setTrackingData({ ...trackingData, [e.target.name]: e.target.value });
  };

  const handleAddTracking = async (orderId) => {
    try {
      const res = await axiosSecure.post(`${import.meta.env.VITE_API_URL}/orders/tracking/${orderId}`, trackingData);
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Tracking info added", "success");
        setModalOrder(null);
        setTrackingData({
          status: "",
          location: "",
          note: "",
          dateTime: new Date().toISOString().slice(0, 16),
        });
        refetch();
      }
    } catch (err) {
      Swal.fire("Error", "Failed to add tracking info", "error");
    }
  };

  const handleViewTracking = async (orderId) => {
    try {
      const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/orders/tracking/${orderId}`);
      const history = res.data;

      if (!history.length) {
        Swal.fire("No Tracking History", "No tracking info available yet.", "info");
        return;
      }

      Swal.fire({
        title: "Tracking History",
        html: history
          .map(
            (t) =>
              `<p><b>${t.status}</b> at ${t.location} on ${new Date(
                t.dateTime
              ).toLocaleString()}<br/>Note: ${t.note || "N/A"}</p>`
          )
          .join("<hr/>"),
        width: 500,
        showCloseButton: true,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to fetch tracking history", "error");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Approved Orders</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id.slice(0, 6)}...</td>
                <td>{order.firstName}</td>
                <td>{order.productTitle}</td>
                <td>{order.orderQuantity}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => handleViewTracking(order._id)}
                  >
                    View Tracking
                  </button>
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => setModalOrder(order)}
                  >
                    Add Tracking
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-bold mb-4">
              Add Tracking for {modalOrder.productTitle}
            </h3>

            <select
              name="status"
              value={trackingData.status}
              onChange={handleTrackingChange}
              className="select select-bordered w-full mb-2"
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="location"
              value={trackingData.location}
              onChange={handleTrackingChange}
              placeholder="Location"
              className="input input-bordered w-full mb-2"
            />

            <textarea
              name="note"
              value={trackingData.note}
              onChange={handleTrackingChange}
              placeholder="Note (optional)"
              className="textarea textarea-bordered w-full mb-2"
            />

            <input
              type="datetime-local"
              name="dateTime"
              value={trackingData.dateTime}
              onChange={handleTrackingChange}
              className="input input-bordered w-full mb-2"
            />

            <div className="flex justify-end gap-2 mt-2">
              <button className="btn btn-secondary" onClick={() => setModalOrder(null)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleAddTracking(modalOrder._id)}
              >
                Add Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedOrders;
